package com.example.thien_long.service;

import com.example.thien_long.dto.request.AuthRequest;
import com.example.thien_long.dto.request.LogoutRequest;
import com.example.thien_long.dto.request.RefreshRequest;
import com.example.thien_long.dto.request.TokenValidityRequest;
import com.example.thien_long.dto.response.AuthResponse;
import com.example.thien_long.dto.response.TokenValidityResponse;
import com.example.thien_long.exception.exceptionCatch.AppException;
import com.example.thien_long.exception.exceptionCatch.ErrorCode;
import com.example.thien_long.mapper.UserMapper;
import com.example.thien_long.model.*;
import com.example.thien_long.repository.*;
import com.example.thien_long.security.JwtUtil;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final InvalidatedTokenRepository invalidatedTokenRepository;
    private final VerifyCodeRepository verifyCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final UserMapper userMapper;
    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private JwtUtil jwtUtil;


    public TokenValidityResponse tokenValidity(TokenValidityRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;

        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }

        return TokenValidityResponse.builder().valid(isValid).build();
    }

    //Đăng nhập người dùng, trả về token nếu thành công
    public AuthResponse authenticate(AuthRequest request) {
        var user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Set<String> permissions = new HashSet<>();
        Optional<Employee> employeeOpt = employeeRepository.findById(user.getId());
        if(employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            permissions = employee.getPermissions()
                    .stream()
                    .map(p -> p.getName().toUpperCase())  // chuẩn hóa chữ HOA
                    .collect(Collectors.toSet());

        }


        // Kiểm tra email đã được verify chưa
        var verifyCode = verifyCodeRepository
                .findTopByEmailOrderByCreatedAtDesc(user.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (!verifyCode.isVerify()) {
            throw new AppException(ErrorCode.UNVERIFIED_EMAIL);
        }

        boolean authenticated = passwordEncoder.matches(request.getPwd(), user.getPwd());

        if (!authenticated) throw new AppException(ErrorCode.PWD_NOT_MATCHES);

        cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(
                        Cart.builder()
                                .user(user)
                                .cartItems(new ArrayList<>())
                                .build()
                ));

//        var token = generateToken(user, permissions);
        String token = jwtUtil.generate(user, permissions);

        var userResponse = userMapper.toUserResponse(user);

        return AuthResponse.builder().token(token).authenticated(true).user(userResponse).permissions(permissions).build();
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
//        try {
//            var signToken = verifyToken(request.getToken(), true);
//
//            String jit = signToken.getJWTClaimsSet().getJWTID();
//            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();
//
//            InvalidatedToken invalidatedToken = new InvalidatedToken(jit, new java.sql.Date(expiryTime.getTime()));
//            invalidatedTokenRepository.save(invalidatedToken);
//        } catch (AppException exception) {
//            log.info("Token đã tồn tại");
//        }
        SignedJWT jwt = jwtUtil.verify(request.getToken(), true);
        invalidatedTokenRepository.save(
                new InvalidatedToken(jwt.getJWTClaimsSet().getJWTID(),
                        new java.sql.Date(jwt.getJWTClaimsSet()
                                .getExpirationTime().getTime())));
    }

//    public AuthResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
//        var signedJWT = verifyToken(request.getToken(), true);
//
//        var jit = signedJWT.getJWTClaimsSet().getJWTID();
//        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
//
//        InvalidatedToken invalidatedToken = new InvalidatedToken(jit, new java.sql.Date(expiryTime.getTime()));
//        invalidatedTokenRepository.save(invalidatedToken);
//
//        long userID = Long.parseLong(signedJWT.getJWTClaimsSet().getSubject());
//
//
//        var user =
//                userRepository.findById(userID).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
//
//        Set<String> permissions = new HashSet<>();
//        Optional<Employee> employeeOpt = employeeRepository.findById(user.getId());
//        if(employeeOpt.isPresent()) {
//            Employee employee = employeeOpt.get();
//            permissions = employee.getPermissions()
//                    .stream()
//                    .map(Permission::getName)
//                    .collect(Collectors.toSet());
//        }
//        var token = generateToken(user, permissions);
//        var userResponse = userMapper.toUserResponse(user);
//
//        return AuthResponse.builder().token(token).authenticated(true).user(userResponse).build();
//    }
public AuthResponse refresh(RefreshRequest req) throws ParseException, JOSEException {
    SignedJWT jwt = jwtUtil.verify(req.getToken(), true);
    Set<String> perms = new HashSet<>(jwt.getJWTClaimsSet().getStringListClaim("permissions"));
    User user = userRepository.findById(Long.parseLong(jwt.getJWTClaimsSet().getSubject()))
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    String newToken = jwtUtil.generate(user, perms);
    return AuthResponse.builder()
            .token(newToken)
            .authenticated(true)
            .user(userMapper.toUserResponse(user))
            .permissions(perms)
            .build();
}


    private String generateToken(User user, Set<String> permissions) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(String.valueOf(user.getId()))
                .claim("permissions", permissions)
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Không thể tạo token", e);
            throw new RuntimeException(e);
        }
    }

    private SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = (isRefresh)
                ? new Date(signedJWT
                .getJWTClaimsSet()
                .getIssueTime()
                .toInstant()
                .plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS)
                .toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date()))) throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }
}