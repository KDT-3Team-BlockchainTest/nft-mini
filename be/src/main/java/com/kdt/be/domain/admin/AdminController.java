package com.kdt.be.domain.admin;

import com.kdt.be.common.ApiResponse;
import com.kdt.be.domain.artwork.dto.ArtworkDetailResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ApiResponse<AdminDashboardResponse> getDashboard(HttpSession session) {
        return ApiResponse.ok(adminService.getDashboard(session));
    }

    @PostMapping("/artworks/{artworkId}/approve")
    public ApiResponse<ArtworkDetailResponse> approve(
            @PathVariable Long artworkId,
            HttpSession session
    ) {
        return ApiResponse.ok(adminService.approve(artworkId, session), "작품 민팅이 승인되었습니다.");
    }

    @PostMapping("/artworks/{artworkId}/reject")
    public ApiResponse<ArtworkDetailResponse> reject(
            @PathVariable Long artworkId,
            HttpSession session
    ) {
        return ApiResponse.ok(adminService.reject(artworkId, session), "작품이 반려되었습니다.");
    }
}
