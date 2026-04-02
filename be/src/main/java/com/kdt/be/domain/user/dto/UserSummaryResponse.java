package com.kdt.be.domain.user.dto;

import com.kdt.be.domain.user.User;
import com.kdt.be.domain.user.UserRole;
import com.kdt.be.domain.user.UserStatus;

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
