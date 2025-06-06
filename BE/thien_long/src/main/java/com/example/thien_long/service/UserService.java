package com.example.thien_long.service;
import com.example.thien_long.dto.request.UserRegisterRequest;
import com.example.thien_long.dto.request.UserUpdateInfoRequest;
import com.example.thien_long.dto.response.UserResponse;
import com.example.thien_long.exception.exceptionCatch.AppException;
import com.example.thien_long.exception.exceptionCatch.ErrorCode;
import com.example.thien_long.mapper.UserMapper;
import com.example.thien_long.mapper.UserUpdateMapper;
import com.example.thien_long.model.*;
import com.example.thien_long.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
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

    private final UserUpdateMapper userUpdateMapper;

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
    @Transactional
    public UserResponse updateUserInfo(Long userId, UserUpdateInfoRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Cập nhật thông tin cơ bản của user
        userUpdateMapper.updateUserFromRequest(request, user);

        // Danh sách address hiện tại
        List<Address> addresses = user.getAddresses();

        // Tìm address mặc định hiện tại (nếu có)
        Optional<Address> defaultAddressOpt = addresses.stream()
                .filter(address -> address.getIsDefault() == 1)
                .findFirst();

        if (defaultAddressOpt.isPresent()) {
            // Nếu đã có address mặc định cập nhật thông tin
            Address defaultAddress = defaultAddressOpt.get();
            defaultAddress.setName(request.getName());
            defaultAddress.setPhone(request.getPhone());
            defaultAddress.setProvince(request.getProvince());
            defaultAddress.setWard(request.getWard());
            defaultAddress.setDetail(request.getDetail());
        } else {
            // Nếu chưa có address nào thêm mới một address mặc định
            Address newAddress = new Address();
            newAddress.setName(request.getName());
            newAddress.setPhone(request.getPhone());
            newAddress.setProvince(request.getProvince());
            newAddress.setWard(request.getWard());
            newAddress.setDetail(request.getDetail());
            newAddress.setIsDefault(1); // đánh dấu mặc định
            newAddress.setIsDeleted(0);
            newAddress.setUser(user);  // thiết lập liên kết với user

            addresses.add(newAddress); // thêm vào danh sách
        }

        user.setAddresses(addresses); // đảm bảo list được cập nhật lại

        return userUpdateMapper.toUserResponse(userRepository.save(user));
    }


}