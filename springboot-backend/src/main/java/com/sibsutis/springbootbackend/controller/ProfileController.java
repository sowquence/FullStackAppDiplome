package com.sibsutis.springbootbackend.controller;

import com.sibsutis.springbootbackend.dto.GymResult;
import com.sibsutis.springbootbackend.dto.GymStatusInfo;
import com.sibsutis.springbootbackend.model.Gym;
import com.sibsutis.springbootbackend.model.GymProgress;
import com.sibsutis.springbootbackend.model.StudentContest;
import com.sibsutis.springbootbackend.model.StudentProfile;
import com.sibsutis.springbootbackend.repository.*;
import com.sibsutis.springbootbackend.service.CodeforcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000/", "http://192.168.0.6:3000/"})
@RestController
@RequestMapping("api/v1/profiles")
public class ProfileController {

    @Autowired
    StudentProfileRepository studentProfileRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    StudentContestRepository studentContestRepository;

    @Autowired
    GymProgressRepository gymProgressRepository;

    @Autowired
    CodeforcesService codeforcesService;

    @Autowired
    GymRepository gymRepository;

    @GetMapping()
    public List<StudentProfile> getAllProfiles() {
        return studentProfileRepository.findAll();
    }

    @GetMapping("/progress")
    public List<GymProgress> getGymProgresses() {
        return gymProgressRepository.findAll();
    }

    @PutMapping("/update")
    public ResponseEntity<List<StudentProfile>> updateAllStudentsProfile() {
        studentContestRepository.deleteAll();
        List<StudentProfile> studentProfiles = null;
        try {
            List<StudentProfile> updateProfiles = studentProfileRepository.findAll();
            List<String> handles =
                    codeforcesService.getStudentProfiles(updateProfiles
                                    .stream()
                                    .map(StudentProfile::getHandle)
                                    .toList()
                            )
                            .stream()
                            .map(StudentProfile::getHandle)
                            .toList();
            System.out.println(handles);
            studentProfiles = codeforcesService.getStudentProfiles(handles);
            int i = 0;
            for (StudentProfile updateProfile : updateProfiles) {

                List<StudentContest> contests = codeforcesService.getStudentContests(updateProfile.getHandle());
                updateProfile.setStudentContests(contests);
                updateProfile.setSolvedContests(contests.size());

                updateProfile.setMonthTasks(codeforcesService.getMonthTasksSolvedByHandle(updateProfile.getHandle()));

                updateProfile.setRank(studentProfiles.get(i).getRank());
                updateProfile.setRating(studentProfiles.get(i).getRating());
                updateProfile.setMaxRank(studentProfiles.get(i).getMaxRank());
                updateProfile.setMaxRating(studentProfiles.get(i).getMaxRating());

                studentProfileRepository.save(updateProfile);

                List<Gym> gyms = gymRepository.findAll();
                List<String> handle = new ArrayList<>();
                handle.add(updateProfile.getHandle());
                for (Gym gym : gyms) {
                    GymResult gymResult = codeforcesService.getGymResult(gym.getId(), handle);
                    Set<GymProgress> gymProgresses = new HashSet<>();
                    List<GymStatusInfo> gymStatusInfos = gymResult.getRows();

                    for (GymStatusInfo gymSt : gymStatusInfos) {
                        gymProgresses.add(new GymProgress(updateProfile, gymSt.getPoints()));
                    }
                    for (GymProgress gp : gymProgresses) {
                        gp.setGym(gym);
                        gp.setGyId(gym.getId());
                        gym.getGymProgresses().add(gp);
                    }
                    gymRepository.save(gym);
                }
                i++;
                Thread.sleep(15 * 1000);
            }
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
        }
        return ResponseEntity.ok(studentProfiles);
    }
}
