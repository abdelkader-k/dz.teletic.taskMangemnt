package dz.teletic.task_springboot.dto;

import java.util.Date;

import dz.teletic.task_springboot.entities.TaskStatus;
import lombok.Data;

@Data
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private Date dueDate;
    private String priority;
    private TaskStatus taskStatus;

    private Long developerId;
    private String developerName;
}
