package com.example.thien_long.translation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "brand_translations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandTranslation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "product_id", nullable = false)
    private long productId;
    @Column(name = "lang", nullable = false)
    private String lang;
    @Column(name = "content", nullable = false)
    private String content;

    public BrandTranslation(String content) {
        this.content = content;
    }
}
