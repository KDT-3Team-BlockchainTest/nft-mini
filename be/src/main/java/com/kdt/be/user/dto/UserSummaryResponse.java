package com.kdt.be.user.dto;

import com.kdt.be.user.entity.User;
import com.kdt.be.user.entity.UserRole;
import com.kdt.be.user.entity.UserStatus;

public record UserSummaryResponse(
        Long id,
        String name,
        String nickname,
        String email,
        UserRole role,
        UserStatus status,
        String walletAddress
) {
    public static UserSummaryResponse from(User user) {
        return new UserSummaryResponse(
                user.getId(),
                user.getName(),
                user.getNickname(),
                user.getEmail(),
                user.getRole(),
                user.getStatus(),
                user.getWalletAddress()
        );
    }
}
