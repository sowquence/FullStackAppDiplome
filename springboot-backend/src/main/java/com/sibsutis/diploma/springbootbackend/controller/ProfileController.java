package com.sibsutis.diploma.springbootbackend.controller;

import com.sibsutis.diploma.springbootbackend.exception.ResourceNotFoundException;
import com.sibsutis.diploma.springbootbackend.model.Contest;
import com.sibsutis.diploma.springbootbackend.model.Student;
import com.sibsutis.diploma.springbootbackend.model.StudentProfile;
import com.sibsutis.diploma.springbootbackend.repository.ContestRepository;
import com.sibsutis.diploma.springbootbackend.repository.StudentProfileRepository;
import com.sibsutis.diploma.springbootbackend.service.CodeforcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000/","http://192.168.0.6:3000/"})
@RestController
@RequestMapping("api/v1/profiles")
public class ProfileController {

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private CodeforcesService codeforcesService;

    @Autowired
    private ContestRepository contestRepository;

    // Получить все профили
    @GetMapping
    public List<StudentProfile> getAllProfiles(){
        return studentProfileRepository.findAll();
    }

    //Получить профиль по хендлу
    @GetMapping("{handle}")
    public StudentProfile getStudentProfile(@PathVariable String handle) {
        return codeforcesService.getStudentProfile(handle);
    }

    //Обновление данных профиля студента
    @PutMapping("update/{id}") // http://localhost:8080/api/v1/profiles/update/1
    public ResponseEntity<StudentProfile> updateProfileById(@PathVariable long id){

        //TODO обновление данных всего профиля
        // :1 выбрать студента по id
        // :2 найти профиль найти контесты и тренировки
        // :3 обновить базу

        StudentProfile updateProfile = studentProfileRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Profile not exist with id " + id));
        List<Contest> newContest = codeforcesService.getStudentContests(updateProfile.getHandle());
        List<Contest> updateContests = updateProfile.getContests();

        if (newContest.size() > updateContests.size()){
            for (int i = updateContests.size(); i < newContest.size(); i++) {
                updateContests.add(newContest.get(i));
            }
        }

        updateProfile.setSolvedContests(newContest.size());
        updateProfile.setContests(updateContests);
        studentProfileRepository.save(updateProfile);

        return ResponseEntity.ok(updateProfile);
    }
}
