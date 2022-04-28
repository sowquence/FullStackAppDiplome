package com.sibsutis.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sibsutis.springbootbackend.dto.GymDto;
import com.sibsutis.springbootbackend.model.gymModel.Result;
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
@Table(name = "student_profile")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String handle;

    @Column(name = "curr_rating")
    private int rating;

    @Column(name = "curr_rank")
    private String rank;

    @Column(name = "max_rating")
    private int maxRating;

    @Column(name = "max_rank")
    private String maxRank;

    @Column(name = "solved_contests")
    private int solvedContests;

    @Column(name = "total_tasks")
    private int totalTasks;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "profile")
    private Student student;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_fid", referencedColumnName = "id")
    private List<Contest> contests;
}

