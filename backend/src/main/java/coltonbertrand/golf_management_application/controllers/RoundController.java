package coltonbertrand.golf_management_application.controllers;

import coltonbertrand.golf_management_application.classes.Rounds;
import coltonbertrand.golf_management_application.classes.Users;
import coltonbertrand.golf_management_application.services.RoundsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


@RestController
@RequestMapping("/rounds")
public class RoundController {

    @Autowired
    private RoundsService roundsService;


    @PostMapping("/saveRound/{courseId}")
    public ResponseEntity<Rounds> addRound(@Valid @RequestBody Rounds round, @PathVariable Integer courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        Rounds savedRound = roundsService.addRound(round, courseId, currentUser.getId());
        return ResponseEntity.ok().body(savedRound);
    }

    @PutMapping("/update-round/{roundId}/{courseId}")
    public ResponseEntity<Rounds> updateRound(@Valid @RequestBody Rounds round, @PathVariable Integer courseId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        if(!Objects.equals(currentUser.getId(), round.getUser().getId())){
            return ResponseEntity.badRequest().build();
        }
        Rounds updateRound = roundsService.addRound(round, courseId, currentUser.getId());
        return ResponseEntity.ok().body(updateRound);
    }

    @GetMapping("/get-round-by-id/{roundId}")
    public ResponseEntity<Optional<Rounds>> getRoundById(@PathVariable Integer roundId){
        Optional<Rounds> getRound = roundsService.getRoundById(roundId);
        return ResponseEntity.ok().body(getRound);
    }

    @GetMapping("/getRounds")
    public ResponseEntity<List<Rounds>> getRounds() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        List<Rounds> userRounds = roundsService.getRoundsByUser(currentUser.getId());
        return ResponseEntity.ok().body(userRounds);
    }

    @DeleteMapping("/deleteRound/{roundId}")
    public ResponseEntity<?> deleteRound(@PathVariable Integer roundId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        roundsService.deleteRound(roundId, currentUser.getId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/best-18-hole")
    public ResponseEntity<Optional<Rounds>> findBest18HoleRound() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        Optional<Rounds> best18HoleRound = roundsService.findBest18HoleRound(currentUser.getId());
        return ResponseEntity.ok().body(best18HoleRound);
    }

    @GetMapping("/best-9-hole")
    public ResponseEntity<Optional<Rounds>> findBest9HoleRound() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        Optional<Rounds> best9HoleRound = roundsService.findBest9HoleRound(currentUser.getId());
        return ResponseEntity.ok().body(best9HoleRound);
    }

    @GetMapping("/handicap")
    public ResponseEntity<Integer> getHandicap() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        Integer userHandicap = roundsService.handicap(currentUser.getId());
        return ResponseEntity.ok().body(userHandicap);
    }


}
