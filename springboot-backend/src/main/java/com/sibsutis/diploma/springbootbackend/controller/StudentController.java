package com.sibsutis.diploma.springbootbackend.controller;

import com.sibsutis.diploma.springbootbackend.exception.ResourceNotFoundException;
import com.sibsutis.diploma.springbootbackend.model.Student;
import com.sibsutis.diploma.springbootbackend.repository.StudentRepository;
import com.sibsutis.diploma.springbootbackend.repository.UserRepository;
import com.sibsutis.diploma.springbootbackend.service.CodeforcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:3000/"})
@RestController
@RequestMapping("api/v1/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private CodeforcesService codeforcesService;

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
            case "handle":
                sortedList.sort(Comparator.comparing(Student::getHandle));
                break;
            case "emailID":
                sortedList.sort(Comparator.comparing(Student::getEmailID));
                break;
        }
        return sortedList;
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) throws URISyntaxException {
        return studentRepository.save(student);
    }

    @GetMapping("{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id " + id));
        return ResponseEntity.ok(student);
    }

    @PutMapping("{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable long id, @RequestBody Student studentDetails) {
        Student updateStudent = studentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Student not exist with id " + id));

        updateStudent.setFirstName(studentDetails.getFirstName());
        updateStudent.setLastName(studentDetails.getLastName());
        updateStudent.setGroupId(studentDetails.getGroupId());
        updateStudent.setHandle(studentDetails.getHandle());
        updateStudent.setEmailID(studentDetails.getEmailID());

        studentRepository.save(updateStudent);

        return ResponseEntity.ok(updateStudent);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Student not exist with id " + id)
                );

        studentRepository.delete(student);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("handles")
    public ResponseEntity<List<String>> getAllHandles(){
        List<Student> allStudents = studentRepository.findAll();
        List<String> handles = allStudents
                .stream()
                .map(Student::getHandle)
                .collect(Collectors.toList());
        return ResponseEntity.ok(handles);
    }


}
