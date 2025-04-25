package dz.teletic.task_springboot.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dz.teletic.task_springboot.entities.User;
import dz.teletic.task_springboot.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
 
    Optional<User> findFirstByEmail(String username);

    Optional<User> findByUserRole(UserRole userRole);
    
}
