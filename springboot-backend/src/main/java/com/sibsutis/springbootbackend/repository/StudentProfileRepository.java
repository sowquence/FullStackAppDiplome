package com.sibsutis.springbootbackend.repository;

import com.sibsutis.springbootbackend.model.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile,Long> {
}
