package com.sibsutis.diploma.springbootbackend;

import com.sibsutis.diploma.springbootbackend.model.Contest;
import com.sibsutis.diploma.springbootbackend.model.Student;
import com.sibsutis.diploma.springbootbackend.model.StudentProfile;
import com.sibsutis.diploma.springbootbackend.repository.ContestRepository;
import com.sibsutis.diploma.springbootbackend.repository.StudentProfileRepository;
import com.sibsutis.diploma.springbootbackend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class SpringbootBackendApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootBackendApplication.class, args);
    }

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    StudentProfileRepository studentProfileRepository;

    @Autowired
    ContestRepository contestRepository;

    @Override
    public void run(String... args) throws Exception {

//        Student object
//        Student student = new Student();
//        student.setFirstName("Kirill");
//        student.setLastName("Kamelyazev");
//        student.setGroupId("IP-813");
//        student.setHandle("Somellin");
//        student.setEmailID("kiry.kkv@ya.ru");
//
//        //Profile Object
//        StudentProfile profile = new StudentProfile();
//        profile.setHandle("Somellin");
//        profile.setRank("specialist");
//        profile.setRating(1403);
//        profile.setMaxRating(1840);
//        profile.setMaxRank("expert");

//        Contest contest1 = new Contest();
//        contest1.setContestId(1311);
//        contest1.setContestName("Codeforces Round #624 (Div. 3)");
//        contest1.setHandle("Somellin");
//        contest1.setOldRating(0);
//        contest1.setNewRating(1368);
//
//        Contest contest2 = new Contest();
//        contest2.setContestId(1316);
//        contest2.setContestName("CodeCraft-20 (Div. 2)");
//        contest2.setHandle("Somellin");
//        contest2.setOldRating(1368);
//        contest2.setNewRating(1263);

//        student.setProfile(profile);
//        profile.setStudent(student);

//        profile.getContests().add(contest1);
//        profile.getContests().add(contest2);

//        studentRepository.save(student);
//        studentProfileRepository.save(profile);

//        List<StudentProfile> list = this.studentProfileRepository.findAll();
//        System.out.println(list.get(0));


    }
}
