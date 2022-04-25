package com.sibsutis.diploma.springbootbackend.repository.gymRepository;

import com.sibsutis.diploma.springbootbackend.model.gymModel.ProblemResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemResultRepository extends JpaRepository<ProblemResult,Long> {
}
