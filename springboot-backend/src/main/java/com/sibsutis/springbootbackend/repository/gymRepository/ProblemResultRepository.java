package com.sibsutis.springbootbackend.repository.gymRepository;

import com.sibsutis.springbootbackend.model.gymModel.ProblemResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemResultRepository extends JpaRepository<ProblemResult,Long> {
}
