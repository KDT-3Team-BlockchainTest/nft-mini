package com.kdt.be.artwork.dto;

import com.kdt.be.artwork.entity.Artwork;
import com.kdt.be.artwork.enumtype.ArtworkStatus;

import java.math.RoundingMode;

public record ArtworkCardResponse(
        Long id,
        String image,
        String badge,
        String title,
        String creator,
        String price,
        String category,
        String status
) {
    public static ArtworkCardResponse from(Artwork artwork) {
        return new ArtworkCardResponse(
                artwork.getId(),
                artwork.getPreviewImageUrl(),
                toBadge(artwork.getStatus()),
                artwork.getTitle(),
                artwork.getCreator().getNickname(),
                artwork.getPrice().setScale(1, RoundingMode.HALF_UP).toPlainString() + " ETH",
                artwork.getCategory().name(),
                artwork.getStatus().name()
        );
    }

    private static String toBadge(ArtworkStatus status) {
        return switch (status) {
            case LISTED -> "판매중";
            case MINTED -> "새로운";
            case SOLD -> "완료";
            default -> "트렌딩";
        };
    }
}
