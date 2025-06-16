package com.example.thien_long.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendVerificationCode(String toEmail, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Mã xác thực tài khoản - Thiên Long");
        message.setText("Xin chào,\n\nMã xác minh tài khoản của bạn là: " + code + "\nMã này sẽ hết hạn sau 30 phút.\n\nTrân trọng.");
        mailSender.send(message);
    }
    public void sendNewPasswordEmail(String toEmail,String newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Mật khẩu mới của bạn");
        message.setText("Vui lòng bỏ qua mail này nếu không phải bạn.\n\n Mật khẩu mới của bạn là: " + newPassword);
        mailSender.send(message);
    }
}
