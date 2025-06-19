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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, updateEmployeeAction } from '~/pagesAdmin/Employee/employeeSlice';
import { fetchCustomers } from '~/pagesAdmin/Customer/customerSlice';
import { toast } from 'react-toastify';

function Employee() {

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


    const dispatch = useDispatch();
    const { list: employees, loading } = useSelector((state) => state.employees);

    const statusDisplayMap = {
        ACTIVE: 'Đang hoạt động',
        FLAG: 'Đã nghỉ việc',
        FLAGGED: 'Đã nghỉ việc',
        RESTORE: 'Khôi phục',
    };

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filters, setFilters] = useState({ department: '', position: '', status: '', search: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchEmployees()).unwrap();
            } catch (error) {
                // toast.error(t('adCustomer.loadError'));
            }
        };
        fetchData();
    }, [dispatch]);

    const action_map = {
        'Chuyển phòng': 'CHUYEN_PHONG',
        'Đổi chức vụ': 'DOI_CHUC_VU',
        'Đánh dấu nghỉ việc': 'FLAG',
        'Khôi phục': 'RESTORE',
    };

    const handleAction = (id, actionLabel, value= '') => {
        const action = action_map[actionLabel];
        if (!action) return;
        dispatch(updateEmployeeAction({ id, action, value }))
            .then(() => dispatch(fetchEmployees()));
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
        key: emp.id,
        status: statusDisplayMap[emp.status] || emp.status,
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
            headerName: 'Thao tác',
            width: 320,
            sortable: false,
            renderCell: (params) => {
                const emp = params.row;
                // const available = allowedActions[emp.status] || [];
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Select
                            size="small"
                            value=""
                            displayEmpty
                            onChange={(e) => handleAction(emp.id, 'Chuyển phòng', e.target.value)}
                        >
                            <MenuItem value="" disabled>Chuyển phòng ban</MenuItem>
                            {departments.map(dep => (
                                <MenuItem key={dep} value={dep}>{dep}</MenuItem>
                            ))}
                        </Select>

                        <Select
                            size="small"
                            value=""
                            displayEmpty
                            onChange={(e) => handleAction(emp.id, 'Đổi chức vụ', e.target.value)}
                        >
                            <MenuItem value="" disabled>Chuyển vị trí</MenuItem>
                            {(positionsByDepartment[emp.department] || []).map(pos => (
                                <MenuItem key={pos} value={pos}>{pos}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                );
            },
        },
        {
            field: 'moreActions',
            headerName: 'Thao tác khác',
            width: 200,
            sortable: false,
            renderCell: (params) => {
                const emp = params.row;
                const isDeleted = emp.status === 'Đã nghỉ việc';
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {isDeleted ? (
                            <Button size="small" onClick={() => handleAction(emp.id, 'Khôi phục')}>
                                Khôi phục
                            </Button>
                        ) : (

                            <Button size="small" onClick={() => handleAction(emp.id, 'Đánh dấu nghỉ việc')}>
                                Nghỉ việc
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
                loading={loading}
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
                                <Typography><b>Ngày sinh:</b> {selectedEmployee.birthday}</Typography>
                            </Box>
                            <Typography><b>Email:</b> {selectedEmployee.email}</Typography>
                            <Typography><b>SĐT:</b> {selectedEmployee.phone}</Typography>
                            <Typography><b>Địa chỉ:</b> {selectedEmployee.address}</Typography>
                            <Typography><b>Phòng ban:</b> {selectedEmployee.department}</Typography>
                            <Typography><b>Chức vụ:</b> {selectedEmployee.position}</Typography>

                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Employee;
