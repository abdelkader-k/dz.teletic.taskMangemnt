package dz.teletic.task_springboot.repo;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dz.teletic.task_springboot.dto.TaskDTO;
import dz.teletic.task_springboot.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByUserId(Long id);
}
