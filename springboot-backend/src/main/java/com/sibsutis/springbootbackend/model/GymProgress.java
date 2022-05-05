package com.sibsutis.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "gym_progress")
public class GymProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "gym_id")
    @JsonIgnore
    private Gym gym;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "st_profile_id")
    @JsonIgnore
    private StudentProfile studentProfile;
    private double points;

    private long gyId;
    private long profileId;

    public GymProgress(StudentProfile studentProfile, double points) {
        this.studentProfile = studentProfile;
        this.points = points;
        this.profileId = studentProfile.getId();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GymProgress that)) return false;
        return Objects.equals(gym.getName(), that.gym.getName()) &&
                Objects.equals(studentProfile.getHandle(), that.studentProfile.getHandle()) &&
                Objects.equals(points, that.points);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studentProfile.getHandle(), points);
    }
}
