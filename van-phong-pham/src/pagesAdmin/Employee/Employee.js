import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    Typography,
    TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import './Employee.scss';

function Employee() {
    const mockEmployees = [
        {
            id: 1,
            name: 'Nguyen Van A',
            email: 'a@company.com',
            department: 'Kế toán',
            position: 'Nhân viên kế toán',
            gender: 'Nam',
            startDate: '2022-01-10',
            endDate: '',
            status: 'Đang làm việc',
            phone: '0909123456',
            address: '123 Lê Lợi, Q.1, TP.HCM',
        },
        {
            id: 2,
            name: 'Tran Thi B',
            email: 'b@company.com',
            department: 'Kỹ thuật',
            position: 'Trưởng phòng kỹ thuật',
            gender: 'Nữ',
            startDate: '2020-06-01',
            endDate: '',
            status: 'Đang làm việc',
            phone: '0987654321',
            address: '456 Hai Bà Trưng, Q.3, TP.HCM',
        },
        {
            id: 3,
            name: 'Le Van C',
            email: 'c@company.com',
            department: 'Hành chính',
            position: 'Nhân viên hành chính',
            gender: 'Nam',
            startDate: '2019-09-15',
            endDate: '2024-01-01',
            status: 'Đã nghỉ việc',
            phone: '0932123456',
            address: '789 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM',
        },
    ];

    const departments = ['Kế toán', 'Kỹ thuật', 'Hành chính', 'Marketing', 'Nhân sự'];

    const positionsByDepartment = {
        'Kế toán': ['Nhân viên kế toán', 'Trưởng phòng kế toán'],
        'Kỹ thuật': ['Nhân viên kỹ thuật', 'Trưởng phòng kỹ thuật'],
        'Hành chính': ['Nhân viên hành chính', 'Trưởng phòng hành chính'],
        'Marketing': ['Nhân viên marketing', 'Trưởng phòng marketing'],
        'Nhân sự': ['Nhân viên nhân sự', 'Trưởng phòng nhân sự'],
    };

    const statuses = ['Đang làm việc', 'Đã nghỉ việc'];

    const allowedActions = {
        'Đang làm việc': ['Chuyển phòng', 'Đổi chức vụ', 'Đánh dấu nghỉ việc'],
        'Đã nghỉ việc': ['Khôi phục'],
    };

    const [employees, setEmployees] = useState(mockEmployees);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filters, setFilters] = useState({ department: '', position: '', status: '', search: '' });

    const handleAction = (id, action, value) => {
        setEmployees(prev =>
            prev.map(emp => {
                if (emp.id !== id) return emp;
                switch (action) {
                    case 'Chuyển phòng':
                        return {
                            ...emp,
                            department: value,
                            position: positionsByDepartment[value][0],
                        };
                    case 'Đổi chức vụ':
                        return { ...emp, position: value };
                    case 'Đánh dấu nghỉ việc':
                        return { ...emp, status: 'Đã nghỉ việc', endDate: new Date().toISOString().split('T')[0] };
                    case 'Khôi phục':
                        return { ...emp, status: 'Đang làm việc', endDate: '' };
                    default:
                        return emp;
                }
            })
        );
    };

    const filteredEmployees = employees.filter(emp => {
        const matchDepartment = !filters.department || emp.department === filters.department;
        const matchPosition = !filters.position || emp.position === filters.position;
        const matchStatus = !filters.status || emp.status === filters.status;
        const matchSearch = !filters.search ||
            emp.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            emp.email.toLowerCase().includes(filters.search.toLowerCase());
        return matchDepartment && matchPosition && matchStatus && matchSearch;
    });

    const rowsWithSTT = filteredEmployees.map((emp, index) => ({
        ...emp,
        stt: index + 1,
    }));

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'name', headerName: 'Họ tên', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'department', headerName: 'Phòng ban', width: 110 },
        { field: 'position', headerName: 'Chức vụ', width: 130 },
        { field: 'status', headerName: 'Trạng thái', width: 130 },
        {
            field: 'actions',
            headerName: 'Thao tác thay đổi',
            width: 250,
            sortable: false,
            renderCell: (params) => {
                const emp = params.row;
                const available = allowedActions[emp.status] || [];
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {available.includes('Chuyển phòng') && (
                            <Select
                                size="small"
                                value=""
                                displayEmpty
                                onChange={(e) => handleAction(emp.id, 'Chuyển phòng', e.target.value)}
                            >
                                <MenuItem value="" disabled>Chuyển phòng</MenuItem>
                                {departments.map(dep => (
                                    <MenuItem key={dep} value={dep}>{dep}</MenuItem>
                                ))}
                            </Select>
                        )}
                        {available.includes('Đổi chức vụ') && (
                            <Select
                                size="small"
                                value=""
                                displayEmpty
                                onChange={(e) => handleAction(emp.id, 'Đổi chức vụ', e.target.value)}
                            >
                                <MenuItem value="" disabled>Đổi chức vụ</MenuItem>
                                {(positionsByDepartment[emp.department] || []).map(pos => (
                                    <MenuItem key={pos} value={pos}>{pos}</MenuItem>
                                ))}
                            </Select>
                        )}
                    </Box>
                );
            },
        },
        {
            field: 'moreActions',
            headerName: 'Thao tác khác',
            width: 180,
            sortable: false,
            renderCell: (params) => {
                const emp = params.row;
                const available = allowedActions[emp.status] || [];
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {available.includes('Đánh dấu nghỉ việc') && (
                            <Button size="small" onClick={() => handleAction(emp.id, 'Đánh dấu nghỉ việc')}>
                                Nghỉ việc
                            </Button>
                        )}
                        {available.includes('Khôi phục') && (
                            <Button size="small" onClick={() => handleAction(emp.id, 'Khôi phục')}>
                                Khôi phục
                            </Button>
                        )}
                        <Button size="small" onClick={() => setSelectedEmployee(emp)}>Chi tiết</Button>
                    </Box>
                );
            }
        }
    ];

    return (
        <div className="employee-container">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <Select
                    size="small"
                    value={filters.department}
                    displayEmpty
                    onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value, position: '' }))}
                >
                    <MenuItem value="">Tất cả phòng ban</MenuItem>
                    {departments.map(dep => (
                        <MenuItem key={dep} value={dep}>{dep}</MenuItem>
                    ))}
                </Select>

                <Select
                    size="small"
                    value={filters.position}
                    displayEmpty
                    onChange={(e) => setFilters(prev => ({ ...prev, position: e.target.value }))}
                    disabled={!filters.department}
                >
                    <MenuItem value="">Tất cả chức vụ</MenuItem>
                    {(positionsByDepartment[filters.department] || []).map(pos => (
                        <MenuItem key={pos} value={pos}>{pos}</MenuItem>
                    ))}
                </Select>

                <Select
                    size="small"
                    value={filters.status}
                    displayEmpty
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                    <MenuItem value="">Tất cả trạng thái</MenuItem>
                    {statuses.map(status => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                </Select>

                <TextField
                    size="small"
                    placeholder="Tìm kiếm tên hoặc email"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />

                <Button
                    variant="outlined"
                    onClick={() => setFilters({ department: '', position: '', status: '', search: '' })}
                >
                    Xóa lọc
                </Button>
            </Box>

            <DataGrid
                rows={rowsWithSTT}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableRowSelectionOnClick
                autoHeight
                sx={{
                    '& .MuiDataGrid-cell:focus': { outline: 'none' },
                    '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
                }}
            />

            <Dialog
                open={!!selectedEmployee}
                onClose={() => setSelectedEmployee(null)}
                disableScrollLock={true}
                PaperProps={{ sx: { minWidth: 500 } }}
            >
                <DialogTitle>Thông tin nhân viên</DialogTitle>
                <DialogContent>
                    {selectedEmployee && (
                        <>
                            <Box className="info-row">
                                <Typography><b>ID:</b> {selectedEmployee.id}</Typography>
                                <Typography><b>Trạng thái:</b> {selectedEmployee.status}</Typography>
                            </Box>
                            <Box className="info-row">
                                <Typography><b>Họ tên:</b> {selectedEmployee.name}</Typography>
                                <Typography><b>Giới tính:</b> {selectedEmployee.gender}</Typography>
                            </Box>
                            <Typography><b>Email:</b> {selectedEmployee.email}</Typography>
                            <Typography><b>SĐT:</b> {selectedEmployee.phone}</Typography>
                            <Typography><b>Địa chỉ:</b> {selectedEmployee.address}</Typography>
                            <Typography><b>Phòng ban:</b> {selectedEmployee.department}</Typography>
                            <Typography><b>Chức vụ:</b> {selectedEmployee.position}</Typography>
                            <Typography><b>Ngày bắt đầu:</b> {selectedEmployee.startDate}</Typography>
                            <Typography><b>Ngày nghỉ việc:</b> {selectedEmployee.endDate || '—'}</Typography>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Employee;
