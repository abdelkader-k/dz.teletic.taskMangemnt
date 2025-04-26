package dz.teletic.task_springboot.services.admin;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import dz.teletic.task_springboot.dto.TaskDTO;
import dz.teletic.task_springboot.dto.UserDto;
import dz.teletic.task_springboot.entities.Task;
import dz.teletic.task_springboot.entities.TaskStatus;
import dz.teletic.task_springboot.entities.User;
import dz.teletic.task_springboot.enums.UserRole;
import dz.teletic.task_springboot.repo.TaskRepository;
import dz.teletic.task_springboot.repo.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    


    public List<UserDto> getUsers() {
        return userRepository.findAll()
            .stream()
            .filter(user -> user.getUserRole() == UserRole.DEVELOPER)
            .map(User::getUserDto)
            .collect(Collectors.toList());
    }
    
    public TaskDTO createTask(TaskDTO taskDTO) {
        Optional<User> optionalUser = userRepository.findById(taskDTO.getDeveloperId());
        if (optionalUser.isPresent()) {
            Task task = new Task();
            task.setTitle(taskDTO.getTitle());
            task.setDescription(taskDTO.getDescription());
            task.setPriority(taskDTO.getPriority());
            task.setDueDate(taskDTO.getDueDate());
            task.setTaskStatus(TaskStatus.INPROGRESS);
            task.setUser(optionalUser.get());
            return taskRepository.save(task).getTaskDTO();
        }
        return null;
    }
}
