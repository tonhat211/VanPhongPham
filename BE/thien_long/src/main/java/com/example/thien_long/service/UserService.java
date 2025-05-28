package com.example.thien_long.service;

import com.example.thien_long.dto.request.UserRegisterRequest;
import com.example.thien_long.dto.response.UserResponse;
import com.example.thien_long.exception.exceptionCatch.AppException;
import com.example.thien_long.exception.exceptionCatch.ErrorCode;
import com.example.thien_long.mapper.UserMapper;
import com.example.thien_long.model.Cart;
import com.example.thien_long.model.User;
import com.example.thien_long.model.VerifyCode;
import com.example.thien_long.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Random;
import com.example.thien_long.repository.VerifyCodeRepository;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserMapper userMapper;
    @Autowired
    VerifyCodeRepository verifyCodeRepository;
    @Autowired
    EmailService emailService;

    public UserResponse register(UserRegisterRequest request) {
        try {
//            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
//                throw new AppException(ErrorCode.EMAIL_EXISTED);
//            }

            User user = userMapper.toRegisterUser(request);

            user.setPwd(passwordEncoder.encode(request.getPwd()));

            if (user.getAddresses() != null && !user.getAddresses().isEmpty()) {
                User finalUser = user;
                user.getAddresses().forEach(address -> address.setUser(finalUser));
                user.getAddresses().get(0).setIsDefault(1);
            }

            user = userRepository.save(user);

            //ma xac minh
            String code = generateVerificationCode();
            Timestamp now = new Timestamp(System.currentTimeMillis());
            Timestamp expireAt = new Timestamp(now.getTime() + 30 * 60 * 1000); // 30 phút

            VerifyCode verifyCode = VerifyCode.builder()
                    .code(code)
                    .email(user.getEmail())
                    .createdAt(now)
                    .expiredAt(expireAt)
                    .isVerify(false)
                    .build();

            verifyCodeRepository.save(verifyCode);

            emailService.sendVerificationCode(user.getEmail(), code);
            System.out.println(" Mã xác minh gửi cho " + user.getEmail() + " là: " + code);
            return userMapper.toUserResponse(user);

        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            code.append(random.nextInt(10)); // từ 0 đến 9
        }
        return code.toString();
    }

}