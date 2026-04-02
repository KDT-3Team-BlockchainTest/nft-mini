package com.kdt.be.admin.dto;

import com.kdt.be.artwork.dto.ArtworkDetailResponse;
import com.kdt.be.user.dto.UserSummaryResponse;

import java.util.List;

public record AdminDashboardResponse(
        Stats stats,
        List<ArtworkDetailResponse> pendingWorks,
        List<UserSummaryResponse> users
) {
    public record Stats(
            long totalUsers,
            long pendingWorks,
            long mintedToday,
            long suspendedUsers
    ) {
    }
}
