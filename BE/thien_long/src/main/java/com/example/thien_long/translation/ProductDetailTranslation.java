package com.example.thien_long.translation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_detail_translations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailTranslation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "product_detail_id", nullable = false)
    private long productDetailId;
    @Column(name = "lang", nullable = false)
    private String lang;
    @Column(name = "content", nullable = false)
    private String content;


}
