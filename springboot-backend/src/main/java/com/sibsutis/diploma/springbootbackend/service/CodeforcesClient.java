package com.sibsutis.diploma.springbootbackend.service;

import com.sibsutis.diploma.springbootbackend.model.StudentProfile;
import com.sibsutis.diploma.springbootbackend.model.StudentProfileDto;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

@Component
public class CodeforcesClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String CODEFORCES_PROFILE_INFO_API_URL = "https://codeforces.com/api/user.info?handles=";

    public StudentProfile getStudentProfile(String handle) {
        String PROFILE_INFO_API_URL = CODEFORCES_PROFILE_INFO_API_URL + handle + ";";

        StudentProfileDto studentProfileDto = null;
        try {
            studentProfileDto = restTemplate.getForObject(new URI(PROFILE_INFO_API_URL), StudentProfileDto.class);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        assert studentProfileDto != null;
        return studentProfileDto.getResult().get(0);
    }
}
