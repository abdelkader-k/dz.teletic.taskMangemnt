package dz.teletic.task_springboot.controller.developer;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dz.teletic.task_springboot.dto.TaskDTO;
import dz.teletic.task_springboot.services.developer.DeveloperService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/developer")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DeveloperController {
    
    private final DeveloperService developerService;

    @GetMapping("/tasks")
    public ResponseEntity<List<TaskDTO>> getTasksByUserId() {
        return ResponseEntity.ok(developerService.getTasksByUserId());
    }

    @GetMapping("/task/{id}/{status}")
    public ResponseEntity<TaskDTO> updateTaskStatus(
            @PathVariable Long id,
            @PathVariable String status) {
        TaskDTO updatedTaskDTO = developerService.updateTask(id, status);
        return ResponseEntity.ok(updatedTaskDTO);
    }
    
}
