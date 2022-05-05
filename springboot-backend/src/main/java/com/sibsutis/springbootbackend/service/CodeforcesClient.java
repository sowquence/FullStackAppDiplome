package com.sibsutis.springbootbackend.service;

import com.sibsutis.springbootbackend.dto.GymDto;
import com.sibsutis.springbootbackend.dto.StudentContestDto;
import com.sibsutis.springbootbackend.dto.StudentProfileDto;
import com.sibsutis.springbootbackend.dto.GymResult;
import com.sibsutis.springbootbackend.model.StudentContest;
import com.sibsutis.springbootbackend.model.StudentProfile;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Component
public class CodeforcesClient {
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String CODEFORCES_PROFILE_INFO_API_URL = "https://codeforces.com/api/user.info?lang=ru&handles=";
    private static final String CODEFORCES_CONTESTS_INFO_API_URL = "https://codeforces.com/api/user.rating?lang=ru&handle=";

    private static final String CODEFORCES_GYM_INFO_API_URL = "https://codeforces.com/api/contest.standings?lang=ru&handles=";

    private String getURIInfoContest(String handle, long contestId) {
        return CODEFORCES_GYM_INFO_API_URL
                + handle + "&contestId=" + contestId + "&showUnofficial=false";
    }

    private String getURIInfoGym(long gymId ,List<String> handles) {
        StringBuilder newUrl = new StringBuilder(CODEFORCES_GYM_INFO_API_URL);
        for(String handle: handles){
            newUrl.append(handle).append(";");
        }
        newUrl.append("&contestId=").append(gymId).append("&showUnofficial=true");
        return newUrl.toString();
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
    public List<StudentContest> getStudentContests(String handle) {
        String PROFILE_CONTESTS_API_URL = CODEFORCES_CONTESTS_INFO_API_URL + handle;

        StudentContestDto contestsDto = null;
        try {
            contestsDto = restTemplate.getForObject(new URI(PROFILE_CONTESTS_API_URL), StudentContestDto.class);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        assert contestsDto != null;
        return contestsDto.getResult();
    }

    public GymResult getGymResult(long gymId, List<String> handles) {

        String URL_GYM_RESULT = getURIInfoGym(gymId, handles);
        System.out.println(URL_GYM_RESULT);
        GymDto gymDto = null;
        try {
            gymDto = restTemplate.getForObject(new URI(URL_GYM_RESULT), GymDto.class);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        assert gymDto != null;
        return gymDto.getResult();
    }

    public int getTotalTasksSolvedByHandle(String handle) {
        String URL = "https://codeforces.com/profile/" + handle;
        try {
            //TODO не рабоатет надо думать...
            Document doc = Jsoup.connect(URL).get();
            Elements parse = doc.getElementsByClass("_UserActivityFrame_counterValue");
            if (parse.isEmpty()) return 0;
            String data = parse.get(0).ownText();

            int solved = 0;
            for (int i = 0; i < data.length(); i++) {
                char tmp = data.charAt(i);
                if (Character.isDigit(tmp)) {
                    solved += Integer.parseInt(String.valueOf(tmp));
                    solved *= 10;
                }
            }

            solved /= 10;
            System.out.println(solved);
            return solved;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return 0;
    }
}
