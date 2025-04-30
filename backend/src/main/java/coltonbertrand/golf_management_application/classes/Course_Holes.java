package coltonbertrand.golf_management_application.classes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;

@Data
@Entity
@Table(name = "course_holes")
public class Course_Holes implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="course_hole_id")
    private Integer id;

    @Column(name="course_hole_par")
    @NotNull
    @Min(3)
    @Max(5)
    private Integer courseHolePar;

    @Column(name="course_hole_length")
    private Integer courseHoleLength;

    @Column(name="course_hole_number")
    @Min(1)
    @Max(18)
    @NotNull
    private Integer courseHoleNumber;

    //Added to prevent loop when sending JSON
    @JsonIgnore
    @JoinColumn(name="course_id")
    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private Courses course;
}
