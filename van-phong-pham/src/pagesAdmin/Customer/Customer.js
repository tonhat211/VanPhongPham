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
        ACTIVE:  t('adCustomer.status_active'),
        LOCKED: t('adCustomer.status_locked'),
        UNLOCK: t('adCustomer.action_unlock'),
        FLAG: t('adCustomer.status_flagged'),
        FLAGGED: t('adCustomer.status_flagged'),
        RESTORE: t('adCustomer.status_restore'),
    };

    const rowsWithSTT = customers.map((customer, index) => ({
        ...customer,
        stt: index + 1,
        status: statusDisplayMap[customer.status] || customer.status,
    }));

    const allowedNextStatuses = {
       [t('adCustomer.status_active')]: [
            { label: t('adCustomer.action_lock'), action: 'LOCK' },
            { label: t('adCustomer.action_flag'), action: 'FLAG' }
        ],
        [t('adCustomer.status_locked')]: [
            { label: t('adCustomer.action_unlock'), action: 'UNLOCK' },
            { label: t('adCustomer.action_flag'), action: 'FLAG' }
        ],
        [t('adCustomer.status_flagged')]: [
            { label: t('adCustomer.action_restore'), action: 'RESTORE' }
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
            headerName: t('adCustomer.stt'),
            width: 80,
            sortable: false,
            filterable: false,
        },
        { field: 'name', headerName: t('adCustomer.fullname'), flex: 1 },
        { field: 'email', headerName: t('adCustomer.email'), flex: 1 },
        {
            field: 'status',
            headerName: t('adCustomer.status'),
            width: 150,
            renderCell: (params) => {
                const colorMap = {
                    [t('adCustomer.status_active')]: 'green',
                    [t('adCustomer.status_locked')]: 'orange',
                    // 'Đã bị xóa': 'red',
                    [t('adCustomer.status_flagged')]: 'red',
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
            headerName: t('adCustomer.actions'),
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
                        {availableStatuses.length === 0 ? t('adCustomer.no-action') : t('adCustomer.actions')}
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
                            {t('adCustomer.details')}
                        </Button>
                    </Box>
                );
            }
        },
        {
            field: 'orders',
            headerName: t('adCustomer.orders'),
            width: 250,
            renderCell: () => (
                <span
                    onClick={() => navigate(`/admin/order`)}
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
                   {t('adCustomer.orders')}
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
                <DialogTitle className="title-dialog">{t('adCustomer.dialogTitle')}</DialogTitle>
                <DialogContent className="customer-dialog-content">
                    {selectedCustomers && (
                        <>
                            <Box className="info-row">
                                <Typography><b>ID:</b> {selectedCustomers.id}</Typography>
                                <Typography><b>{t('adCustomer.birth')}:</b> {selectedCustomers.birthday}</Typography>
                            </Box>

                            <Box className="info-row">
                            <Typography><b>{t('adCustomer.fullname')}:</b> {selectedCustomers.name}</Typography>
                            </Box>

                            <Typography><b>{t('adCustomer.phone')}:</b> {selectedCustomers.phone}</Typography>
                            <Typography><b>{t('adCustomer.email')}:</b> {selectedCustomers.email}</Typography>

                            <Typography><b>{t('adCustomer.address')}:</b> {selectedCustomers.fullAddress}</Typography>

                        </>
                    )}
                </DialogContent>

            </Dialog>

        </div>
    );
}

export default Customer;
