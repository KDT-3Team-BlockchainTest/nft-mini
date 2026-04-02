package com.kdt.be.domain.admin;

import com.kdt.be.domain.artwork.dto.ArtworkDetailResponse;
import com.kdt.be.domain.user.dto.UserSummaryResponse;

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
