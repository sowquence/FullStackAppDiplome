package com.sibsutis.diploma.springbootbackend;

import com.sibsutis.diploma.springbootbackend.model.Student;
import com.sibsutis.diploma.springbootbackend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootBackendApplication
//        implements CommandLineRunner
{

    public static void main(String[] args) {
        SpringApplication.run(SpringbootBackendApplication.class, args);
    }

//    @Autowired
//    private StudentRepository studentRepository;
//
//    @Override
//    public void run(String... args) throws Exception {
//        Student student = new Student();
//        student.setFirstName("Kirill");
//        student.setLastName("Kamelyazev");
//        student.setGroupId("IP-813");
//        student.setNickname("Somellin");
//        student.setEmailID("kiry.kkv@ya.ru");
//
//        studentRepository.save(student);
//
//        Student student1 = new Student();
//        student1.setFirstName("John");
//        student1.setLastName("Cena");
//        student1.setGroupId("IP-813");
//        student1.setNickname("JCen");
//        student1.setEmailID("cena@ya.ru");
//
//        studentRepository.save(student1);
//    }

}
