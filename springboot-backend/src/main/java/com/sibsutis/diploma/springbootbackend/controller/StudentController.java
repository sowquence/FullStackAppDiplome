package com.sibsutis.diploma.springbootbackend.controller;

import com.sibsutis.diploma.springbootbackend.exception.ResourceNotFoundException;
import com.sibsutis.diploma.springbootbackend.model.Student;
import com.sibsutis.diploma.springbootbackend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000/"})
@RestController
@RequestMapping("api/v1/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("all/{property}")
    public List<Student> getAllStudents(@PathVariable String property) {
        List<Student> sortedList = studentRepository.findAll();

        switch (property) {
            case "firstName":
                sortedList.sort(Comparator.comparing(Student::getFirstName));
                break;
            case "lastName":
                sortedList.sort(Comparator.comparing(Student::getLastName));
                break;
            case "groupId":
                sortedList.sort(Comparator.comparing(Student::getGroupId));
                break;
            case "nickname":
                sortedList.sort(Comparator.comparing(Student::getNickname));
                break;
            case "emailID":
                sortedList.sort(Comparator.comparing(Student::getEmailID));
                break;
        }
        return sortedList;
    }

    //create rest api
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    //build get student
    @GetMapping("{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id " + id));
        return ResponseEntity.ok(student);
    }

    //update rest api
    @PutMapping("{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable long id, @RequestBody Student studentDetails) {
        Student updateStudent = studentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Student not exist with id " + id));

        updateStudent.setFirstName(studentDetails.getFirstName());
        updateStudent.setLastName(studentDetails.getLastName());
        updateStudent.setGroupId(studentDetails.getGroupId());
        updateStudent.setNickname(studentDetails.getNickname());
        updateStudent.setEmailID(studentDetails.getEmailID());

        studentRepository.save(updateStudent);

        return ResponseEntity.ok(updateStudent);
    }

    // build delete student rest api
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Student not exist with id " + id)
                );

        studentRepository.delete(student);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @GetMapping("sort/{property}")
//    public List<Student> getSortedStudentsBy(@PathVariable String property) {
//        List<Student> sortedList = studentRepository.findAll();
//
//        switch (property) {
//            case "firstName":
//                sortedList.sort(Comparator.comparing(Student::getFirstName));
//                break;
//            case "lastName":
//                sortedList.sort(Comparator.comparing(Student::getLastName));
//                break;
//            case "groupId":
//                sortedList.sort(Comparator.comparing(Student::getGroupId));
//                break;
//            case "nickname":
//                sortedList.sort(Comparator.comparing(Student::getNickname));
//                break;
//            case "emailID":
//                sortedList.sort(Comparator.comparing(Student::getEmailID));
//                break;
//        }
//
//        return sortedList;
//    }
}
