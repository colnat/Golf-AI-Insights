package coltonbertrand.golf_management_application.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginUserDTO {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min=5)
    private String password;
}
