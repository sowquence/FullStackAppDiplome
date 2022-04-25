package com.sibsutis.diploma.springbootbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sibsutis.diploma.springbootbackend.model.gymModel.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GymDto {
    private String status;
    private Result result;
}

