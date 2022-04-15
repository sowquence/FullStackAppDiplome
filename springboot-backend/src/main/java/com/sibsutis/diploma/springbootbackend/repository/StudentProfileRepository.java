package com.sibsutis.diploma.springbootbackend.repository;

import com.sibsutis.diploma.springbootbackend.model.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile,Long> {
}
