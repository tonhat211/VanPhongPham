package com.example.thien_long.security;

import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    private final String SECRET = "secretkey";

//    public String generateToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 2 * 60 * 60 * 1000)) // 2h
//                .signWith(SignatureAlgorithm.HS256, SECRET)
//                .compact();
//    }
//
//    public String getUsername(String token) {
//        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();
//    }
}
