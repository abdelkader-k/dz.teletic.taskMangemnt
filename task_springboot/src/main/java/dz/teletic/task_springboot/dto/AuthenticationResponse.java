package dz.teletic.task_springboot.dto;

import dz.teletic.task_springboot.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private Long userId;
    private UserRole userRole;
}
