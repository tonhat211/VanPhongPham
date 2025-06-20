package com.example.thien_long.security;

import com.example.thien_long.exception.exceptionCatch.AppException;
import com.example.thien_long.exception.exceptionCatch.ErrorCode;
import com.example.thien_long.model.User;
import com.example.thien_long.repository.InvalidatedTokenRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.time.Instant;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    @Value("${jwt.signerKey}")      private String SIGNER_KEY;
    @Value("${jwt.valid-duration}") private long VALID_DURATION;       // giây
    @Value("${jwt.refreshable-duration}") private long REFRESHABLE_DURATION;

    private final InvalidatedTokenRepository invalidatedRepo;

    /* ========== Generate ========== */
    public String generate(User user, Set<String> perms) {
        JWTClaimsSet claims = new JWTClaimsSet.Builder()
                .subject(String.valueOf(user.getId()))
                .claim("permissions", perms)                        // ★ quyền
                .issueTime(new Date())
                .expirationTime(Date.from(
                        Instant.now().plusSeconds(VALID_DURATION)))
                .jwtID(UUID.randomUUID().toString())
                .build();

        JWSObject jws = new JWSObject(
                new JWSHeader(JWSAlgorithm.HS256),
                new Payload(claims.toJSONObject()));

        try {
            jws.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jws.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException("Cannot sign JWT", e);
        }
    }

    /* ========== Verify ========== */
    public SignedJWT verify(String token, boolean allowRefresh)
            throws JOSEException, ParseException {

        SignedJWT jwt = SignedJWT.parse(token);
        if (!jwt.verify(new MACVerifier(SIGNER_KEY.getBytes())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        Date exp = allowRefresh
                ? Date.from(jwt.getJWTClaimsSet().getIssueTime().toInstant()
                .plusSeconds(REFRESHABLE_DURATION))
                : jwt.getJWTClaimsSet().getExpirationTime();

        if (exp.before(new Date()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (invalidatedRepo.existsById(jwt.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return jwt;
    }
}

