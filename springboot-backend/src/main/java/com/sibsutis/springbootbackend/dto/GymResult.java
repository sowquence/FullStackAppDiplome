package com.sibsutis.springbootbackend.dto;

import com.sibsutis.springbootbackend.model.Gym;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GymResult {
    private Gym contest;
    private List<GymStatusInfo> rows;
}
