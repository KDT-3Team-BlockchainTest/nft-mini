package com.kdt.be.user.controller;

import com.kdt.be.common.response.ApiResponse;
import com.kdt.be.user.dto.MyPageResponse;
import com.kdt.be.user.service.MyPageService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/me/dashboard")
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping
    public ApiResponse<MyPageResponse> getDashboard(HttpSession session) {
        return ApiResponse.ok(myPageService.getDashboard(session));
    }
}
