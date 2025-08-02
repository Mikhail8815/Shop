import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
            className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors ${className}`}
        >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            {children}
        </button>
    );
};