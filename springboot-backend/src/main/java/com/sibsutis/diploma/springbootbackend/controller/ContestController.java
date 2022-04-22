package com.sibsutis.diploma.springbootbackend.controller;

import com.sibsutis.diploma.springbootbackend.dto.GymDto;
import com.sibsutis.diploma.springbootbackend.exception.ResourceNotFoundException;
import com.sibsutis.diploma.springbootbackend.model.Contest;
import com.sibsutis.diploma.springbootbackend.model.Gym;
import com.sibsutis.diploma.springbootbackend.model.Problem;
import com.sibsutis.diploma.springbootbackend.model.StudentProfile;
import com.sibsutis.diploma.springbootbackend.repository.ContestRepository;
import com.sibsutis.diploma.springbootbackend.repository.GymRepository;
import com.sibsutis.diploma.springbootbackend.repository.StudentProfileRepository;
import com.sibsutis.diploma.springbootbackend.service.CodeforcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000/","http://192.168.0.6:3000/"})
@RestController
@RequestMapping("api/v1/contests")
public class ContestController {

    @Autowired
    ContestRepository contestRepository;

    @Autowired
    StudentProfileRepository studentProfileRepository;

    @Autowired
    CodeforcesService codeforcesService;

    @Autowired
    GymRepository gymRepository;

    @GetMapping("{id}")
    public List<Contest> getAllContestByUId(@PathVariable long id){
        return studentProfileRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Profile not exist with id " + id)).getContests();
    }

    @GetMapping("gym") //TODO Post
    public Gym getInfoGym(){ //http://localhost:8080/api/v1/contests/gym
        Map<Gym,List<Problem>> gymProblem = codeforcesService.getStudentGym("nottey", 100173);

        Gym gym = null;
        List<Problem> problems = null;
         for (Map.Entry<Gym,List<Problem>> entry : gymProblem.entrySet()){
             gym = entry.getKey();
             problems = entry.getValue();
         }

        assert gym != null;
        gym.setProblems(problems);
        gymRepository.save(gym);
        return gym;
    }


}
