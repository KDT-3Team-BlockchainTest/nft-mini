package com.kdt.be.domain.artwork;

import com.kdt.be.common.ApiResponse;
import com.kdt.be.domain.artwork.dto.ArtworkCardResponse;
import com.kdt.be.domain.artwork.dto.ArtworkDetailResponse;
import com.kdt.be.domain.artwork.dto.MarketplaceResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ArtworkController {

    private final ArtworkService artworkService;

    @PostMapping("/artworks")
    public ApiResponse<ArtworkDetailResponse> createArtwork(
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam String category,
            @RequestParam BigDecimal price,
            @RequestParam String licenseScope,
            @RequestParam(required = false) String tags,
            @RequestParam Boolean termsAgreed,
            @RequestParam MultipartFile file,
            HttpSession session
    ) {
        return ApiResponse.ok(
                artworkService.create(title, description, category, price, licenseScope, tags, termsAgreed, file, session),
                "작품이 업로드되어 검수 대기 상태로 저장되었습니다."
        );
    }

    @GetMapping("/marketplace/nfts")
    public ApiResponse<MarketplaceResponse> getMarketplace(
            @RequestParam(required = false, defaultValue = "all") String category,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "trending") String sort,
            @RequestParam(required = false, defaultValue = "0") BigDecimal minPrice,
            @RequestParam(required = false, defaultValue = "999999") BigDecimal maxPrice,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "8") int size
    ) {
        return ApiResponse.ok(artworkService.getMarketplace(category, keyword, sort, minPrice, maxPrice, page, size));
    }

    @GetMapping("/artworks/me")
    public ApiResponse<List<ArtworkCardResponse>> myArtworks(
            @RequestParam(defaultValue = "owned") String type,
            HttpSession session
    ) {
        return ApiResponse.ok(artworkService.getUserArtworks(session, type));
    }
}
