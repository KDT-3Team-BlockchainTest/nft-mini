package com.kdt.be.artwork.service;

import com.kdt.be.artwork.dto.ArtworkCardResponse;
import com.kdt.be.artwork.dto.ArtworkDetailResponse;
import com.kdt.be.artwork.entity.Artwork;
import com.kdt.be.artwork.enumtype.ArtworkCategory;
import com.kdt.be.artwork.enumtype.ArtworkStatus;
import com.kdt.be.artwork.enumtype.SaleType;
import com.kdt.be.artwork.repository.ArtworkRepository;
import com.kdt.be.marketplace.dto.MarketplaceResponse;
import com.kdt.be.auth.service.AuthService;
import com.kdt.be.common.exception.ApiException;
import com.kdt.be.user.entity.User;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ArtworkService {

    private static final long MAX_FILE_SIZE = 100L * 1024 * 1024;
    private static final List<String> ALLOWED_CONTENT_TYPES = List.of(
            "image/jpeg", "image/png", "image/gif", "image/svg+xml",
            "video/mp4", "video/webm", "audio/mpeg", "audio/wav",
            "model/gltf-binary", "model/gltf+json"
    );

    @Value("${app.upload.dir}")
    private String uploadDir;

    private final ArtworkRepository artworkRepository;
    private final AuthService authService;

    @Transactional
    public ArtworkDetailResponse create(
            String title,
            String description,
            String category,
            BigDecimal price,
            String licenseScope,
            String tags,
            Boolean termsAgreed,
            MultipartFile file,
            HttpSession session
    ) {
        User user = authService.getLoginUser(session);
        validateFile(file);

        if (Boolean.FALSE.equals(termsAgreed)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "사용자 책임 동의가 필요합니다.");
        }

        String storedPath = storeFile(file);
        Artwork artwork = Artwork.builder()
                .creator(user)
                .owner(user)
                .title(title)
                .description(description)
                .category(parseCategory(category))
                .price(price)
                .blockchain("Ethereum")
                .saleType(SaleType.BUY_NOW)
                .status(ArtworkStatus.PENDING_REVIEW)
                .fileUrl(storedPath)
                .previewImageUrl(storedPath)
                .fileName(file.getOriginalFilename())
                .contentType(file.getContentType())
                .fileSize(file.getSize())
                .tags(tags)
                .licenseScope(licenseScope)
                .termsAgreed(Boolean.TRUE.equals(termsAgreed))
                .submittedAt(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .build();

        return ArtworkDetailResponse.from(artworkRepository.save(artwork));
    }

    @Transactional(readOnly = true)
    public MarketplaceResponse getArtworks(
            String status,
            String category,
            String keyword,
            String sort,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            int page,
            int size
    ) {
        List<Artwork> artworks = artworkRepository.findAll().stream()
                .filter(artwork -> matchesStatus(artwork, status))
                .filter(artwork -> matchesCategory(artwork, category))
                .filter(artwork -> matchesKeyword(artwork, keyword))
                .filter(artwork -> artwork.getPrice().compareTo(minPrice) >= 0 && artwork.getPrice().compareTo(maxPrice) <= 0)
                .sorted(resolveComparator(sort))
                .toList();

        int fromIndex = Math.min(page * size, artworks.size());
        int toIndex = Math.min(fromIndex + size, artworks.size());

        return new MarketplaceResponse(
                artworks.size(),
                page + 1,
                size,
                artworks.subList(fromIndex, toIndex).stream().map(ArtworkCardResponse::from).toList()
        );
    }

    @Transactional(readOnly = true)
    public MarketplaceResponse getMarketplace(
            String category,
            String keyword,
            String sort,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            int page,
            int size
    ) {
        List<Artwork> artworks = artworkRepository.findAll().stream()
                .filter(artwork -> artwork.getStatus() == ArtworkStatus.LISTED || artwork.getStatus() == ArtworkStatus.MINTED)
                .filter(artwork -> matchesCategory(artwork, category))
                .filter(artwork -> matchesKeyword(artwork, keyword))
                .filter(artwork -> artwork.getPrice().compareTo(minPrice) >= 0 && artwork.getPrice().compareTo(maxPrice) <= 0)
                .sorted(resolveComparator(sort))
                .toList();

        int fromIndex = Math.min(page * size, artworks.size());
        int toIndex = Math.min(fromIndex + size, artworks.size());

        return new MarketplaceResponse(
                artworks.size(),
                page + 1,
                size,
                artworks.subList(fromIndex, toIndex).stream().map(ArtworkCardResponse::from).toList()
        );
    }

    @Transactional(readOnly = true)
    public ArtworkDetailResponse getArtworkDetail(Long artworkId) {
        Artwork artwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "작품을 찾을 수 없습니다."));
        return ArtworkDetailResponse.from(artwork);
    }

    @Transactional(readOnly = true)
    public List<ArtworkCardResponse> getUserArtworks(HttpSession session, String type) {
        User user = authService.getLoginUser(session);
        return switch (type.toLowerCase(Locale.ROOT)) {
            case "created" -> artworkRepository.findByCreator(user).stream().map(ArtworkCardResponse::from).toList();
            case "listed" -> artworkRepository.findByOwner(user).stream()
                    .filter(artwork -> artwork.getStatus() == ArtworkStatus.LISTED)
                    .map(ArtworkCardResponse::from)
                    .toList();
            default -> artworkRepository.findByOwner(user).stream().map(ArtworkCardResponse::from).toList();
        };
    }

    @Transactional
    public ArtworkDetailResponse approve(Long artworkId) {
        Artwork artwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "작품을 찾을 수 없습니다."));
        artwork.approveForMint(
                String.valueOf(1000 + artwork.getId()),
                "0xMockContractAddress",
                "0xTxHash" + artwork.getId(),
                "ipfs://metadata/" + artwork.getId()
        );
        artwork.list();
        return ArtworkDetailResponse.from(artwork);
    }

    @Transactional
    public ArtworkDetailResponse reject(Long artworkId) {
        Artwork artwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "작품을 찾을 수 없습니다."));
        artwork.reject();
        return ArtworkDetailResponse.from(artwork);
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "업로드 파일은 필수입니다.");
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "파일 크기는 100MB 이하여야 합니다.");
        }
        if (file.getContentType() == null || !ALLOWED_CONTENT_TYPES.contains(file.getContentType())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "지원하지 않는 파일 형식입니다.");
        }
    }

    private String storeFile(MultipartFile file) {
        try {
            Path directory = Paths.get(uploadDir);
            Files.createDirectories(directory);
            String storedName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path target = directory.resolve(storedName);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + storedName;
        } catch (IOException e) {
            throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 저장에 실패했습니다.");
        }
    }

    private boolean matchesCategory(Artwork artwork, String category) {
        if (category == null || category.isBlank() || category.equalsIgnoreCase("all")) {
            return true;
        }
        return artwork.getCategory().name().equalsIgnoreCase(category);
    }

    private boolean matchesStatus(Artwork artwork, String status) {
        if (status == null || status.isBlank() || status.equalsIgnoreCase("all")) {
            return artwork.getStatus() != ArtworkStatus.DRAFT;
        }

        try {
            return artwork.getStatus() == ArtworkStatus.valueOf(status.toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "상태 값이 올바르지 않습니다.");
        }
    }

    private boolean matchesKeyword(Artwork artwork, String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return true;
        }
        String lower = keyword.toLowerCase(Locale.ROOT);
        return artwork.getTitle().toLowerCase(Locale.ROOT).contains(lower)
                || artwork.getCreator().getNickname().toLowerCase(Locale.ROOT).contains(lower);
    }

    private Comparator<Artwork> resolveComparator(String sort) {
        if ("priceLow".equalsIgnoreCase(sort)) {
            return Comparator.comparing(Artwork::getPrice);
        }
        if ("priceHigh".equalsIgnoreCase(sort)) {
            return Comparator.comparing(Artwork::getPrice).reversed();
        }
        if ("latest".equalsIgnoreCase(sort)) {
            return Comparator.comparing(Artwork::getCreatedAt).reversed();
        }
        return Comparator.comparing(Artwork::getStatus).thenComparing(Artwork::getCreatedAt).reversed();
    }

    private ArtworkCategory parseCategory(String category) {
        try {
            return ArtworkCategory.valueOf(category.toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "카테고리 값이 올바르지 않습니다.");
        }
    }
}
