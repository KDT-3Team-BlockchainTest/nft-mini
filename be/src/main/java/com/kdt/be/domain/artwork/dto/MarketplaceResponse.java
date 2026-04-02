package com.kdt.be.domain.artwork.dto;

import java.util.List;

public record MarketplaceResponse(
        long totalCount,
        int currentPage,
        int pageSize,
        List<ArtworkCardResponse> items
) {
}
