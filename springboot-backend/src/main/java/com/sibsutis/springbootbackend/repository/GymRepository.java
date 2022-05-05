package com.sibsutis.springbootbackend.repository;

import com.sibsutis.springbootbackend.model.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymRepository extends JpaRepository<Gym,Long> {
    Gym findGymById(long id);
}
