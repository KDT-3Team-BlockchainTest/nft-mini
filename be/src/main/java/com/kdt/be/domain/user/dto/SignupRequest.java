package com.kdt.be.domain.user.dto;

import com.kdt.be.domain.user.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SignupRequest(
        @NotBlank(message = "이름은 필수입니다.")
        String name,
        @NotBlank(message = "닉네임은 필수입니다.")
        String nickname,
        @Email(message = "이메일 형식을 확인해주세요.")
        @NotBlank(message = "이메일은 필수입니다.")
        String email,
        @Size(min = 8, message = "비밀번호는 8자 이상이어야 합니다.")
        String password,
        @NotNull(message = "역할은 필수입니다.")
        UserRole role,
        String walletAddress
) {
}
