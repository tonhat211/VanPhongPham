package com.example.thien_long.exception.exceptionCatch;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi chưa phân loại", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Lỗi chưa phân loại", HttpStatus.BAD_REQUEST),
//    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "Người dùng không tồn tại", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Chưa xác thực", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "Bạn không có quyền", HttpStatus.FORBIDDEN),
    EMAIL_EXISTED(1002, "Email đã được sử dụng", HttpStatus.BAD_REQUEST),
    UNVERIFIED_EMAIL(1003, "Email chưa được xác minh", HttpStatus.BAD_REQUEST),
    INVALID_VERIFY_CODE(1009, "Mã xác minh không hợp lệ hoặc đã hết hạn", HttpStatus.BAD_REQUEST),
    PWD_NOT_MATCHES(1009, "Mật khẩu không khớp", HttpStatus.BAD_REQUEST),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}