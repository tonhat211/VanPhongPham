import classNames from 'classnames/bind';
import { json, Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faMinus,
    faPlus,
    faTicket,
    faFloppyDisk,
    faMagnifyingGlass,
    faCircleXmark,
    faXmark,
    faAngleRight,
    faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Permission.module.scss';
import { CustomInput, Modal, EditorWithUseQuill as Editor, StarRating } from '~/pages/components';

import useI18n from '~/hooks/useI18n';
import { useData } from '~/context/DataContext';

import { useUpdateUrlParams } from '~/utils/url';
import { toast } from 'react-toastify';
import {
    addPermission,
    getAll,
    getPermissionsNotOfEmployee,
    getPermissionsOfEmployee,
    removePermission,
} from '~/api/permissionApi';
import { t } from 'i18next';

// import {Editor as Editor1} from '~/pages/components/EditorWithUseQuill/Editor'

const cx = classNames.bind(styles);

const employeeActions = [
    {
        value: 'none',
        title: '...',
    },
    {
        value: 'ADD',
        title: 'Thêm',
    },
    {
        value: 'REMOVE',
        title: 'Xóa',
    },
];

const permissionActions = [
    {
        value: 'none',
        title: '...',
    },
    {
        value: 'OWNER',
        title: t('owner'),
    },
    {
        value: 'EDIT',
        title: t("edit"),
    },
    {
        value: 'DISABLE',
        title: t("disable"),
    },
    {
        value: 'ENABLE',
        title: t("enable"),
    },
];

const MODAL_TYPES = {
    DETAIL: 'DETAIL',
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    LOCK: 'LOCK',
    UNLOCK: 'UNLOCK',
    FEEDBACK: 'FEEDBACK',
    CONFIRM_DELETE_IMG: 'CONFIRM_DELETE_IMG',
};

function Permission() {
    const { t, lower } = useI18n();
    const [searchInput, setSearchInput] = useState('');
    const formRef = useRef(null);
    const [formWidth, setFormWidth] = useState(0);
    const [isVisible, setVisible] = useState(false);
    const [searchRestults, setSearchRestults] = useState([]);
    const [modalType, setModalType] = useState(null);
    const isModalOpen = modalType !== null;
    const { menus, featureMenus, brands } = useData();

    const { category } = useParams(); // lấy từ URL path
    const [searchParams, setSearchParams] = useSearchParams();
    const updateUrlParams = useUpdateUrlParams();

    const page = parseInt(searchParams.get('page')) || 0;
    const [totalPages, setTotalPages] = useState(1);

    const sortBy = searchParams.get('sortBy') || 'price';
    const direction = searchParams.get('direction') || 'asc';
    const size = parseInt(searchParams.get('size') || '20');
    const navigate = useNavigate();
    const viewTypes = [
        { link: '', title: 'Tất cả' },
        ...menus.map((menu) => ({
            link: menu.link,
            title: menu.title,
        })),
    ];


    const openModal = (type, item) => {
        setModalType(type);
        setSelectedItem(item);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedItem(null);
    };

    const [permissions, setPermissions] = useState([]);

    const [employees, setEmplyoees] = useState([]);

    const fetchPermissionsOfEmployee = (id) => {
        console.log('fetchPermissionsOfEmployee');
        getPermissionsOfEmployee({ id })
            .then((data) => {
                if (data.success) {
                    // setPermissionsOfEmployee(data.permissions);
                    setPermissionDataShow(data.permissions);
                }
            })
            .catch((err) => {
                console.error('Lỗi getPermissionsOfEmployee:');
            });
    };

    const fetchPermissionsNotOfEmployee = (id) => {
        console.log('fetchPermissions Not OfEmployee');
        getPermissionsNotOfEmployee({ id })
            .then((data) => {
                if (data.success) {
                    setPermissionDataShow(data.permissions);
                }
            })
            .catch((err) => {
                console.error('Lỗi getPermissionsOfEmployee:');
            });
    };

    const fetchAll = () => {
        console.log('permissions: fetchAll');
        getAll({})
            .then((data) => {
                if (data.success) {
                    setEmplyoees(data.employees);
                    setPermissions(data.permissions);
                    setPermissionDataShow(data.permissions);
                }
            })
            .catch((err) => {
                console.error('Lỗi all:');
            });
    };

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [permissionDataShow, setPermissionDataShow] = useState([]);
    const [permissionMode, setPermissionMode] = useState('ALL');
    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        console.log('selectedEmployeeId changed to: ' + selectedEmployeeId);
        if (selectedEmployeeId) {
            if (permissionMode === 'REMOVE') fetchPermissionsOfEmployee(selectedEmployeeId);
            if (permissionMode === 'ADD') fetchPermissionsNotOfEmployee(selectedEmployeeId);
        } else {
            // setPermissionsOfEmployee(null);
            setPermissionDataShow(permissions);
            setPermissionMode('ALL');
        }
    }, [selectedEmployeeId, permissionMode]);

    const handleSelectedEmployee = (id) => {
        console.log('handleSelectedEmployee: id' + id);
        setSelectedEmployeeId((prevId) => (prevId === id ? null : id));
        setPermissionMode('REMOVE');
    };

    const handleShowMorePermissions = (id) => {
        console.log('handleShowMorePermissions: id' + id);
        setSelectedEmployeeId(id);
        setPermissionMode('ADD');
    };

    const handleRemovePermission = async (id) => {
        if (!selectedEmployeeId) {
            toast.error(t('unknown-employee'));
            return;
        }
        const result = await removePermission({ employeeId: selectedEmployeeId, permissionId: id });
        if (result.success) {
            toast.success(t("remove-perm-success"));
            const filterPermissions = permissionDataShow.filter((item) => item.id !== id);
            setPermissionDataShow(filterPermissions);
        } else {
            toast.error(t('remove-perm-fail'));
        }
    };

    const handleAddPermission = async (id) => {
        if (!selectedEmployeeId) {
            toast.error(t('unknown-employee'));
            return;
        }
        const result = await addPermission({ employeeId: selectedEmployeeId, permissionId: id });
        if (result.success) {
            toast.success(t("add-perm-success"));
            const filterPermissions = permissionDataShow.filter((item) => item.id !== id);
            setPermissionDataShow(filterPermissions);
        } else {
            toast.error(t("add-perm-success"));
        }
    };
    useEffect(() => {
        if (formRef.current) {
            setFormWidth(formRef.current.offsetWidth);
        }
    }, [isVisible]);


    const [selectedItem, setSelectedItem] = useState(null);



    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={classNames(cx('content-item', 'left'), 'grid-col-6')}>
                    <EmployeeTable
                        items={employees}
                        onChooseRow={handleSelectedEmployee}
                        onAddMore={handleShowMorePermissions}
                    ></EmployeeTable>
                </div>
                <div className={classNames(cx('content-item', 'right'), 'grid-col-6')}>
                    <PermissionTable
                        items={permissionDataShow}
                        mode={permissionMode}
                        onRemove={handleRemovePermission}
                        onAdd={handleAddPermission}
                    ></PermissionTable>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              
            </Modal>
        </div>
    );
   
    function EmployeeTable({ items, onChooseRow, onAddMore }) {
        const handleEmployeeClick = (id) => {
            onChooseRow?.(id);
        };

        const handleClickAddMore = (id) => {
            onAddMore?.(id);
        };

        return (
            <table className="custom-table fixed">
                <caption style={{ fontWeight: 'bold', fontSize: '1.6rem', padding: '8px' }}>
                    {t('employee-list')}
                </caption>
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '30%' }} />
                    {/* <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} /> */}
                    {/* <col style={{ width: '10%' }} /> */}
                    <col style={{ width: '15%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>{t('num-order')}</th>
                        <th>ID</th>
                        <th>{t('fullname')}</th>
                        <th>Email</th>
                        {/* <th>Phan loai</th>
                        <th>Da ban</th> */}
                        {/* <th>Feedback</th> */}
                        <th>{t('action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length ? (
                        items.map((item, index) => (
                            <EmployeeRowData
                                key={item.id}
                                item={item}
                                index={index}
                                onChoose={handleEmployeeClick}
                                onAddMore={handleClickAddMore}
                                isSelected={item.id === selectedEmployeeId}
                            />
                        ))
                    ) : (
                        <tr>
                            {/* 5 = số cột của thead – chỉnh lại cho khớp */}
                            <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>
                                {t('not-thing')}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    function EmployeeRowData({ item, index, onChoose, onAddMore, isSelected }) {
        const [action, setAction] = useState(employeeActions[0]?.value || '');
        const isLocked = item.status === 'LOCKED';
        const rowId = item?.id || undefined;

        const handleClick = () => {
            onChoose?.(rowId);
        };

        const handleClickAddMoreBtn = (e) => {
            e.stopPropagation();
            onAddMore?.(rowId);
        };

        return (
            <tr key={item.id} className={cx({ selected: isSelected })} onClick={handleClick}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td className="center">
                    <div className="d-flex-col">
                        <button className={classNames(cx(), 'btn btn-primary')} onClick={handleClickAddMoreBtn}>
                            {t('add')}
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

    function PermissionTable({ items, mode, onRemove, onAdd }) {
        const handleRemove = (id) => {
            onRemove?.(id);
        };

        const handleAdd = (id) => {
            onAdd?.(id);
        };

        return (
            <table className="custom-table fixed">
                <caption style={{ fontWeight: 'bold', fontSize: '1.6rem', padding: '8px' }}>
                    {mode==="ALL" && t('all-permissions')} 
                    {mode==="ADD" && t('can-add-permission-list')} 
                    {mode==="REMOVE" && t('exist-permission-list')} 
                </caption>
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '20%' }} />
                    {/* <col style={{ width: '30%' }} /> */}
                    {/* <col style={{ width: '30%' }} /> */}
                    {/* <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} /> */}
                    {/* <col style={{ width: '10%' }} /> */}
                    <col style={{ width: '15%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>{t('num-order')}</th>
                        <th>ID</th>
                        <th>{t('name')}</th>
                        {/* <th>url</th> */}
                        {/* <th>mo ta</th> */}
                        {/* <th>Phan loai</th>
                        <th>Da ban</th> */}
                        {/* <th>Feedback</th> */}
                        <th>{t('action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length ? (
                        items.map((item, index) => (
                            <PermissionRowData
                                key={item.id}
                                item={item}
                                index={index}
                                mode={mode}
                                onRemove={handleRemove}
                                onAdd={handleAdd}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>
                                {t('not-thing')}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    function PermissionRowData({ item, index, mode, onRemove, onAdd }) {
        const [action, setAction] = useState(permissionActions[0]?.value || '');
        const isLocked = item.status === 'LOCKED';
        const handleActionChange = (e) => {
            const selectedAction = e.target.value;
            setAction(selectedAction);
            switch (selectedAction) {
                case 'OWNER':
                    break;
                case 'EDIT':
                    break;
            }
        };
        const handleClichRemoveBtn = () => {
            onRemove?.(item.id);
        };

        const handleClichAddBtn = () => {
            onAdd?.(item.id);
        };
        return (
            <tr key={item.id} className={cx({ blocked: isLocked })}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td className="center">
                    <div className="d-flex-col">
                        {mode === 'ALL' && (
                            <select
                                style={{ marginLeft: '10px', fontSize: '1.4rem' }}
                                value={action}
                                onChange={handleActionChange}
                            >
                                {permissionActions &&
                                    permissionActions.map((acItem) => (
                                        <option value={acItem.value} key={acItem.value}>
                                            {acItem.title}
                                        </option>
                                    ))}
                            </select>
                        )}
                        {mode === 'ADD' && (
                            <button className={cx('action-btn', 'plus')} onClick={handleClichAddBtn}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        )}
                        {mode === 'REMOVE' && (
                            <button className={cx('action-btn', 'minus')} onClick={handleClichRemoveBtn}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        )}
                      
                    </div>
                </td>
            </tr>
        );
    }
}

export default Permission;

