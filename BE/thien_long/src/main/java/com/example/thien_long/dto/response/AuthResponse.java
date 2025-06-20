package com.example.thien_long.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthResponse {
    String token;
    boolean authenticated;
    UserResponse user;
    Set<String> permissions;
}
