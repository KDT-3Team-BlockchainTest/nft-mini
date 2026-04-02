package com.kdt.be.artwork.entity;

import com.kdt.be.artwork.enumtype.ArtworkCategory;
import com.kdt.be.artwork.enumtype.ArtworkStatus;
import com.kdt.be.artwork.enumtype.SaleType;
import com.kdt.be.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Artwork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ArtworkCategory category;

    @Column(nullable = false, precision = 18, scale = 4)
    private BigDecimal price;

    @Column(nullable = false)
    private String blockchain;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SaleType saleType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ArtworkStatus status;

    @Column(nullable = false)
    private String fileUrl;

    @Column(nullable = false)
    private String previewImageUrl;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String contentType;

    @Column(nullable = false)
    private long fileSize;

    @Column(length = 1000)
    private String tags;

    @Column(nullable = false)
    private String licenseScope;

    private boolean termsAgreed;

    private String tokenId;

    private String contractAddress;

    private String txHash;

    private String metadataUri;

    private LocalDateTime submittedAt;

    private LocalDateTime mintedAt;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public void approveForMint(String tokenId, String contractAddress, String txHash, String metadataUri) {
        this.status = ArtworkStatus.MINTED;
        this.tokenId = tokenId;
        this.contractAddress = contractAddress;
        this.txHash = txHash;
        this.metadataUri = metadataUri;
        this.mintedAt = LocalDateTime.now();
    }

    public void reject() {
        this.status = ArtworkStatus.REJECTED;
    }

    public void list() {
        this.status = ArtworkStatus.LISTED;
    }

    public void markSold(User newOwner) {
        this.owner = newOwner;
        this.status = ArtworkStatus.SOLD;
    }
}
