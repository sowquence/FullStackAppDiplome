package com.sibsutis.diploma.springbootbackend.service;

import com.sibsutis.diploma.springbootbackend.model.*;
import com.sibsutis.diploma.springbootbackend.model.gymModel.Gym;
import com.sibsutis.diploma.springbootbackend.model.gymModel.Problem;
import com.sibsutis.diploma.springbootbackend.model.gymModel.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CodeforcesService {

    @Autowired
    private CodeforcesClient codeforcesClient;

    public StudentProfile getStudentProfile(String handle){
        return codeforcesClient.getStudentProfile(handle);
    }

    public List<Contest> getStudentContests(String handle){
        return codeforcesClient.getStudentContests(handle);
    }

    public Result getStudentGym(long contestId){
        return codeforcesClient.getGym(contestId);
    }

    public int getTotalTasksSolvedByHandle(String handle){
        return codeforcesClient.getTotalTasksSolvedByHandle(handle);
    }
}
