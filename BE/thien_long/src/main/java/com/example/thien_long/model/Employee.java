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
@Table(name = "employees")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee extends User {
    @Column(name="position", nullable = false)
    private String position;

    @Column(name="department", nullable = false)
    private String department;

//    @ManyToMany
//    @JoinTable(
//            name = "user_permissions",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "permission_id")
//    )
//    private List<Permission> permissions = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "employee_permissions",                 // bảng nối rõ nghĩa
            joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id"),
            uniqueConstraints = @UniqueConstraint(
                    columnNames = { "employee_id", "permission_id" })
    )
    private List<Permission> permissions = new ArrayList<>();




}
