package com.example.thien_long.controller;

import com.example.thien_long.dto.request.VerifyCodeRequest;
import com.example.thien_long.exception.exceptionCatch.AppException;
import com.example.thien_long.exception.exceptionCatch.ErrorCode;
import com.example.thien_long.model.VerifyCode;
import com.example.thien_long.repository.VerifyCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class VerifyCodeController {

    private final VerifyCodeRepository verifyCodeRepository;

    @PostMapping("/verify-code")
    public String verifyCode(@RequestBody VerifyCodeRequest request) {
        VerifyCode code = verifyCodeRepository
                .findTopByEmailAndCodeOrderByCreatedAtDesc(request.getEmail(), request.getCode())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_VERIFY_CODE));

        Timestamp now = new Timestamp(System.currentTimeMillis());
        if (code.isVerify() || code.getExpiredAt().before(now)) {
            throw new AppException(ErrorCode.INVALID_VERIFY_CODE);
        }

        code.setVerify(true);
        verifyCodeRepository.save(code);
        return "Xác minh thành công";
    }
}
