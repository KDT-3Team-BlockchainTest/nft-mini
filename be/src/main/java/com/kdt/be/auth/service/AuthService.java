package com.kdt.be.auth.service;

import com.kdt.be.auth.session.SessionUser;
import com.kdt.be.common.exception.ApiException;
import com.kdt.be.auth.dto.LoginRequest;
import com.kdt.be.auth.dto.SignupRequest;
import com.kdt.be.user.dto.UserSummaryResponse;
import com.kdt.be.user.entity.User;
import com.kdt.be.user.entity.UserRole;
import com.kdt.be.user.entity.UserStatus;
import com.kdt.be.user.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    public static final String SESSION_KEY = "LOGIN_USER";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserSummaryResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ApiException(HttpStatus.CONFLICT, "이미 사용 중인 이메일입니다.");
        }
        if (userRepository.existsByNickname(request.nickname())) {
            throw new ApiException(HttpStatus.CONFLICT, "이미 사용 중인 닉네임입니다.");
        }
        if (request.walletAddress() != null && !request.walletAddress().isBlank()
                && userRepository.existsByWalletAddress(request.walletAddress())) {
            throw new ApiException(HttpStatus.CONFLICT, "이미 연결된 지갑 주소입니다.");
        }

        User user = User.builder()
                .name(request.name())
                .nickname(request.nickname())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(request.role())
                .status(UserStatus.ACTIVE)
                .walletAddress(blankToNull(request.walletAddress()))
                .bio("NexusArt 사용자")
                .createdAt(LocalDateTime.now())
                .build();

        return UserSummaryResponse.from(userRepository.save(user));
    }

    public UserSummaryResponse login(LoginRequest request, HttpSession session) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다."));

        if (user.getStatus() == UserStatus.SUSPENDED) {
            throw new ApiException(HttpStatus.FORBIDDEN, "정지된 계정입니다.");
        }
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        session.setAttribute(
                SESSION_KEY,
                new SessionUser(user.getId(), user.getEmail(), user.getNickname(), user.getRole())
        );
        return UserSummaryResponse.from(user);
    }

    public void logout(HttpSession session) {
        session.invalidate();
    }

    public UserSummaryResponse me(HttpSession session) {
        return UserSummaryResponse.from(getLoginUser(session));
    }

    public User getLoginUser(HttpSession session) {
        SessionUser sessionUser = (SessionUser) session.getAttribute(SESSION_KEY);
        if (sessionUser == null) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
        return userRepository.findById(sessionUser.id())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "세션 정보를 찾을 수 없습니다."));
    }

    public User getAdminUser(HttpSession session) {
        User user = getLoginUser(session);
        if (user.getRole() != UserRole.ADMIN) {
            throw new ApiException(HttpStatus.FORBIDDEN, "관리자 권한이 필요합니다.");
        }
        return user;
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value;
    }
}
