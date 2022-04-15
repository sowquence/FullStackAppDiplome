package com.sibsutis.diploma.springbootbackend;

import com.sibsutis.diploma.springbootbackend.repository.StudentProfileRepository;
import com.sibsutis.diploma.springbootbackend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootBackendApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootBackendApplication.class, args);
    }

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    StudentProfileRepository studentProfileRepository;

    @Override
    public void run(String... args) throws Exception {

//        //Student object
//        Student student = new Student();
//        student.setFirstName("Kirill");
//        student.setLastName("Kamelyazev");
//        student.setGroupId("IP-813");
//        student.setHandle("Somellin");
//        student.setEmailID("kiry.kkv@ya.ru");
//
//        //Profile Object
//        Profile profile = new Profile();
//        profile.setHandle("Somellin");
//        profile.setRank("specialist");
//        profile.setRating(1403);
//        profile.setMaxRating(1840);
//        profile.setMaxRank("expert");
//
//        student.setProfile(profile);
//        profile.setStudent(student);
//
//        studentRepository.save(student);

    }
}
