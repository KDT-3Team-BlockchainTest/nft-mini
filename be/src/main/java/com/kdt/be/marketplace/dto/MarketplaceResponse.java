package com.kdt.be.marketplace.dto;

import com.kdt.be.artwork.dto.ArtworkCardResponse;

import java.util.List;

public record MarketplaceResponse(
        long totalCount,
        int currentPage,
        int pageSize,
        List<ArtworkCardResponse> items
) {
}
