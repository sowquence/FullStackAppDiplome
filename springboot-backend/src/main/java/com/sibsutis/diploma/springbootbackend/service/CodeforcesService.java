package com.sibsutis.diploma.springbootbackend.service;

import com.sibsutis.diploma.springbootbackend.model.StudentProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CodeforcesService {

    @Autowired
    private CodeforcesClient codeforcesClient;

    public StudentProfile getStudentProfile(String handle){
        return codeforcesClient.getStudentProfile(handle);
    }

}
