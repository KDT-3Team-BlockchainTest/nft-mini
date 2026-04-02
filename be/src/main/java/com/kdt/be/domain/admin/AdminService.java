package com.kdt.be.domain.admin;

import com.kdt.be.domain.artwork.ArtworkRepository;
import com.kdt.be.domain.artwork.ArtworkService;
import com.kdt.be.domain.artwork.ArtworkStatus;
import com.kdt.be.domain.artwork.dto.ArtworkDetailResponse;
import com.kdt.be.domain.user.AuthService;
import com.kdt.be.domain.user.UserRepository;
import com.kdt.be.domain.user.UserStatus;
import com.kdt.be.domain.user.dto.UserSummaryResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AuthService authService;
    private final ArtworkRepository artworkRepository;
    private final ArtworkService artworkService;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboard(HttpSession session) {
        authService.getAdminUser(session);

        return new AdminDashboardResponse(
                new AdminDashboardResponse.Stats(
                        userRepository.count(),
                        artworkRepository.findAll().stream()
                                .filter(artwork -> artwork.getStatus() == ArtworkStatus.PENDING_REVIEW
                                        || artwork.getStatus() == ArtworkStatus.REVIEWING)
                                .count(),
                        artworkRepository.findAll().stream()
                                .filter(artwork -> artwork.getMintedAt() != null
                                        && artwork.getMintedAt().toLocalDate().isEqual(LocalDate.now()))
                                .count(),
                        userRepository.findAll().stream()
                                .filter(user -> user.getStatus() == UserStatus.SUSPENDED)
                                .count()
                ),
                artworkRepository.findAll().stream()
                        .filter(artwork -> artwork.getStatus() == ArtworkStatus.PENDING_REVIEW
                                || artwork.getStatus() == ArtworkStatus.REVIEWING)
                        .map(ArtworkDetailResponse::from)
                        .toList(),
                userRepository.findAll().stream().map(UserSummaryResponse::from).toList()
        );
    }

    @Transactional
    public ArtworkDetailResponse approve(Long artworkId, HttpSession session) {
        authService.getAdminUser(session);
        return artworkService.approve(artworkId);
    }

    @Transactional
    public ArtworkDetailResponse reject(Long artworkId, HttpSession session) {
        authService.getAdminUser(session);
        return artworkService.reject(artworkId);
    }
}
