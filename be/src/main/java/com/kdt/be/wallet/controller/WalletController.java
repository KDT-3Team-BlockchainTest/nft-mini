package com.kdt.be.wallet.controller;

import com.kdt.be.common.response.ApiResponse;
import com.kdt.be.user.dto.UserSummaryResponse;
import com.kdt.be.wallet.service.WalletService;
import com.kdt.be.wallet.dto.WalletConnectRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wallet")
public class WalletController {

    private final WalletService walletService;

    @PostMapping("/connect")
    public ApiResponse<UserSummaryResponse> connect(
            @Valid @RequestBody WalletConnectRequest request,
            HttpSession session
    ) {
        return ApiResponse.ok(walletService.connect(request, session), "지갑 연결이 완료되었습니다.");
    }
}
