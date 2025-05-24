package com.example.thien_long.service;

import com.example.thien_long.dto.request.UserRegisterRequest;
import com.example.thien_long.dto.response.UserResponse;
import com.example.thien_long.exception.exceptionCatch.AppException;
import com.example.thien_long.exception.exceptionCatch.ErrorCode;
import com.example.thien_long.mapper.UserMapper;
import com.example.thien_long.model.Address;
import com.example.thien_long.model.User;
import com.example.thien_long.repository.AddressRepository;
import com.example.thien_long.repository.UserRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

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
            return userMapper.toUserResponse(user);

        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
    }
}