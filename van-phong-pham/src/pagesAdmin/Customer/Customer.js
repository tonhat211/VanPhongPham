import './Customer.scss'
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { formatPrices } from '~/utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, changeCustomerStatus } from '~/pagesAdmin/Customer/customerSlice';
import { toast } from 'react-toastify';
import useI18n from '~/hooks/useI18n';

function Customer() {
    const { t, lower } = useI18n();
    const navigate = useNavigate();

    const [selectedCustomers, setSelectedCustomers] = useState(null);

    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customer.list);

    const statusDisplayMap = {
        ACTIVE: 'Đang hoạt động',
        LOCKED: 'Đã bị khóa',
        UNLOCK: 'Mở khóa',
        FLAG: 'Đánh dấu đã xóa',
        FLAGGED: 'Đánh dấu đã xóa',
        RESTORE: 'Khôi phục',
    };

    const rowsWithSTT = customers.map((customer, index) => ({
        ...customer,
        stt: index + 1,
        status: statusDisplayMap[customer.status] || customer.status,
    }));

    const allowedNextStatuses = {
        'Đang hoạt động': [
            { label: 'Khóa', action: 'LOCK' },
            { label: 'Đánh dấu đã xóa', action: 'FLAG' }
        ],
        'Đã bị khóa': [
            { label: 'Mở khóa', action: 'UNLOCK' },
            { label: 'Đánh dấu đã xóa', action: 'FLAG' }
        ],
        'Đánh dấu đã xóa': [
            { label: 'Khôi phục', action: 'RESTORE' }
        ],
        // 'Đã bị xóa': []
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchCustomers()).unwrap();
            } catch (error) {
                toast.error(t('adCustomer.loadError'));
            }
        };
        fetchData();
    }, [dispatch]);


    const handleChangeStatus = async (id, newStatus) => {
        try {
            await dispatch(changeCustomerStatus({ id, status: newStatus })).unwrap();

            await dispatch(fetchCustomers()).unwrap();
        } catch (error) {
            toast.error(t('adCustomer.updateError'));
        }
    };

    const columns = [
        {
            field: 'stt',
            headerName: 'STT',
            width: 80,
            sortable: false,
            filterable: false,
        },
        { field: 'name', headerName: 'Họ tên', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 150,
            renderCell: (params) => {
                const colorMap = {
                    'Đang hoạt động': 'green',
                    'Đã bị khóa': 'orange',
                    // 'Đã bị xóa': 'red',
                    'Đánh dấu đã xóa': 'red',
                };
                return (
                    <span style={{ color: colorMap[params.value] || 'black', fontWeight: 500 }}>
        {params.value}
      </span>
                );
            },
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
                    <Box sx={{ position: 'relative', display: 'flex', gap: 1 }}>
                        <Select
                            value=""
                            displayEmpty
                            onChange={(e) => {
                                const selectedAction = e.target.value;
                                handleChangeStatus(params.row.id, selectedAction);
                            }}
                            renderValue={() => (
                                <span style={{ color: '#aaa' }}>
                        {availableStatuses.length === 0 ? 'Không có thao tác' : 'Chọn thao tác'}
                    </span>
                            )}
                            disabled={availableStatuses.length === 0}
                            MenuProps={{
                                disableScrollLock: true,
                                PaperProps: {
                                    style: {
                                        maxHeight: 200,
                                        zIndex: 9999,
                                    },
                                },
                                PopperProps: {
                                    disablePortal: true,
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, 6],
                                            },
                                        },
                                        {
                                            name: 'preventOverflow',
                                            options: {
                                                boundary: 'viewport',
                                            },
                                        },
                                    ],
                                },
                            }}
                            sx={{ minWidth: 130, fontSize: 14 }}
                        >
                            <MenuItem value="" disabled>
                                Chọn thao tác
                            </MenuItem>
                            {availableStatuses.map((option, i) => (
                                <MenuItem key={i} value={option.action}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>

                        <Button onClick={() => setSelectedCustomers(params.row)}>
                            Chi tiết
                        </Button>
                    </Box>
                );
            }
        },
        {
            field: 'orders',
            headerName: 'Đơn hàng',
            width: 250,
            renderCell: () => (
                <span
                    onClick={() => navigate(`/admin/order`)}
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    Đơn hàng
                </span>
            ),
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
                                <Typography><b>Ngày sinh:</b> {selectedCustomers.birthday}</Typography>
                            </Box>

                            <Box className="info-row">
                            <Typography><b>Họ tên:</b> {selectedCustomers.name}</Typography>
                            </Box>

                            <Typography><b>Số điện thoại:</b> {selectedCustomers.phone}</Typography>
                            <Typography><b>Email:</b> {selectedCustomers.email}</Typography>

                            <Typography><b>Địa chỉ:</b> {selectedCustomers.fullAddress}</Typography>

                        </>
                    )}
                </DialogContent>

            </Dialog>

        </div>
    );
}

export default Customer;
