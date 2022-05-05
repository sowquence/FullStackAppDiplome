package com.sibsutis.springbootbackend.repository;

import com.sibsutis.springbootbackend.model.StudentContest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentContestRepository extends JpaRepository<StudentContest, Long> {
}
