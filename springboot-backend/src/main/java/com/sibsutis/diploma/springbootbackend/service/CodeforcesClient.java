package com.sibsutis.diploma.springbootbackend.service;

import com.sibsutis.diploma.springbootbackend.model.Profile;
import com.sibsutis.diploma.springbootbackend.model.ProfileDto;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Component
public class CodeforcesClient {

    private RestTemplate restTemplate = new RestTemplate();
    private static final String CODEFORCES_USER_INFO_API_URL = "https://codeforces.com/api/user.info?handles=";

    public List<Profile> getUsers(List<String> handles) throws URISyntaxException {

        StringBuilder S = new StringBuilder(CODEFORCES_USER_INFO_API_URL);

        System.out.println(handles);
        for (String h : handles ) {
            S.append(";");
            S.append(h);
        }
        String NEW_URL = S.toString();

        ProfileDto response = restTemplate.getForObject(new URI(NEW_URL), ProfileDto.class);
        assert response != null;
        return response.getResult();
    }
}
