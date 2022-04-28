package com.sibsutis.springbootbackend.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "contests")
public class Contest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "contest_id")
    private long contestId;
    @Column(name = "contest_name")
    private String contestName;
    @Column(name = "old_rating")
    private int oldRating;
    @Column(name = "new_rating")
    private int newRating;
}
