package dz.teletic.task_springboot.services.admin;

import java.util.Comparator;
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

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
            .stream()
            .sorted(Comparator.comparing(Task::getDueDate).reversed())
            .map(Task::getTaskDTO)
            .collect(Collectors.toList());
    }

    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }

    public TaskDTO getTaskById(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.map(Task::getTaskDTO).orElse(null);
    }

    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTitle(taskDTO.getTitle());
            existingTask.setDescription(taskDTO.getDescription());
            existingTask.setDueDate(taskDTO.getDueDate());
            existingTask.setPriority(taskDTO.getPriority());
            existingTask.setTaskStatus(mapStringToTaskStatus(String.valueOf(taskDTO.getTaskStatus())));
            return taskRepository.save(existingTask).getTaskDTO();
        }
        return null;
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
