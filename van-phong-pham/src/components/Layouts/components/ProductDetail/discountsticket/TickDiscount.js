import React, { useState } from 'react';
import './TickDiscount.scss'
import useI18n from '~/hooks/useI18n';

function DiscountItem({ title, condition, code, expiration, t }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        if (isCopied) {
            alert(t('tickDiscount.alert'));
        } else {
            navigator.clipboard.writeText(code)
                .then(() => setIsCopied(true))
                .catch(err => console.error(t('tickDiscount.err') + ': ', err));
        }
    };

    return (
        <div className="tickDiscount1">
            <div className="tickDiscount_left">
                <h4>{t(title)}</h4>
                <p>{t(condition)}</p>
                <p>{t('tickDiscount.code')}: <strong>{t(code)}</strong></p>
                <p>{t(expiration)}</p>
            </div>
            <div className="tickDiscount_right">
                <div className="tickDiscount_right1">{t('tickDiscount.conditions')}</div>
                <div className="tickDiscount_right2" onClick={handleCopyClick}>
                    {isCopied ? t('tickDiscount.copied') : t('tickDiscount.copy')}
                </div>
            </div>
        </div>
    );
}

function TickDiscount() {
    const { t, lower } = useI18n();

    return (
        <div className="right_2">
            <div className="right2_container">
                <DiscountItem
                    title="tickDiscount.discount1Title"
                    condition="tickDiscount.discount1Condition"
                    code="tickDiscount.discount1Code"
                    expiration="tickDiscount.expiration"
                    t={t}
                />
                <DiscountItem
                    title="tickDiscount.discount2Title"
                    condition="tickDiscount.discount2Condition"
                    code="tickDiscount.discount2Code"
                    expiration="tickDiscount.expiration"
                    t={t}
                />
                <DiscountItem
                    title="tickDiscount.discount3Title"
                    condition="tickDiscount.discount3Condition"
                    code="tickDiscount.discount3Code"
                    expiration="tickDiscount.expiration"
                    t={t}
                />
            </div>
        </div>
    );
}

export default TickDiscount;