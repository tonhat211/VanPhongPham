package com.example.thien_long.repository;

import com.example.thien_long.model.VerifyCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerifyCodeRepository extends JpaRepository<VerifyCode, Long> {
    Optional<VerifyCode> findTopByEmailOrderByCreatedAtDesc(String email);
    Optional<VerifyCode> findTopByEmailAndCodeOrderByCreatedAtDesc(String email, String code);
}

