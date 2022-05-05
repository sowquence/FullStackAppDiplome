package com.sibsutis.springbootbackend.service;

import com.sibsutis.springbootbackend.dto.GymResult;
import com.sibsutis.springbootbackend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodeforcesService {

    @Autowired
    private CodeforcesClient codeforcesClient;

    public StudentProfile getStudentProfile(String handle){
        return codeforcesClient.getStudentProfile(handle);
    }

    public List<StudentContest> getStudentContests(String handle){
        return codeforcesClient.getStudentContests(handle);
    }

    public GymResult getGymResult(long gymId, List<String> handles){
        return codeforcesClient.getGymResult(gymId,handles);
    }

    public int getMonthTasksSolvedByHandle(String handle){
        return codeforcesClient.getTotalTasksSolvedByHandle(handle);
    }
}
