package com.kdt.be.wallet.dto;

import jakarta.validation.constraints.NotBlank;

public record WalletConnectRequest(
        @NotBlank(message = "지갑 주소는 필수입니다.")
        String walletAddress,
        @NotBlank(message = "서명 메시지는 필수입니다.")
        String signatureMessage,
        @NotBlank(message = "서명값은 필수입니다.")
        String signature
) {
}
