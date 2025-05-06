import './Customer.scss'
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { formatPrices } from '~/utils/common';

function Customer() {

    const mockCustomer = [
        {
            id: 2,
            name: 'Phan Van V',
            email: 'khachhang@gmail.com',
            status: 'Đang hoạt động',
            createdAt: '1-01-2-19',
            fullname: 'Nguyen Thi B',
            number: '0359542457',
            address: '1.drgaq.qafdgba',
            gender: 'male',
        },
        {
            id: 3,
            name: 'Nguyen Van A',
            email: 'a@gmail.com',
            status: 'Đã bị khóa',
            createdAt: '1-01-2-19',
            fullname: 'Nguyen Thi B',
            number: '0359542457',
            address: '1.drgaq.qafdgba',
            gender: 'male',
        },
        {
            id: 4,
            name: 'Tran Thi B',
            email: 'b@gmail.com',
            status: 'Đã bị xóa',
            createdAt: '1-01-2-19',
            fullname: 'Nguyen Thi B',
            number: '0359542457',
            address: '1.drgaq.qafdgba',
            gender: 'female',
        },
    ];


    const [customers, setCustomers] = useState(mockCustomer);

    const navigate = useNavigate();

    const [selectedCustomers, setSelectedCustomers] = useState(null);

    const rowsWithSTT = customers.map((customer, index) => ({
        ...customer,
        stt: index + 1,
    }));

    const statuses = [
        'Đang hoạt động',         // Bình thường
        'Đã bị khóa',             // Admin khóa
        'Đã bị xóa',              // Bị xóa khỏi hệ thống (DB)
        'Đánh dấu đã xóa',        // Người dùng xóa (flag)
        'Khôi phục'            // Phục hồi từ đánh dấu
    ];

    const statusChangeMap = {
        'Khóa': 'Đã bị khóa',
        'Mở khóa': 'Đang hoạt động',
        'Xóa': 'Đã bị xóa',
        'Đánh dấu': 'Đánh dấu đã xóa',
        'Khôi phục': 'Đang hoạt động'
    };


    const allowedNextStatuses = {
        'Đang hoạt động': ['Khóa', 'Đánh dấu'],
        'Đã bị khóa': ['Mở khóa', 'Đánh dấu', 'Xóa'],
        'Đánh dấu đã xóa': ['Xóa', 'Khôi phục'],
        'Đã bị xóa': []
    };

    const handleChangeStatus = (id, newStatus) => {
        setCustomers(prev =>
            prev.map(cus =>
                cus.id === id ? { ...cus, status: newStatus } : cus
            )
        );
    };

    const columns = [
        {
            field: 'stt',
            headerName: 'STT',
            width: 80,
            sortable: false,
            filterable: false,
        },
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Tên', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 150,
        },
        {
            field: 'orders',
            headerName: 'Đơn hàng',
            width: 150,
            renderCell: () => (
                <span
                    onClick={() => navigate(`/admin/order`)}
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    Đơn hàng
                </span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
            const currentStatus = params.row.status;
            const availableStatuses = allowedNextStatuses[currentStatus] || [];
                return (
                <div>
                    <Select   value=""
                              displayEmpty
                              MenuProps={{
                                  disableScrollLock: true,
                                  PaperProps: {
                                      style: {
                                          maxHeight: 200,
                                          zIndex: 9999,
                                      },
                                  },
                                  anchorOrigin: {
                                      vertical: 'bottom',
                                      horizontal: 'left',
                                  },
                                  transformOrigin: {
                                      vertical: 'top',
                                      horizontal: 'left',
                                  },
                              }}
                              sx={{ minWidth: 130, fontSize: 14 }}
                              onChange={(e) => {
                                  const selectedAction = e.target.value;
                                  const newStatus = statusChangeMap[selectedAction] || selectedAction;
                                  handleChangeStatus(params.row.id, newStatus);
                              }}
                    >
                        <MenuItem value="" disabled>    </MenuItem>
                        {availableStatuses.map((status, i) => (
                            <MenuItem key={i} value={status}>{status}</MenuItem>
                        ))}
                    </Select>
                    <Button onClick={() => setSelectedCustomers(params.row)}>
                        Chi tiết
                    </Button>
                </div>
            );
            },
        },
    ];

    return (
        <div className="customer-container">
            <DataGrid
                rows={rowsWithSTT}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-cell:focus-within': {
                        outline: 'none',
                    },
                }}
            />

            <Dialog open={!!selectedCustomers} onClose={() => setSelectedCustomers(null)}  disableScrollLock={true}
                    PaperProps={{
                        sx: {
                            minWidth: 500,
                        },
                    }}>
                <DialogTitle className="title-dialog">Thông tin khách hàng</DialogTitle>
                <DialogContent className="customer-dialog-content">
                    {selectedCustomers && (
                        <>
                            <Box className="info-row">
                                <Typography><b>ID:</b> {selectedCustomers.id}</Typography>
                                <Typography><b>Ngày tham gia:</b> {selectedCustomers.createdAt}</Typography>
                            </Box>

                            <Box className="info-row">
                            <Typography><b>Họ tên:</b> {selectedCustomers.fullname}</Typography>
                            <Typography><b>Giới tính:</b> {selectedCustomers.gender}</Typography>
                            </Box>

                            <Typography><b>Số điện thoại:</b> {selectedCustomers.number}</Typography>
                            <Typography><b>Email:</b> {selectedCustomers.email}</Typography>

                            <Typography><b>Địa chỉ:</b> {selectedCustomers.address}</Typography>

                        </>
                    )}
                </DialogContent>

            </Dialog>

        </div>
    );
}

export default Customer;
