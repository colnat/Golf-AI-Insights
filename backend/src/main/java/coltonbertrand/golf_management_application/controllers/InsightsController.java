package coltonbertrand.golf_management_application.controllers;

import coltonbertrand.golf_management_application.classes.Rounds;
import coltonbertrand.golf_management_application.classes.Users;
import coltonbertrand.golf_management_application.repositories.RoundsRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/get-insights")
public class InsightsController {

    @Autowired
    private RoundsRepository roundsRepository;

    private final ChatClient chatClient;

    public InsightsController(ChatClient.Builder builder){

        this.chatClient = builder
                .defaultSystem("Analyze the following stats from a users most recent golf rounds. Pay close attention to the stats" +
                        " If you notice a user is consistently getting a high amount of three putts (3 for 9-hole, 6 for 18-hole)" +
                        " Then suggest a drill to fix that and explain the drill." +
                        " If a user is consistently getting a high amount of slices (3 for 9-hole, 6 for 18-hole rounds). " +
                        " Give advice on how to fix a slice when driving " +
                        " When a user is doing a good job on hitting fairways say congrats, also if you notice improvement. " +
                        " Offer other golf tips and general advice too" +
                        " Tell the user how much they can lower their score if they improve in these areas " +
                        " Recommend courses near the user if they have a location, if not don't mention it. Try not to mention private " +
                        "courses" +
                        " Provide some motivation to the user" +
                        " Each round is delimited by ```"+
                        " please keep the response below 110 words.")
                .build();
    }
    @GetMapping("/insights")
    public ResponseEntity<String> insights( @RequestParam(required = false) String userLocation){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Users currentUser = (Users) authentication.getPrincipal();
            List<Rounds> topFiveRounds = roundsRepository.findTop5ByUserIdOrderByDatePlayedDesc(currentUser.getId());
            if (topFiveRounds.isEmpty()) {
                return ResponseEntity.ok().body("Try adding a round to see how you can improve your game");
            }
            StringBuilder prompt = new StringBuilder();
            for(Rounds round : topFiveRounds) {
                prompt.append(("```Users Name: %s, User Location: %s, Date Played: %s, Round Length: %d, Three Putts: %d, " +
                        "Slices or Draws: %d, Fairways Hit: %d```")
                        .formatted(currentUser.getFirstName(), userLocation, round.getDatePlayed(),round.getRoundLength(),
                                round.getThreePutts(), round.getSlicesOrDraws(), round.getFairwaysHit()));
            }
            String response = chatClient.prompt()
                    .user(prompt.toString())
                    .call()
                    .content();
            return ResponseEntity.ok().body(response);
    }
}
