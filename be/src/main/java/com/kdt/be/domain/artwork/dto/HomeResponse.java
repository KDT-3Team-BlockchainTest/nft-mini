package com.kdt.be.domain.artwork.dto;

import java.util.List;

public record HomeResponse(
        List<ArtworkCardResponse> featuredNfts,
        List<CategorySummary> categories,
        List<SimpleInfo> steps,
        List<SimpleInfo> benefits
) {
    public record CategorySummary(String icon, String title, String meta) {}

    public record SimpleInfo(String icon, String title, String description) {}
}
