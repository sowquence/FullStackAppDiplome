package com.sibsutis.diploma.springbootbackend.service;

import com.sibsutis.diploma.springbootbackend.dto.GymDto;
import com.sibsutis.diploma.springbootbackend.model.Contest;
import com.sibsutis.diploma.springbootbackend.model.Gym;
import com.sibsutis.diploma.springbootbackend.model.Problem;
import com.sibsutis.diploma.springbootbackend.model.StudentProfile;
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

    public Map<Gym, List<Problem>> getStudentGym(String handle, long contestId){
        return codeforcesClient.getGym(handle,contestId);
    }

    public int getTotalTasksSolvedByHandle(String handle){
        return codeforcesClient.getTotalTasksSolvedByHandle(handle);
    }
}
