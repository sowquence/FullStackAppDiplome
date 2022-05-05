package com.sibsutis.springbootbackend.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GymStatusInfo {
   private double points;
   private Party party;


   @Getter
   @Setter
   @NoArgsConstructor
   @AllArgsConstructor
   public static class Party{
      private List<Members> members;


      @Getter
      @Setter
      @NoArgsConstructor
      @AllArgsConstructor
      public static class Members{
         String handle;
      }
   }
}
