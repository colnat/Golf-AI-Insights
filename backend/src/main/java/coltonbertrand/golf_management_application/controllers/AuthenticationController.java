package coltonbertrand.golf_management_application.controllers;

import coltonbertrand.golf_management_application.DTOs.LoginResponse;
import coltonbertrand.golf_management_application.DTOs.LoginUserDTO;
import coltonbertrand.golf_management_application.DTOs.RegisterUserDTO;
import coltonbertrand.golf_management_application.classes.Users;
import coltonbertrand.golf_management_application.services.AuthenticationService;
import coltonbertrand.golf_management_application.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<Users> register(@RequestBody RegisterUserDTO registerUserDto) {
        Users registeredUser = authenticationService.register(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginUserDTO request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }
}
