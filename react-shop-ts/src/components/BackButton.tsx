import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './BackButton.module.css';

type BackButtonProps = {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
};

export const BackButton = ({ onClick, className = '', children = 'Назад' }: BackButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(-1); // Возврат на предыдущую страницу по умолчанию
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`${styles.button} ${className}`}
        >
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
            {children}
        </button>
    );
};