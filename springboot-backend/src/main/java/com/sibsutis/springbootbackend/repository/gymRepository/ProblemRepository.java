package com.sibsutis.springbootbackend.repository.gymRepository;

import com.sibsutis.springbootbackend.model.gymModel.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemRepository extends JpaRepository<Problem,Long> {
}
