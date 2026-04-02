package com.kdt.be.marketplace.repository;

import com.kdt.be.marketplace.entity.Activity;
import com.kdt.be.marketplace.entity.ActivityType;
import com.kdt.be.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUserAndTypeOrderByActivityDateDesc(User user, ActivityType type);
}
