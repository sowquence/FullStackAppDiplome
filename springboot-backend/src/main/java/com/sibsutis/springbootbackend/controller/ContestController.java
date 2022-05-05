package com.sibsutis.springbootbackend.controller;

import com.fasterxml.jackson.annotation.JsonValue;
import com.sibsutis.springbootbackend.dto.GymResult;
import com.sibsutis.springbootbackend.dto.GymStatusInfo;
import com.sibsutis.springbootbackend.model.*;
import com.sibsutis.springbootbackend.repository.GymProgressRepository;
import com.sibsutis.springbootbackend.repository.GymRepository;
import com.sibsutis.springbootbackend.repository.StudentProfileRepository;
import com.sibsutis.springbootbackend.service.CodeforcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = {"http://localhost:3000/", "http://192.168.0.6:3000/"})
@RestController
@RequestMapping("api/v1/contests")
public class ContestController {
    @Autowired
    CodeforcesService codeforcesService;
    @Autowired
    StudentProfileRepository studentProfileRepository;
    @Autowired
    GymRepository gymRepository;

    @Autowired
    GymProgressRepository gymProgressRepository;

    @GetMapping()
    public List<Gym> getGymById(){
        return gymRepository.findAll();
    }

    @PostMapping("/{gymId}")
    public GymResult getGymResult(@PathVariable long gymId,@RequestBody String tag){
        List<StudentProfile> studentProfiles = studentProfileRepository.findAll();
        List<String> profilesHandles = studentProfiles.stream().map(StudentProfile::getHandle).toList();
        GymResult gymResult = codeforcesService.getGymResult(gymId,profilesHandles);
        Gym newGym = gymResult.getContest();

        newGym.setTag(tag);

        Set<GymProgress> gymProgresses = new HashSet<>();

        List<GymStatusInfo> gymStatusInfos = gymResult.getRows();
        for (GymStatusInfo gymSt: gymStatusInfos){
            StudentProfile studentProfile =
                    studentProfileRepository.findStudentProfileByHandle(gymSt.getParty().getMembers().get(0).getHandle());
            gymProgresses.add(new GymProgress(studentProfile,gymSt.getPoints()));
        }
        gymRepository.save(new Gym(newGym,gymProgresses));
        return gymResult;
    }
}
