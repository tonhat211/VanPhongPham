package com.example.thien_long.model;

import com.example.thien_long.service.Constant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vouchers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Voucher {
    @Id
    @Column(name= "code", nullable = false, unique = true)
    private String code;

    @Column(name = "status", columnDefinition = "INT DEFAULT 0")
    private int status;

}
