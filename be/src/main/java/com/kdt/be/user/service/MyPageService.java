package com.kdt.be.user.service;

import com.kdt.be.marketplace.entity.Activity;
import com.kdt.be.marketplace.repository.ActivityRepository;
import com.kdt.be.marketplace.entity.ActivityType;
import com.kdt.be.artwork.entity.Artwork;
import com.kdt.be.user.dto.MyPageResponse;
import com.kdt.be.artwork.repository.ArtworkRepository;
import com.kdt.be.artwork.enumtype.ArtworkStatus;
import com.kdt.be.artwork.dto.ArtworkCardResponse;
import com.kdt.be.auth.service.AuthService;
import com.kdt.be.user.entity.User;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final AuthService authService;
    private final ArtworkRepository artworkRepository;
    private final ActivityRepository activityRepository;

    @Transactional(readOnly = true)
    public MyPageResponse getDashboard(HttpSession session) {
        User user = authService.getLoginUser(session);
        List<Artwork> owned = artworkRepository.findByOwner(user);
        List<Artwork> created = artworkRepository.findByCreator(user);
        List<Artwork> listed = owned.stream()
                .filter(artwork -> artwork.getStatus() == ArtworkStatus.LISTED)
                .toList();
        List<Activity> sales = activityRepository.findByUserAndTypeOrderByActivityDateDesc(user, ActivityType.SALE);
        List<Activity> purchases = activityRepository.findByUserAndTypeOrderByActivityDateDesc(user, ActivityType.PURCHASE);
        List<Activity> royalties = activityRepository.findByUserAndTypeOrderByActivityDateDesc(user, ActivityType.ROYALTY);

        return new MyPageResponse(
                new MyPageResponse.Profile(
                        user.getName(),
                        user.getBio(),
                        user.getWalletAddress()
                ),
                new MyPageResponse.Stats(
                        owned.size(),
                        created.size(),
                        sumAmounts(sales) + " ETH",
                        sumAmounts(royalties) + " ETH"
                ),
                owned.stream().map(ArtworkCardResponse::from).toList(),
                created.stream().map(ArtworkCardResponse::from).toList(),
                listed.stream().map(ArtworkCardResponse::from).toList(),
                sales.stream().map(MyPageResponse.ActivityItem::from).toList(),
                purchases.stream().map(MyPageResponse.ActivityItem::from).toList(),
                royalties.stream().map(MyPageResponse.ActivityItem::from).toList()
        );
    }

    private String sumAmounts(List<Activity> activities) {
        return activities.stream()
                .map(Activity::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .stripTrailingZeros()
                .toPlainString();
    }
}
