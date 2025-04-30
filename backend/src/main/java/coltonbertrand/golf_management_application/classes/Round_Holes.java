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
@Table(name = "round_holes")
public class Round_Holes implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="round_hole_id")
    private Integer id;

    @Column(name="hole_score")
    @NotNull
    @Min(1)
    private Integer holeScore;

    @Column(name="round_hole_number")
    @NotNull
    @Min(1)
    @Max(18)
    private Integer roundHoleNumber;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="round_id")
    @ToString.Exclude
    private Rounds round;

}
