package com.example.thien_long.translation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "menu_translations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuTranslation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "object_code", nullable = false)
    private String objectCode;
    @Column(name = "lang", nullable = false)
    private String lang;
    @Column(name = "content", nullable = false)
    private String content;


}
