package com.kdt.be.auth.session;

import java.io.Serializable;

import com.kdt.be.user.entity.UserRole;

public record SessionUser(
        Long id,
        String email,
        String nickname,
        UserRole role
) implements Serializable {
}
