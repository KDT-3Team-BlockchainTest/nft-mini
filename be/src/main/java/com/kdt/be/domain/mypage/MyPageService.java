package com.kdt.be.domain.mypage;

import com.kdt.be.domain.activity.Activity;
import com.kdt.be.domain.activity.ActivityRepository;
import com.kdt.be.domain.activity.ActivityType;
import com.kdt.be.domain.artwork.Artwork;
import com.kdt.be.domain.artwork.ArtworkRepository;
import com.kdt.be.domain.artwork.ArtworkStatus;
import com.kdt.be.domain.artwork.dto.ArtworkCardResponse;
import com.kdt.be.domain.user.AuthService;
import com.kdt.be.domain.user.User;
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
