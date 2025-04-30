package coltonbertrand.golf_management_application.repositories;

import coltonbertrand.golf_management_application.classes.Round_Holes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoundHolesRepository extends JpaRepository<Round_Holes,Integer> {

}
