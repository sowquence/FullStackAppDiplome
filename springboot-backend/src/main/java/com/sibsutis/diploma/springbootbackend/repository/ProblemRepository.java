package com.sibsutis.diploma.springbootbackend.repository;

import com.sibsutis.diploma.springbootbackend.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemRepository extends JpaRepository<Problem,Long> {
}
