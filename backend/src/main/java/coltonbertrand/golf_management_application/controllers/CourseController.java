package coltonbertrand.golf_management_application.controllers;

import coltonbertrand.golf_management_application.classes.Courses;
import coltonbertrand.golf_management_application.classes.Users;
import coltonbertrand.golf_management_application.services.CoursesService;
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
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CoursesService coursesService;

    @PostMapping("/saveCourse")
    public ResponseEntity<Courses> addCourse(@Valid @RequestBody Courses course) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        System.out.println(course);
        Courses savedCourse = coursesService.addCourse(course, currentUser.getId());
        return ResponseEntity.ok().body(savedCourse);
    }

    @PutMapping("/update-course/{courseId}")
    public ResponseEntity<Courses> updateCourse(@Valid @RequestBody Courses course){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        if(!Objects.equals(currentUser.getId(), course.getUser().getId())){
            return ResponseEntity.badRequest().build();
        }
        Courses updatedCourse = coursesService.addCourse(course, currentUser.getId());
        return ResponseEntity.ok().body(updatedCourse);
    }

    @GetMapping("/get-course-by-id/{courseId}")
    public ResponseEntity<Optional<Courses>> getCourseById(@PathVariable Integer courseId){
        Optional<Courses> course = coursesService.getCourseById(courseId);
        System.out.println(course);
        return ResponseEntity.ok().body(course);
    }

    @GetMapping("/getCourses")
    public ResponseEntity<List<Courses>> getCourses() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        List<Courses> getUserCourses = coursesService.getCourses(currentUser.getId());
        return ResponseEntity.ok().body(getUserCourses);
    }

    @DeleteMapping("/delete-course/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable Integer courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        System.out.println(courseId);
        coursesService.deleteCourse(courseId, currentUser.getId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/favourite-course")
    public ResponseEntity<Optional<Courses>> favouriteCourse() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        Optional<Courses> getFavouriteCourse = coursesService.findFavouriteCourse(currentUser.getId());
        return ResponseEntity.ok().body(getFavouriteCourse);
    }

    @GetMapping("/most-played-course")
    public ResponseEntity<Optional<Courses>> mostPlayedCourse() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users currentUser = (Users) authentication.getPrincipal();
        Optional<Courses> mostPlayed = coursesService.mostPlayedCourse(currentUser.getId());
        return ResponseEntity.ok().body(mostPlayed);
    }

}
