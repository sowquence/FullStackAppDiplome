package com.sibsutis.springbootbackend.repository;

import com.sibsutis.springbootbackend.model.GymProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymProgressRepository extends JpaRepository<GymProgress,Long> {
}
