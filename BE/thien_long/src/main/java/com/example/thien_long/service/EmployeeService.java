package com.example.thien_long.service;

import com.example.thien_long.dto.request.EmployeeActionRequest;
import com.example.thien_long.dto.response.EmployeeResponse;
import com.example.thien_long.exception.exceptionCatch.AppException;
import com.example.thien_long.exception.exceptionCatch.ErrorCode;
import com.example.thien_long.mapper.EmployeeMapper;
import com.example.thien_long.model.Employee;
import com.example.thien_long.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    private static final Map<String, List<String>> POSITIONS_BY_DEPARTMENT = Map.of(
            "Kế toán", List.of("Nhân viên kế toán", "Trưởng phòng kế toán"),
            "Kỹ thuật", List.of("Nhân viên kỹ thuật", "Trưởng phòng kỹ thuật"),
            "Hành chính", List.of("Nhân viên hành chính", "Trưởng phòng hành chính"),
            "Marketing", List.of("Nhân viên marketing", "Trưởng phòng marketing"),
            "Nhân sự", List.of("Nhân viên nhân sự", "Trưởng phòng nhân sự")
    );



    public List<EmployeeResponse> getAll() {
        return employeeRepository.findAll()
                .stream()
                .map(employeeMapper::toResponse)
                .collect(Collectors.toList());
    }

    public void updateEmployeeAction(EmployeeActionRequest request) {
        Employee emp = employeeRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND));

        switch (request.getAction()) {
            case "CHUYEN_PHONG":
                emp.setDepartment(request.getValue());
                List<String> positions = POSITIONS_BY_DEPARTMENT.getOrDefault(request.getValue(), List.of());
                if (!positions.isEmpty()) {
                    emp.setPosition(positions.get(0));
                }
                break;
            case "DOI_CHUC_VU":
                emp.setPosition(request.getValue());
                break;
            case "FLAG":
                emp.setLocked(true);
                emp.setIsDeleted(1);
                break;
            case "RESTORE":
                emp.setLocked(false);
                emp.setIsDeleted(0);
                break;
            default:
                throw new AppException(ErrorCode.INVALID_ACTION);
        }

        employeeRepository.save(emp);
    }
}
