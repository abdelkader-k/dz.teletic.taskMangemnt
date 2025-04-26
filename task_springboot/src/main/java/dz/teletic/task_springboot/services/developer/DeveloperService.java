package dz.teletic.task_springboot.services.developer;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import dz.teletic.task_springboot.dto.TaskDTO;
import dz.teletic.task_springboot.entities.Task;
import dz.teletic.task_springboot.entities.TaskStatus;
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

    public TaskDTO updateTask(Long id, String status) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTaskStatus(mapStringToTaskStatus(status));
            return taskRepository.save(existingTask).getTaskDTO();
        }
        throw new EntityNotFoundException("Task not found with id: " + id);
    }

    private TaskStatus mapStringToTaskStatus(String status) {
        return switch (status) {
            case "PENDING" -> TaskStatus.PENDING;
            case "INPROGRESS" -> TaskStatus.INPROGRESS;
            case "COMPLETED" -> TaskStatus.COMPLETED;
            case "DEFERRED" -> TaskStatus.DEFERRED;
            default -> TaskStatus.CANCELLED;
        };
    }
}
