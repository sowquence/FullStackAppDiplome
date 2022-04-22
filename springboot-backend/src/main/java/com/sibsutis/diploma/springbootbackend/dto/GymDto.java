package com.sibsutis.diploma.springbootbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sibsutis.diploma.springbootbackend.model.Gym;
import com.sibsutis.diploma.springbootbackend.model.Problem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GymDto {
    private String status;
    private Result result;

    @Getter
    @Setter
    public static class Result{
        private Gym contest;
        private List<Problem> problems;
        private List<Row> rows;

        @Getter
        @Setter
        private static class Row{
            private int points;
            private List<ProblemResults> problemResults;

            @Getter
            @Setter
            private static class ProblemResults{
                private int points;
            }
        }
    }
}

