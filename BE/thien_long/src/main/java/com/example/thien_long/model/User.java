package com.example.thien_long.model;

import com.example.thien_long.service.Constant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="name", nullable = false)
    private String name;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="pwd", nullable = false)
    private String pwd;

    @Column(name = "birthday", nullable = true)
    private LocalDate birthday;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses=new ArrayList<>();

    @Column(name="is_deleted", nullable = false)
    private int isDeleted = Constant.NOT_DELETED;

    @Column(name = "is_locked", nullable = false)
    private boolean isLocked = false;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    public User(long id, String name) {
        this.id = id;
        this.name = name;
    }


}
