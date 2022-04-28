package com.sibsutis.springbootbackend.repository;

import com.sibsutis.springbootbackend.model.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Long> {
}
