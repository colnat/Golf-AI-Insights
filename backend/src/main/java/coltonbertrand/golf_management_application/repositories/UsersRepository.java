package coltonbertrand.golf_management_application.repositories;

import coltonbertrand.golf_management_application.classes.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users,Integer> {
    Optional<Users> findByEmail(String email);

}
