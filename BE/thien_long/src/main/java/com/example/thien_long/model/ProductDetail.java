package com.example.thien_long.model;

import com.example.thien_long.service.Constant;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "product_details")
public class ProductDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="title", nullable = false)
    private String title;
    @Column(name="init_price", nullable = false)
    private double initPrice;
    @Column(name="price", nullable = false)
    private double price;
    @Column(name="qty", nullable = false)
    private int qty;
    @Column(name="is_deleted", nullable = false)
    private int isDeleted = Constant.NOT_DELETED;
    @Column(name="sold_qty", nullable = false)
    private int soldQty; // viet ham tu dong cap nhat moi ngay

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

//    @Transient
//    @JsonProperty("discount")
//    public int getDiscount() {
//        return 100 - (int) ((price/initPrice) * 100);
//    }

    @Transient
    private int discount;

    public ProductDetail() {
    }

    public ProductDetail(long id, String title, double initPrice, double price, int qty) {
        this.id = id;
        this.title = title;
        this.initPrice = initPrice;
        this.price = price;
        this.qty = qty;
        this.discount = 100 - (int) ((price/initPrice) * 100);
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getInitPrice() {
        return initPrice;
    }

    public void setInitPrice(double initPrice) {
        this.initPrice = initPrice;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public int getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(int isDeleted) {
        this.isDeleted = isDeleted;
    }

    public int getSoldQty() {
        return soldQty;
    }

    public void setSoldQty(int soldQty) {
        this.soldQty = soldQty;
    }
}
