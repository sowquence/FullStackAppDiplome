package com.sibsutis.diploma.springbootbackend.service;

import com.sibsutis.diploma.springbootbackend.model.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URISyntaxException;
import java.util.List;

@Service
public class CodeforcesService {

    @Autowired
    private CodeforcesClient codeforcesClient;

    public List<Profile> findAllUsers(List<String> handles) throws URISyntaxException {
        return codeforcesClient.getUsers(handles);
    }

}
