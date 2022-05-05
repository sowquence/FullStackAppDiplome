package com.sibsutis.springbootbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gyms")
public class Gym {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long gId;
    @Column(name = "gym_id")
    private long id;
    @Column(name = "gym_name")
    private String name;

    private String tag;

    @OneToMany(mappedBy = "gym", cascade = CascadeType.ALL)
    private Set<GymProgress> gymProgresses;

    public Gym(Gym gym, Set<GymProgress> gymProgresses) {
        this.id = gym.getId();
        this.name = gym.getName();
        this.tag = gym.getTag();
        for (GymProgress gp : gymProgresses){
            gp.setGym(this);
            gp.setGyId(this.getId());
        }
        this.gymProgresses = gymProgresses;
    }

}
