package com.kdt.be.user.repository;

import java.util.Optional;

import com.kdt.be.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    boolean existsByWalletAddress(String walletAddress);

    Optional<User> findByEmail(String email);
}
