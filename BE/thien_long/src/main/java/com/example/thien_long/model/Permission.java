package com.example.thien_long.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "permissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "name", nullable = false, unique = true)
    private String name;
    @Column(name = "url")
    private String url;
    @Column(name = "description")
    private String description;

    @ManyToMany(mappedBy = "permissions", fetch = FetchType.LAZY)
    private List<Employee> employees = new ArrayList<>();


}
