package com.kdt.be.domain.home;

import com.kdt.be.common.ApiResponse;
import com.kdt.be.domain.artwork.dto.HomeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/home")
public class HomeController {

    private final HomeService homeService;

    @GetMapping
    public ApiResponse<HomeResponse> getHome() {
        return ApiResponse.ok(homeService.getHome());
    }
}
