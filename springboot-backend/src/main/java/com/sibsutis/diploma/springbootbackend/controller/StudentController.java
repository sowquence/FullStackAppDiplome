package com.sibsutis.diploma.springbootbackend.controller;

import com.sibsutis.diploma.springbootbackend.exception.ResourceNotFoundException;
import com.sibsutis.diploma.springbootbackend.model.Contest;
import com.sibsutis.diploma.springbootbackend.model.Student;
import com.sibsutis.diploma.springbootbackend.model.StudentProfile;
import com.sibsutis.diploma.springbootbackend.repository.StudentProfileRepository;
import com.sibsutis.diploma.springbootbackend.repository.StudentRepository;
import com.sibsutis.diploma.springbootbackend.service.CodeforcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000/", "http://192.168.0.6:3000/"})
@RestController
@RequestMapping("api/v1/students")
public class StudentController {

    @Autowired
    private CodeforcesService codeforcesService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    // add new student
    @PostMapping //POST : http://localhost:8080/api/v1/students :: JSON_BODY
    public ResponseEntity<Student> addNewStudent(@RequestBody Student student) {
        try {
            StudentProfile studentProfile = codeforcesService.getStudentProfile(student.getHandle());
            studentProfile.setTotalTasks(codeforcesService.getTotalTasksSolvedByHandle(student.getHandle()));

            List<Contest> contests = codeforcesService.getStudentContests(student.getHandle());
            studentProfile.setSolvedContests(contests.size());
            studentProfile.setContests(contests);

            student.setProfile(studentProfile);
            studentProfile.setStudent(student);
            studentRepository.save(student);
            return ResponseEntity.ok(student);
        } catch (HttpClientErrorException e){
            return ResponseEntity.notFound().build();
        }
    }

    // view all students
    @GetMapping("sort/{val}") //GET : http://localhost:8080/api/v1/students
    public List<Student> getAllStudents(@PathVariable String val) {
        List<Student> sortingStudents = studentRepository.findAll();
        int int_val = Integer.parseInt(val);
        if (int_val == 0)
            return sortingStudents;
        if (int_val == 1){
            sortingStudents.sort((a, b) -> a.getFirstName().compareToIgnoreCase(b.getFirstName()));
            return sortingStudents;
        }
        if (int_val == 2){
            sortingStudents.sort((a, b) -> a.getLastName().compareToIgnoreCase(b.getLastName()));
            return sortingStudents;
        }
        if (int_val == 3){
            sortingStudents.sort((a, b) -> a.getGroupId().compareToIgnoreCase(b.getGroupId()));
            return sortingStudents;
        }
        if (int_val == 4){
            sortingStudents.sort((a, b) -> a.getHandle().compareToIgnoreCase(b.getHandle()));
            return sortingStudents;
        }
        if (int_val == 5){
            sortingStudents.sort((a, b) -> a.getEmailID().compareToIgnoreCase(b.getEmailID()));
            return sortingStudents;
        }
        return sortingStudents;
    }

    //get student by id
    @GetMapping("{id}") //GET : http://localhost:8080/api/v1/students/{id}
    public ResponseEntity<Student> getStudentById(@PathVariable long id) {
        Student student = studentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Student not exist with id " + id));
        return ResponseEntity.ok(student);
    }

    //update student by id
    @PutMapping("{id}") //PUT : http://localhost:8080/api/v1/students/{id} :: JSON_BODY
    public ResponseEntity<Student> updateStudentById(@PathVariable long id, @RequestBody Student studentDetails) {
        Student updateStudent = studentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Student not exist with id " + id));

        StudentProfile updateProfile = studentProfileRepository.findById(updateStudent.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Profile not exist with id " + id));

        StudentProfile studentProfileDetails = codeforcesService.getStudentProfile(studentDetails.getHandle());

        updateStudent.setFirstName(studentDetails.getFirstName());
        updateStudent.setLastName(studentDetails.getLastName());
        updateStudent.setGroupId(studentDetails.getGroupId());
        updateStudent.setHandle(studentDetails.getHandle());
        updateStudent.setEmailID(studentDetails.getEmailID());

        updateProfile.setHandle(studentProfileDetails.getHandle());
        updateProfile.setRating(studentProfileDetails.getRating());
        updateProfile.setRank(studentProfileDetails.getRank());
        updateProfile.setMaxRating(studentProfileDetails.getMaxRating());
        updateProfile.setMaxRank(studentProfileDetails.getMaxRank());
        updateProfile.setSolvedContests(0);
        updateProfile.setTotalTasks(0);

        updateStudent.setProfile(updateProfile);
        updateProfile.setStudent(updateStudent);

        studentRepository.save(updateStudent);

        return ResponseEntity.ok(updateStudent);
    }

    // delete student by id
    @DeleteMapping("{id}") // DELETE : http://localhost:8080/api/v1/students/{id}
    public ResponseEntity<HttpStatus> deleteStudentById(@PathVariable long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id " + id));
        studentRepository.delete(student);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
