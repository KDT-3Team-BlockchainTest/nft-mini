package com.kdt.be.domain.user;

import com.kdt.be.common.ApiResponse;
import com.kdt.be.domain.user.dto.LoginRequest;
import com.kdt.be.domain.user.dto.SignupRequest;
import com.kdt.be.domain.user.dto.UserSummaryResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ApiResponse<UserSummaryResponse> signup(@Valid @RequestBody SignupRequest request) {
        return ApiResponse.ok(authService.signup(request), "회원가입이 완료되었습니다.");
    }

    @PostMapping("/login")
    public ApiResponse<UserSummaryResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpSession session
    ) {
        return ApiResponse.ok(authService.login(request, session), "로그인되었습니다.");
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(HttpSession session) {
        authService.logout(session);
        return ApiResponse.ok(null, "로그아웃되었습니다.");
    }

    @GetMapping("/me")
    public ApiResponse<UserSummaryResponse> me(HttpSession session) {
        return ApiResponse.ok(authService.me(session));
    }
}
