import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, MenuItem, Select, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import './Orders.scss';
import Box from '@mui/material/Box';
import { formatPrices } from '~/utils/common';

function Orders() {

    const statuses = [
        'Chờ xử lý', 'Đã xác nhận', 'Chuẩn bị giao', 'Đang giao hàng',
        'Đã giao hàng', 'Đã hủy', 'Thất bại',
    ];

    const allowedNextStatuses = {
        'Chờ xử lý': ['Đã xác nhận', 'Đã hủy'],
        'Đã xác nhận': ['Chuẩn bị giao', 'Đã hủy'],
        'Chuẩn bị giao': ['Đang giao hàng', 'Đã hủy'],
        'Đang giao hàng': ['Đã giao hàng', 'Thất bại'],
        'Đã giao hàng': [],
        'Thất bại': [],
        'Đã hủy': [],
    };

    const mockOrders = [
        {
            id: 27,
            createdAt: '2025-01-21 00:27',
            status: 'Đang giao hàng',
            total: 348124,
            updatedAt: '2025-01-21 11:28',
            products: [
                'ID: 4 - Bút bi x Số lượng: 1',
                'ID: 2 - Sach x Số lượng: 1',
                'ID: 14 - Vo x Số lượng: 1',
            ],
            address: '222 | Hồ Chí Minh, Thủ Đức, Bình Trưng Tây, 14 đường số 2',
            payment: 'da thanh toán',
        },
        {
            id: 25,
            createdAt: '2025-01-20 18:31',
            status: 'Đã hủy',
            total: 1245000,
            updatedAt: '2025-05-01 16:05',
            products: [ 'ID: 5 - Bút bi x Số lượng: 1',
                'ID: 154 - Vo x Số lượng: 4',],
            address: 'ABC, Quận 1, TP.HCM',
            payment: 'Đã thanh toán',
        },
        {
            id: 30,
            createdAt: '2025-02-01 09:10',
            status: 'Chờ xử lý',
            total: 560000,
            updatedAt: '2025-02-01 09:10',
            products: [ 'ID: 24 - Bút bi x Số lượng: 1',
                'ID: 22 - Sach x Số lượng: 1',
                'ID: 114 - Vo x Số lượng: 1',],
            address: 'Đống Đa, Hà Nội',
            payment: 'COD',
        },
        {
            id: 31,
            createdAt: '2025-02-02 14:22',
            status: 'Đã xác nhận',
            total: 99000,
            updatedAt: '2025-02-02 15:00',
            products: ['ID: 22 - Sach x Số lượng: 1'],
            address: 'Ninh Kiều, Cần Thơ',
            payment: 'Ví MoMo',
        },
        {
            id: 32,
            createdAt: '2025-02-03 11:45',
            status: 'Chuẩn bị giao',
            total: 245000,
            updatedAt: '2025-02-03 12:10',
            products: ['ID: 22 - Sach x Số lượng: 1'],
            address: 'Thanh Khê, Đà Nẵng',
            payment: 'Chưa thanh toán',
        },
        {
            id: 33,
            createdAt: '2025-02-04 08:30',
            status: 'Đang giao hàng',
            total: 135000,
            updatedAt: '2025-02-04 10:00',
            products: ['ID: 22 - Sach x Số lượng: 1'],
            address: 'Bình Thạnh, HCM',
            payment: 'Đã thanh toán',
        },
        {
            id: 34,
            createdAt: '2025-02-05 16:05',
            status: 'Thất bại',
            total: 80000,
            updatedAt: '2025-02-05 16:30',
            products: ['ID: 22 - Sach x Số lượng: 1'],
            address: 'Lào Cai',
            payment: 'Chưa thanh toán',
        },
        {
            id: 35,
            createdAt: '2025-02-06 12:00',
            status: 'Đã hoàn tiền',
            total: 420000,
            updatedAt: '2025-02-07 09:00',
            products: ['ID: 22 - Sach x Số lượng: 1'],
            address: 'Biên Hòa, Đồng Nai',
            payment: 'Đang giao hàng',
        },
        {
            id: 36,
            createdAt: '2025-02-07 07:55',
            status: 'Đang giao hàng',
            total: 150000,
            updatedAt: '2025-02-10 08:00',
            products: ['ID: 22 - Sach x Số lượng: 1'],
            address: 'TP. Vinh, Nghệ An',
            payment: 'Đang xử lý hoàn tiền',
        },
    ];

    const [orders, setOrders] = useState(mockOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleChangeStatus = (id, newStatus) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === id ? { ...order, status: newStatus, updatedAt: new Date().toISOString().split('T').join(' ').slice(0, 16) } : order
            )
        );
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'createdAt', headerName: 'Tạo lúc', width: 100 },
        {
            field: 'products',
            headerName: 'Danh sách sản phẩm',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', whiteSpace: 'normal', lineHeight: 1.5}}>
                    {params.value.map((product, idx) => (
                        <div key={idx}>{product}</div>
                    ))}
                </Box>
            ),
        },
        {
            field: 'total',
            headerName: 'Tổng tiền',
            width: 100,
            valueFormatter:  (params) => formatPrices(params.value)
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 120,
        },
        {
            field: 'updatedAt',
            headerName: 'Cập nhật vào',
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 250,
            renderCell: (params) => {
                const currentStatus = params.row.status;
                const availableStatuses = allowedNextStatuses[currentStatus] || [];

                return (
                    <div>
                        <Select
                            value=""
                            displayEmpty
                            onChange={(e) => handleChangeStatus(params.row.id, e.target.value)}
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
                        >
                            <MenuItem value="" disabled>    </MenuItem>
                            {availableStatuses.map((status, i) => (
                                <MenuItem key={i} value={status}>{status}</MenuItem>
                            ))}
                        </Select>
                        <Button onClick={() => setSelectedOrder(params.row)}>
                            Chi tiết
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="orders-container">
            <DataGrid
                sx={{
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-cell:focus-within': {
                        outline: 'none',
                    },
                }}
                rows={orders}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.id}
                getRowHeight={() => 'auto'}
                disableRowSelectionOnClick
            />

            <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)}  disableScrollLock={true}  >
                <DialogTitle className="title-dialog">Thông tin đơn hàng</DialogTitle>
                <DialogContent className="order-dialog-content">
                    {selectedOrder && (
                        <>
                            <Box className="info-row">
                                <Typography><b>ID:</b> {selectedOrder.id}</Typography>
                                <Typography><b>Ngày đặt:</b> {selectedOrder.createdAt}</Typography>
                            </Box>

                            <Box className="info-col">
                            <Typography><b>Thông tin nhận hàng:</b></Typography>
                                <Typography>{selectedOrder.address}</Typography>
                            </Box>

                            <Typography><b>Danh sách sản phẩm:</b></Typography>
                            <ul>
                                {selectedOrder.products.map((p, i) => (
                                    <li key={i}>
                                        <Typography>{p}</Typography>
                                    </li>
                                ))}
                            </ul>

                            <Typography><b>Thông tin thanh toán:</b> {selectedOrder.payment}</Typography>
                            <Typography><b>Thành tiền:</b> {formatPrices(selectedOrder)}</Typography>

                            <Box className="button-group">
                                <Button variant="outlined" color="primary" className="print-btn">
                                    In hóa đơn
                                </Button>

                            </Box>
                        </>
                    )}
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default Orders;
