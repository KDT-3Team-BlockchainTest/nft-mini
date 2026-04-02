package com.kdt.be.domain.activity;

import com.kdt.be.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUserAndTypeOrderByActivityDateDesc(User user, ActivityType type);
}
