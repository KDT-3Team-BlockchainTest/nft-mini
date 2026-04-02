package com.kdt.be.marketplace.service;

import com.kdt.be.artwork.entity.Artwork;
import com.kdt.be.artwork.enumtype.ArtworkCategory;
import com.kdt.be.artwork.repository.ArtworkRepository;
import com.kdt.be.artwork.dto.ArtworkCardResponse;
import com.kdt.be.marketplace.dto.HomeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final ArtworkRepository artworkRepository;

    @Transactional(readOnly = true)
    public HomeResponse getHome() {
        List<Artwork> artworks = artworkRepository.findAll();

        return new HomeResponse(
                artworks.stream().limit(4).map(ArtworkCardResponse::from).toList(),
                List.of(
                        new HomeResponse.CategorySummary("🎨", "AI 이미지", countByCategory(artworks, ArtworkCategory.IMAGE) + " 아이템"),
                        new HomeResponse.CategorySummary("🎭", "3D 에셋", countByCategory(artworks, ArtworkCategory.ASSET) + " 아이템"),
                        new HomeResponse.CategorySummary("🎵", "음악", countByCategory(artworks, ArtworkCategory.MUSIC) + " 아이템"),
                        new HomeResponse.CategorySummary("✨", "프롬프트", countByCategory(artworks, ArtworkCategory.PROMPT) + " 아이템")
                ),
                List.of(
                        new HomeResponse.SimpleInfo("✦", "콘텐츠 생성", "좋아하는 도구로 AI 아트, 음악 또는 3D 에셋을 생성하세요"),
                        new HomeResponse.SimpleInfo("⇪", "업로드 & 발행", "디지털 작품을 업로드하고 블록체인에 NFT로 발행하세요"),
                        new HomeResponse.SimpleInfo("◎", "등록 & 판매", "가격을 설정하고 마켓플레이스에 NFT를 등록하세요"),
                        new HomeResponse.SimpleInfo("↗", "로열티 수익", "모든 2차 판매에서 자동으로 로열티를 받으세요")
                ),
                List.of(
                        new HomeResponse.SimpleInfo("◎", "직접 수익화", "AI 생성 콘텐츠를 컬렉터에게 직접 판매하세요"),
                        new HomeResponse.SimpleInfo("🛡", "진정한 소유권", "블록체인으로 검증된 소유권과 출처"),
                        new HomeResponse.SimpleInfo("↗", "2차 재판매", "구매자가 NFT를 재판매하여 활발한 마켓플레이스 형성"),
                        new HomeResponse.SimpleInfo("✦", "크리에이터 로열티", "모든 재판매에서 수동 소득 창출")
                )
        );
    }

    private long countByCategory(List<Artwork> artworks, ArtworkCategory category) {
        return artworks.stream().filter(artwork -> artwork.getCategory() == category).count();
    }
}
