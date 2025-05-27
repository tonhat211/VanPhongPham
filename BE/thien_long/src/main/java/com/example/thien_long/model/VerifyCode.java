package com.example.thien_long.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Entity
@Table(name = "verify_code")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VerifyCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "code", nullable = false)
    String code;
    @Column(name = "email", nullable = false)
    String email;
    @Column(name = "created_at")
     Timestamp createdAt;

    @Column(name = "expired_at")
     Timestamp expiredAt;
    @Column(name = "is_verify")
    boolean  isVerify;

}
