package com.example.thien_long.service;

import com.example.thien_long.exception.exceptionCatch.AppException;
import com.example.thien_long.exception.exceptionCatch.ErrorCode;
import com.example.thien_long.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.ParseException;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;

    private final UserRepository userRepository;

    public Long extractUserId(String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            SignedJWT signedJWT = SignedJWT.parse(token);

            JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
            if (!signedJWT.verify(verifier)) {
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }

            long userID = Long.parseLong(signedJWT.getJWTClaimsSet().getSubject());
            return Long.valueOf(userID);
        } catch (ParseException | JOSEException | NumberFormatException e) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        } catch (Exception e) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
//        long id = 5;
//        return id;
    }
}
