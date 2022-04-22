package com.sibsutis.diploma.springbootbackend.repository;

import com.sibsutis.diploma.springbootbackend.model.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Long> {
}
