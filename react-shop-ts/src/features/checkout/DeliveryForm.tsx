import { useForm } from 'react-hook-form';
import { setDeliveryData } from './checkoutSlice';
import type { DeliveryData } from './types';
import { useAppDispatch } from '../../hooks';
import styles from './DeliveryForm.module.css';

export const DeliveryForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<DeliveryData>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: DeliveryData) => {
    dispatch(setDeliveryData(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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