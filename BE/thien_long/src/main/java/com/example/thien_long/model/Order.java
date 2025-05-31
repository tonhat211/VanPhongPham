package com.example.thien_long.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "init_money", columnDefinition = "DOUBLE DEFAULT 0")
    private double initMoney;

    @Column(name = "payed_money", columnDefinition = "DOUBLE DEFAULT 0")
    private double payedMoney;

    @Column(name = "shipping_fee", columnDefinition = "DOUBLE DEFAULT 0")
    private double shippingFee;

    @ManyToOne
    @JoinColumn(name = "voucher_code", nullable = true)
    private Voucher voucher;

    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @Column(name = "receiverInfo")
    private String receiverInfo;


    @Column(name = "note")
    private String note;

    @Column(name = "status", columnDefinition = "INT DEFAULT 0")
    private int status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

}
