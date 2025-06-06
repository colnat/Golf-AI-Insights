package coltonbertrand.golf_management_application.repositories;

import coltonbertrand.golf_management_application.classes.Courses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursesRepository extends JpaRepository<Courses,Integer> {
    List<Courses> findByUserId(Integer userId);

}
