'use client';

import styles from '../styles/CheckList.module.scss';

interface CheckboxProperties {
	isChecked?: boolean;
	onClick?: () => void;
}

const Checkbox = ({ isChecked = false, onClick }: CheckboxProperties) => {
	return (
		<div
			className={`${styles['check-list__item__input']} ${
				isChecked ? styles['check-list__item__input--checked'] : ''
			}`}
			onClick={onClick}
			role={onClick ? 'checkbox' : undefined}
			aria-checked={onClick ? isChecked : undefined}
			tabIndex={onClick ? 0 : undefined}
		/>
	);
};

export default Checkbox;
