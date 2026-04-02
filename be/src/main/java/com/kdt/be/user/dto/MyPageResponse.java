package com.kdt.be.user.dto;

import com.kdt.be.marketplace.entity.Activity;
import com.kdt.be.artwork.dto.ArtworkCardResponse;

import java.util.List;

public record MyPageResponse(
        Profile profile,
        Stats stats,
        List<ArtworkCardResponse> owned,
        List<ArtworkCardResponse> created,
        List<ArtworkCardResponse> listed,
        List<ActivityItem> sold,
        List<ActivityItem> purchases,
        List<ActivityItem> royalty
) {
    public record Profile(
            String name,
            String description,
            String walletAddress
    ) {
    }

    public record Stats(
            int assetCount,
            int createdCount,
            String totalSales,
            String royaltyIncome
    ) {
    }

    public record ActivityItem(
            String title,
            String subtitle,
            String amount,
            String date
    ) {
        public static ActivityItem from(Activity activity) {
            return new ActivityItem(
                    activity.getArtwork().getTitle(),
                    activity.getSubtitle(),
                    activity.getAmount().stripTrailingZeros().toPlainString() + " ETH",
                    activity.getActivityDate().toString()
            );
        }
    }
}
