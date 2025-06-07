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

    @Column(name = "updated_at", columnDefinition = "DATETIME DEFAULT NULL")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @Column(name = "receiverInfo")
    private String receiverInfo;

    @Column(name = "note")
    private String note;

    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = null;
        this.status = WAIT_STATUS;
    }

    public static final String WAIT_STATUS = "WAIT";  // trang thai cho xac nhan (default)
    public static final String CONFIRM_STATUS = "CONFIRM"; // da xac nhan don hang (admin)
    public static final String DELIVERY_STATUS = "DELIVERY"; // dang giao (admin)
    public static final String COMPLETE_STATUS = "COMPLETE"; // hoan thanh (admin)
    // xac nhan hoan thanh, neu nguoi dung khong xac nhan, sau 7 ngay he thong se tu cap nhat CONFIRM_COMPLETE
    public static final String CONFIRM_COMPLETE_STATUS = "CONFIRM_COMPLETE"; // (user, admin)
    public static final String CANCEL_STATUS = "CANCEL"; // huy  (user, admin)
    public static final String BACK_STATUS = "BACK"; // tra hang (user)
    public static final String CONFIRM_BACK_STATUS = "CONFIRM_BACK"; // xac nhan tra hang (admin)
    public static final String REVIEW_STATUS = "REVIEW";  // da danh gia, sau khi nguoi dung danh gia thi he thong tu cap nhat thanh REVIEW
    // sau khi CONFIRM_COMPLETE 7 ngay, he thong se cap nhat thanh SUCCESS, luc nay khong the tra hang hay danh gia nua
    public static final String SUCCESS_STATUS = "SUCCESS"; // thanh cong (admin)



}
