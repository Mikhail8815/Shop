import { useForm } from 'react-hook-form';
import { setDeliveryData } from './checkoutSlice';
import type { DeliveryData } from './types';
import { useAppDispatch } from '../../hooks';

export const DeliveryForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<DeliveryData>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: DeliveryData) => {
    dispatch(setDeliveryData(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('firstName', { required: 'Обязательное поле' })}
        placeholder="Имя"
      />
      {errors.firstName && <span>{errors.firstName.message}</span>}

      <input
        {...register('lastName', { required: 'Обязательное поле' })}
        placeholder="Фамилия"
      />

  
      <button type="submit">Продолжить</button>
    </form>
  );
};
vc