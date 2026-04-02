package com.kdt.be.artwork.repository;

import com.kdt.be.artwork.entity.Artwork;
import com.kdt.be.artwork.enumtype.ArtworkCategory;
import com.kdt.be.artwork.enumtype.ArtworkStatus;
import com.kdt.be.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface ArtworkRepository extends JpaRepository<Artwork, Long> {
    List<Artwork> findByStatusIn(List<ArtworkStatus> statuses);

    List<Artwork> findByCreator(User creator);

    List<Artwork> findByOwner(User owner);

    long countByStatus(ArtworkStatus status);

    List<Artwork> findByStatusAndCategoryInAndPriceBetween(
            ArtworkStatus status,
            List<ArtworkCategory> categories,
            BigDecimal minPrice,
            BigDecimal maxPrice
    );
}
