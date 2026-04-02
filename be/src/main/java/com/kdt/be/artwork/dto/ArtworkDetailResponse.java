package com.kdt.be.artwork.dto;

import com.kdt.be.artwork.entity.Artwork;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ArtworkDetailResponse(
        Long id,
        String title,
        String description,
        String category,
        BigDecimal price,
        String blockchain,
        String saleType,
        String status,
        String fileUrl,
        String previewImageUrl,
        String fileName,
        String contentType,
        long fileSize,
        List<String> tags,
        String licenseScope,
        boolean termsAgreed,
        String tokenId,
        String contractAddress,
        String txHash,
        String metadataUri,
        LocalDateTime submittedAt,
        LocalDateTime mintedAt,
        String creator,
        String owner
) {
    public static ArtworkDetailResponse from(Artwork artwork) {
        return new ArtworkDetailResponse(
                artwork.getId(),
                artwork.getTitle(),
                artwork.getDescription(),
                artwork.getCategory().name(),
                artwork.getPrice(),
                artwork.getBlockchain(),
                artwork.getSaleType().name(),
                artwork.getStatus().name(),
                artwork.getFileUrl(),
                artwork.getPreviewImageUrl(),
                artwork.getFileName(),
                artwork.getContentType(),
                artwork.getFileSize(),
                artwork.getTags() == null || artwork.getTags().isBlank() ? List.of() : List.of(artwork.getTags().split(",")),
                artwork.getLicenseScope(),
                artwork.isTermsAgreed(),
                artwork.getTokenId(),
                artwork.getContractAddress(),
                artwork.getTxHash(),
                artwork.getMetadataUri(),
                artwork.getSubmittedAt(),
                artwork.getMintedAt(),
                artwork.getCreator().getNickname(),
                artwork.getOwner().getNickname()
        );
    }
}
