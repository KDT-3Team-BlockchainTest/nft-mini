package com.kdt.be.domain.user;

import com.kdt.be.domain.user.dto.UserSummaryResponse;
import com.kdt.be.domain.user.dto.WalletConnectRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WalletService {

    private final AuthService authService;
    private final UserRepository userRepository;

    @Transactional
    public UserSummaryResponse connect(WalletConnectRequest request, HttpSession session) {
        User user = authService.getLoginUser(session);
        String walletAddress = request.walletAddress().trim();

        if (userRepository.existsByWalletAddress(walletAddress)
                && (user.getWalletAddress() == null || !user.getWalletAddress().equals(walletAddress))) {
            throw new com.kdt.be.common.ApiException(org.springframework.http.HttpStatus.CONFLICT,
                    "이미 다른 계정에 연결된 지갑 주소입니다.");
        }

        user.connectWallet(walletAddress);
        return UserSummaryResponse.from(user);
    }
}
