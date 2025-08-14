import { useForm } from 'react-hook-form';
import {setDeliveryData} from './checkoutSlice';
import type { DeliveryData } from './types';
import {useAppDispatch, useAppSelector} from '../../hooks';
import styles from './DeliveryForm.module.css';
import {useEffect} from "react";
import {BackButton} from "../../components/BackButton.tsx";
import {useNavigate} from "react-router-dom";

export const DeliveryForm = () => {
    const navigate = useNavigate();
    const { delivery } = useAppSelector(state => state.checkout);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DeliveryData>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: DeliveryData) => {
    dispatch(setDeliveryData(data));
  };

    useEffect(() => {
        if (delivery) {
            reset(delivery);
        }
    }, [delivery, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <BackButton
            onClick={() => navigate('/')} // Переход на главную страницу
            className={styles.backButton}
        />
        <div className={styles.form}>
            <input
                {...register('firstName', {required: 'Обязательное поле'})}
                placeholder="Имя"
                className={styles.input}
            />
            {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}

            <input
                {...register('lastName', {required: 'Обязательное поле'})}
                placeholder="Фамилия"
                className={styles.input}
            />
            {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
            <input
                {...register('city', {required: 'Обязательное поле'})}
                placeholder="Город"
                className={styles.input}
            />
            {errors.city && <span className={styles.error}>{errors.city.message}</span>}
            <input
                {...register('address', {required: 'Обязательное поле'})}
                placeholder="Адрес"
                className={styles.input}
            />
            {errors.address && <span className={styles.error}>{errors.address.message}</span>}
            <input
                {...register('postalCode', {required: 'Обязательное поле'})}
                placeholder="Индекс"
                className={styles.input}
            />
            {errors.postalCode && <span className={styles.error}>{errors.postalCode.message}</span>}
            <input
                {...register('phone', {required: 'Обязательное поле'})}
                placeholder="Телефон"
                className={styles.input}
            />
            {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
            <input
                {...register('email', {required: 'Обязательное поле'})}
                placeholder="E-mail"
                className={styles.input}
            />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <button type="submit" className={styles.submitButton}>Продолжить</button>
    </form>
  );
};