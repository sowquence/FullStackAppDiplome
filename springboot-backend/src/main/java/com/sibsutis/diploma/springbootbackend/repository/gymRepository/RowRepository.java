package com.sibsutis.diploma.springbootbackend.repository.gymRepository;

import com.sibsutis.diploma.springbootbackend.model.gymModel.Row;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RowRepository extends JpaRepository<Row,Long> {
}
