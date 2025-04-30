package coltonbertrand.golf_management_application.services;

import coltonbertrand.golf_management_application.DTOs.LoginResponse;
import coltonbertrand.golf_management_application.DTOs.LoginUserDTO;
import coltonbertrand.golf_management_application.DTOs.RegisterUserDTO;
import coltonbertrand.golf_management_application.classes.Users;
import coltonbertrand.golf_management_application.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public Users register(RegisterUserDTO input){
        var user = Users.builder()
                .firstName(input.getFirstName())
                .lastName(input.getLastName())
                .email(input.getEmail())
                .password(passwordEncoder.encode(input.getPassword()))
                .build();

        return usersRepository.save(user);
    }

    public LoginResponse login(LoginUserDTO input){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        var user = usersRepository.findByEmail(input.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        System.out.println(jwtToken);
        return LoginResponse.builder()
                .token(jwtToken)
                .build();
                

    }


}
