package com.example.thien_long.model;

import com.example.thien_long.service.Constant;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "addresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "province", nullable = false)
    private String province;

    @Column(name = "ward", nullable = false)
    private String ward;

    @Column(name = "detail", nullable = false)
    private String detail;

    @Column(name = "isDefault", nullable = false)
    private int isDefault;
    public long getId() {
        return id;
    }

    @Column(name="is_deleted", nullable = false)
    private int isDeleted = Constant.NOT_DELETED;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @UpdateTimestamp
    @Column(name = "updated_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Address(long id, String name, String phone, String province, String ward, String detail, int isDefault) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.province = province;
        this.ward = ward;
        this.detail = detail;
        this.isDefault = isDefault;
    }
}
