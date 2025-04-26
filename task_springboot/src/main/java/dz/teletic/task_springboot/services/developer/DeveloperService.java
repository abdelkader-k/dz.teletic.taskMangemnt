package dz.teletic.task_springboot.services.developer;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import dz.teletic.task_springboot.dto.TaskDTO;
import dz.teletic.task_springboot.entities.Task;
import dz.teletic.task_springboot.entities.User;
import dz.teletic.task_springboot.repo.TaskRepository;
import dz.teletic.task_springboot.utils.JwtUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeveloperService {
    
    private final TaskRepository taskRepository;
    private final JwtUtils jwtUtil;

    public List<TaskDTO> getTasksByUserId() {
        User user = jwtUtil.getLoggedInUser();
        if (user != null) {
            return taskRepository.findAllByUserId(user.getId())
                .stream()
                .sorted(Comparator.comparing(Task::getDueDate).reversed())
                .map(Task::getTaskDTO)
                .collect(Collectors.toList());
        }
        throw new EntityNotFoundException("User not found");
    }
}
