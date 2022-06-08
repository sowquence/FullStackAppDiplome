package com.sibsutis.springbootbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student_profile")
public class StudentProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; // не меняется
    private String handle; // не меняется
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
    @Column(name = "tasks_on_month")
    private int monthTasks;

//    private boolean internalOlympiad;
//    private int tasksOnInternal;
//    private boolean cityOlympiad;
//    private int tasksOnCity;


    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "profile")
    private Student student; // не меняется

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private List<StudentContest> studentContests;

    @OneToMany(mappedBy = "studentProfile", cascade = CascadeType.ALL)
    private Set<GymProgress> gymProgresses = new HashSet<>();

    @Override
    public String toString() {
        return  handle ;
    }
}

