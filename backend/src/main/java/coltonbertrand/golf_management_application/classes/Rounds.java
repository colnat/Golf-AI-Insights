package coltonbertrand.golf_management_application.classes;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name="user_rounds")
public class Rounds implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="round_id")
    private Integer id;

    @Column(name = "fairways_hit")
    @NotNull
    private Integer fairwaysHit;

    @Column(name = "three_putts")
    @NotNull
    private Integer threePutts;

    @Column(name="slices_or_draws")
    @NotNull
    private Integer slicesOrDraws;

    @Column(name="round_score")
    private Integer roundScore;

    @Column(name="date_played")
    @NotNull
    private LocalDate datePlayed;

    @Column(name = "round_length")
    private Integer roundLength;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private Users user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id")
    @ToString.Exclude
    private Courses course;

    @OneToMany(mappedBy = "round",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("roundHoleNumber ASC")
    @ToString.Exclude
    private List<Round_Holes> roundHolesList;

}
