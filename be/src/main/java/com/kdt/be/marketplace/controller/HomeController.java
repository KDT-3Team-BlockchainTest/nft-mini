package com.kdt.be.marketplace.controller;

import com.kdt.be.common.response.ApiResponse;
import com.kdt.be.marketplace.dto.HomeResponse;
import com.kdt.be.marketplace.service.HomeService;
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
