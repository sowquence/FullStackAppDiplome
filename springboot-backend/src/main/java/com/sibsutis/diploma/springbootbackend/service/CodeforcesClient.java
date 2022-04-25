package com.sibsutis.diploma.springbootbackend.service;

import com.sibsutis.diploma.springbootbackend.dto.ContestRatingDto;
import com.sibsutis.diploma.springbootbackend.dto.GymDto;
import com.sibsutis.diploma.springbootbackend.model.*;
import com.sibsutis.diploma.springbootbackend.dto.StudentProfileDto;
import com.sibsutis.diploma.springbootbackend.model.gymModel.Gym;
import com.sibsutis.diploma.springbootbackend.model.gymModel.Problem;
import com.sibsutis.diploma.springbootbackend.model.gymModel.Result;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CodeforcesClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String CODEFORCES_PROFILE_INFO_API_URL = "https://codeforces.com/api/user.info?lang=ru&handles=";
    private static final String CODEFORCES_CONTESTS_INFO_API_URL = "https://codeforces.com/api/user.rating?lang=ru&handle=";
    private static final String CODEFORCES_GYM_INFO_API_URL = "https://codeforces.com/api/contest.standings?lang=ru&showUnofficial=true&handles=";

    private String getURIInfoGym(String handle, long contestId) {
        return CODEFORCES_GYM_INFO_API_URL
                + handle + "&contestId=" + contestId;
    }

    //Получение профиля студента на Codeforces
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

    //Получение контестов студента на Codeforces
    public List<Contest> getStudentContests(String handle) {
        String PROFILE_CONTESTS_API_URL = CODEFORCES_CONTESTS_INFO_API_URL + handle;

        ContestRatingDto contestsDto = null;
        try {
            contestsDto = restTemplate.getForObject(new URI(PROFILE_CONTESTS_API_URL), ContestRatingDto.class);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        assert contestsDto != null;
        return contestsDto.getResult();
    }

    // Получение тренировки по id
    public Result getGym(long contestId) {
        String handle = "nottey";
        String URI = getURIInfoGym(handle, contestId);

        GymDto gymDto = null;
        try {
            gymDto = restTemplate.getForObject(new URI(URI), GymDto.class);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        assert gymDto != null;

        return gymDto.getResult();
    }

    // Получение списка решенных задач из тренировки по id тренировки и Хэндлу
    //

    public int getTotalTasksSolvedByHandle(String handle){
        String URL = "https://codeforces.com/profile/" + handle;
        try {
            Document doc = Jsoup.connect(URL).get();
            Elements parse = doc.getElementsByClass("_UserActivityFrame_counterValue");
            String data = parse.get(0).ownText();

            int solved = 0;
            for (int i = 0; i < data.length(); i++) {
                char tmp = data.charAt(i);
                if (Character.isDigit(tmp)){
                    solved += Integer.parseInt(String.valueOf(tmp));
                    solved*=10;
                }
            }

            solved/=10;
            System.out.println(solved);
            return solved;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return 0;
    }
}
