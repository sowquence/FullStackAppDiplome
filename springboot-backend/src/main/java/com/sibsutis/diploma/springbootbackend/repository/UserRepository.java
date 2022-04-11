package com.sibsutis.diploma.springbootbackend.repository;

import com.sibsutis.diploma.springbootbackend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Profile,Long> {

}
