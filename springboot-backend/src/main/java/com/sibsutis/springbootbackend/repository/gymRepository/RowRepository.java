package com.sibsutis.springbootbackend.repository.gymRepository;

import com.sibsutis.springbootbackend.model.gymModel.Row;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RowRepository extends JpaRepository<Row,Long> {
}
