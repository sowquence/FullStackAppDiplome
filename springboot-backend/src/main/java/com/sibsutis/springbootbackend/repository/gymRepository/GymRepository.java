package com.sibsutis.springbootbackend.repository.gymRepository;

import com.sibsutis.springbootbackend.model.gymModel.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymRepository extends JpaRepository<Gym,Long> {
}
