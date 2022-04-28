package com.sibsutis.springbootbackend.model.gymModel;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "gym_result")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "gym_id")
    private Gym contest;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "gym_pid", referencedColumnName = "id")
    private List<Problem> problems;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "gym_rid", referencedColumnName = "id")
    private List<Row> rows;
}
