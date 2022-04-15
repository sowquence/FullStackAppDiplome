package com.sibsutis.diploma.springbootbackend.controller;

import com.sibsutis.diploma.springbootbackend.exception.ResourceNotFoundException;
import com.sibsutis.diploma.springbootbackend.model.Student;
import com.sibsutis.diploma.springbootbackend.model.StudentProfile;
import com.sibsutis.diploma.springbootbackend.repository.StudentProfileRepository;
import com.sibsutis.diploma.springbootbackend.repository.StudentRepository;
import com.sibsutis.diploma.springbootbackend.service.CodeforcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000/"})
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
    public Student addNewStudent(@RequestBody Student student){
        StudentProfile studentProfile = codeforcesService.getStudentProfile(student.getHandle());
        student.setProfile(studentProfile);
        studentProfile.setStudent(student);
        studentRepository.save(student);
        return student;
    }

    // view all students
    @GetMapping() //GET : http://localhost:8080/api/v1/students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    //get student by id
    @GetMapping("{id}") //GET : http://localhost:8080/api/v1/students/{id}
    public ResponseEntity<Student> getStudentById(@PathVariable long id){
        Student student = studentRepository.findById(id).orElseThrow(
                ()->new ResourceNotFoundException("Student not exist with id " + id));
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
