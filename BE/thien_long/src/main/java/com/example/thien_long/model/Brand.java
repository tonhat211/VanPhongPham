package com.example.thien_long.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "brands")
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="name", nullable = false)
    private String name;
    @Column(name="code", nullable = false, unique = true)
    private String code;
    @Column(name="is_deleted", columnDefinition = "INT DEFAULT 0")
    private int isDeleted;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String title) {
        this.name = title;
    }

    public int getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(int isDeleted) {
        this.isDeleted = isDeleted;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Brand brand)) return false;
        return id == brand.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
