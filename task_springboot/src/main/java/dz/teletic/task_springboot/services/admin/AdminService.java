package dz.teletic.task_springboot.services.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import dz.teletic.task_springboot.dto.UserDto;
import dz.teletic.task_springboot.entities.User;
import dz.teletic.task_springboot.enums.UserRole;
import dz.teletic.task_springboot.repo.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    
    private final UserRepository userRepository;


    public List<UserDto> getUsers() {
        return userRepository.findAll()
            .stream()
            .filter(user -> user.getUserRole() == UserRole.DEVELOPER)
            .map(User::getUserDto)
            .collect(Collectors.toList());
    }
    
}
