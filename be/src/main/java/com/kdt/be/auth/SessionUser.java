package com.kdt.be.auth;

import java.io.Serializable;

import com.kdt.be.domain.user.UserRole;

public record SessionUser(
        Long id,
        String email,
        String nickname,
        UserRole role
) implements Serializable {
}
