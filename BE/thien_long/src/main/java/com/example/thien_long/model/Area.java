package com.example.thien_long.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "areas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Area {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "code", nullable = false)
    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Area parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Area> children = new ArrayList<>();

    public Area(long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    public Area(String code) {
        this.code = code;
    }

    public Area(long id, String name, String code, String parentCode) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.parent = new Area(parentCode);
    }


}
