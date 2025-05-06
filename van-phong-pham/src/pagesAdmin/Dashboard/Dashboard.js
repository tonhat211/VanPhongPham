import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
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
import Grid from '@mui/material/Grid';

import styles from './Dashboard.module.scss';
import { CustomInput, Modal, ImageUpload, EditorWithUseQuill as Editor, StarRating } from '~/pages/components';
import { formatMoney } from '~/utils';
import useI18n from '~/hooks/useI18n';
import { productApi } from '~/api';

const cx = classNames.bind(styles);
function Dashboard() {
    return (
        <div className={cx('wrapper')}>
            
        </div>
    );
}
export default Dashboard;
