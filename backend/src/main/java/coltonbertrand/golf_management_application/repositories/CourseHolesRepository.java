package coltonbertrand.golf_management_application.repositories;

import coltonbertrand.golf_management_application.classes.Course_Holes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CourseHolesRepository extends JpaRepository<Course_Holes,Integer> {

}
