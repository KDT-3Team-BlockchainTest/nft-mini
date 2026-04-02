package com.kdt.be.common.util;

import com.kdt.be.marketplace.entity.Activity;
import com.kdt.be.marketplace.repository.ActivityRepository;
import com.kdt.be.marketplace.entity.ActivityType;
import com.kdt.be.artwork.entity.Artwork;
import com.kdt.be.artwork.enumtype.ArtworkCategory;
import com.kdt.be.artwork.repository.ArtworkRepository;
import com.kdt.be.artwork.enumtype.ArtworkStatus;
import com.kdt.be.artwork.enumtype.SaleType;
import com.kdt.be.user.entity.User;
import com.kdt.be.user.repository.UserRepository;
import com.kdt.be.user.entity.UserRole;
import com.kdt.be.user.entity.UserStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ArtworkRepository artworkRepository;
    private final ActivityRepository activityRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        User admin = userRepository.save(User.builder()
                .name("Admin")
                .nickname("Admin")
                .email("admin@example.com")
                .passwordHash(passwordEncoder.encode("admin1234"))
                .role(UserRole.ADMIN)
                .status(UserStatus.ACTIVE)
                .bio("플랫폼 운영 관리자")
                .createdAt(LocalDateTime.now())
                .build());

        User creator = userRepository.save(User.builder()
                .name("Nova Kim")
                .nickname("PixelMaster")
                .email("nova@example.com")
                .passwordHash(passwordEncoder.encode("creator1234"))
                .role(UserRole.CREATOR)
                .status(UserStatus.ACTIVE)
                .walletAddress("0x92d3ab1288ef0012af")
                .bio("AI 기반 마스터피스를 만드는 디지털 아티스트")
                .createdAt(LocalDateTime.now().minusDays(20))
                .build());

        User buyer = userRepository.save(User.builder()
                .name("Rin Park")
                .nickname("CollectorRin")
                .email("rin@example.com")
                .passwordHash(passwordEncoder.encode("user1234"))
                .role(UserRole.USER)
                .status(UserStatus.ACTIVE)
                .walletAddress("0xa831beef7cd9")
                .bio("AI 아트 수집가")
                .createdAt(LocalDateTime.now().minusDays(12))
                .build());

        User suspended = userRepository.save(User.builder()
                .name("Min J")
                .nickname("MinJ")
                .email("min@example.com")
                .passwordHash(passwordEncoder.encode("user1234"))
                .role(UserRole.USER)
                .status(UserStatus.SUSPENDED)
                .bio("정지된 계정")
                .createdAt(LocalDateTime.now().minusDays(10))
                .build());

        Artwork listed1 = artworkRepository.save(Artwork.builder()
                .creator(creator)
                .owner(creator)
                .title("네온 드림")
                .description("네온 조명과 몽환적인 도시 풍경을 결합한 AI 아트워크")
                .category(ArtworkCategory.IMAGE)
                .price(new BigDecimal("2.5"))
                .blockchain("Ethereum")
                .saleType(SaleType.BUY_NOW)
                .status(ArtworkStatus.LISTED)
                .fileUrl("https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=80")
                .previewImageUrl("https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=80")
                .fileName("neon-dream.png")
                .contentType("image/png")
                .fileSize(1024L)
                .tags("neon,city,ai")
                .licenseScope("COMMERCIAL")
                .termsAgreed(true)
                .tokenId("123")
                .contractAddress("0xMockContract")
                .txHash("0xSaleTx1")
                .metadataUri("ipfs://metadata/123")
                .submittedAt(LocalDateTime.now().minusDays(7))
                .mintedAt(LocalDateTime.now().minusDays(6))
                .createdAt(LocalDateTime.now().minusDays(8))
                .build());

        Artwork listed2 = artworkRepository.save(Artwork.builder()
                .creator(creator)
                .owner(creator)
                .title("추상 차원")
                .description("입체적인 색면과 패턴으로 구성된 추상 디지털 아트")
                .category(ArtworkCategory.IMAGE)
                .price(new BigDecimal("1.8"))
                .blockchain("Ethereum")
                .saleType(SaleType.BUY_NOW)
                .status(ArtworkStatus.MINTED)
                .fileUrl("https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=900&q=80")
                .previewImageUrl("https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=900&q=80")
                .fileName("abstract-dimension.png")
                .contentType("image/png")
                .fileSize(1024L)
                .tags("abstract,color")
                .licenseScope("PERSONAL")
                .termsAgreed(true)
                .tokenId("124")
                .contractAddress("0xMockContract")
                .txHash("0xSaleTx2")
                .metadataUri("ipfs://metadata/124")
                .submittedAt(LocalDateTime.now().minusDays(5))
                .mintedAt(LocalDateTime.now().minusDays(4))
                .createdAt(LocalDateTime.now().minusDays(5))
                .build());

        Artwork sold = artworkRepository.save(Artwork.builder()
                .creator(creator)
                .owner(buyer)
                .title("기하학적 흐름")
                .description("기하학적 형태와 유체적인 색채를 결합한 작품")
                .category(ArtworkCategory.ASSET)
                .price(new BigDecimal("1.5"))
                .blockchain("Ethereum")
                .saleType(SaleType.BUY_NOW)
                .status(ArtworkStatus.SOLD)
                .fileUrl("https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=900&q=80")
                .previewImageUrl("https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=900&q=80")
                .fileName("geo-flow.png")
                .contentType("image/png")
                .fileSize(1024L)
                .tags("geometry,flow")
                .licenseScope("COMMERCIAL")
                .termsAgreed(true)
                .tokenId("125")
                .contractAddress("0xMockContract")
                .txHash("0xSaleTx3")
                .metadataUri("ipfs://metadata/125")
                .submittedAt(LocalDateTime.now().minusDays(10))
                .mintedAt(LocalDateTime.now().minusDays(9))
                .createdAt(LocalDateTime.now().minusDays(11))
                .build());

        Artwork pending = artworkRepository.save(Artwork.builder()
                .creator(creator)
                .owner(creator)
                .title("Dreamscape #01")
                .description("검수 대기 중인 신규 작품")
                .category(ArtworkCategory.MUSIC)
                .price(new BigDecimal("2.1"))
                .blockchain("Ethereum")
                .saleType(SaleType.BUY_NOW)
                .status(ArtworkStatus.PENDING_REVIEW)
                .fileUrl("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80")
                .previewImageUrl("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80")
                .fileName("dreamscape.mp3")
                .contentType("audio/mpeg")
                .fileSize(1024L)
                .tags("dream,ambient")
                .licenseScope("COMMERCIAL")
                .termsAgreed(true)
                .submittedAt(LocalDateTime.now())
                .createdAt(LocalDateTime.now().minusDays(1))
                .build());

        activityRepository.saveAll(List.of(
                Activity.builder()
                        .user(creator)
                        .artwork(listed1)
                        .type(ActivityType.SALE)
                        .subtitle("판매 대상 0x1234...5678")
                        .amount(new BigDecimal("2.5"))
                        .activityDate(LocalDate.now().minusDays(5))
                        .build(),
                Activity.builder()
                        .user(creator)
                        .artwork(listed2)
                        .type(ActivityType.ROYALTY)
                        .subtitle("2차 판매 로열티")
                        .amount(new BigDecimal("0.18"))
                        .activityDate(LocalDate.now().minusDays(3))
                        .build(),
                Activity.builder()
                        .user(buyer)
                        .artwork(sold)
                        .type(ActivityType.PURCHASE)
                        .subtitle("구매 대상 PixelMaster")
                        .amount(new BigDecimal("1.5"))
                        .activityDate(LocalDate.now().minusDays(4))
                        .build(),
                Activity.builder()
                        .user(creator)
                        .artwork(sold)
                        .type(ActivityType.ROYALTY)
                        .subtitle("2차 판매 로열티")
                        .amount(new BigDecimal("0.25"))
                        .activityDate(LocalDate.now().minusDays(2))
                        .build()
        ));
    }
}
