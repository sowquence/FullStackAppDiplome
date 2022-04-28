package com.sibsutis.springbootbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sibsutis.springbootbackend.model.Contest;
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
public class ContestRatingDto {
    private String status;
    private List<Contest> result;
}
