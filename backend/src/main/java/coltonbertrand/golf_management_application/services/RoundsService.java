package coltonbertrand.golf_management_application.services;

import coltonbertrand.golf_management_application.classes.*;
import coltonbertrand.golf_management_application.repositories.CoursesRepository;
import coltonbertrand.golf_management_application.repositories.RoundsRepository;
import coltonbertrand.golf_management_application.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class RoundsService {

    @Autowired
    private RoundsRepository roundsRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private CoursesRepository coursesRepository;

    //add round
    public Rounds addRound(Rounds round, Integer courseId, Integer userId) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Courses course = coursesRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course was not found" + courseId));

        List<Round_Holes> holes = round.getRoundHolesList(); //get holes played in round
        round.setRoundLength(holes.size());

        round.setUser(user);
        round.setCourse(course);
        int round_score = 0;
        for (Round_Holes hole : holes) {

            round_score += hole.getHoleScore();
            hole.setRound(round);
        }
        round.setRoundScore(round_score);
        return roundsRepository.save(round);
    }

    //Get the users rounds by selecting most recent first
    public List<Rounds> getRoundsByUser(Integer userId) {
        return roundsRepository.findByUserIdOrderByDatePlayedDesc(userId);
    }

    public Optional<Rounds> getRoundById(Integer roundId){
        return roundsRepository.findById(roundId);
    }

    public void deleteRound(Integer roundId,Integer userId) {
        Rounds round = roundsRepository.findById(roundId)
                        .orElseThrow(() -> new IllegalArgumentException("Round not found"));

        if(!Objects.equals(userId,round.getUser().getId())){
            throw new IllegalArgumentException("User does not own round");
        }
        roundsRepository.deleteById(roundId);
    }

    //Find the minimum value the user went over par for 18 hole round
    //Returns null if nothing is found
    public Optional<Rounds> findBest18HoleRound(Integer userId) {
        List<Rounds> findUsersRounds = roundsRepository.findByUserIdAndRoundLength(userId, 18);
        return findUsersRounds.stream().min(Comparator.comparing(round -> round.getRoundScore() - round.getCourse().getEighteenHolePar()));
    }

    //Returns null if nothing is found
    public Optional<Rounds> findBest9HoleRound(Integer userId) {
        List<Rounds> findUsersRounds = roundsRepository.findByUserIdAndRoundLength(userId, 9);
        return findUsersRounds.stream().min(Comparator.comparing(round -> round.getRoundScore() - round.getCourse().getNineHolePar()));
    }

    //only calculating 18 hole handicap because it's the right way. Using the 20 most recent rounds
    //and averaging the best of 8.
    public Integer handicap(Integer userId) {
        List<Rounds> mostRecentRounds = roundsRepository.findTop20ByUserIdAndRoundLengthOrderByDatePlayedDesc(userId, 18);
        if(mostRecentRounds.size() < 20){
            return 101;
        }
        List<Integer> scores = new ArrayList<>();
        for (Rounds mostRecentRound : mostRecentRounds) {
            int score = mostRecentRound.getRoundScore() - mostRecentRound.getCourse().getEighteenHolePar();
            scores.add(score);
        }
        Collections.sort(scores);
        int sum = 0;
        for (int i = 0; i < 8; i++) {
            sum += scores.get(i);
        }
        return sum / 8;
    }


}

