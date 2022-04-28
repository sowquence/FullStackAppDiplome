package com.sibsutis.springbootbackend.model.gymModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gym_row")
public class Row {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "problem_point")
    private int points;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "row_fid", referencedColumnName = "id")
    private List<ProblemResult> problemResults;
}
