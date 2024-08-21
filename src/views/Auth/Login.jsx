import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useLoginMutation } from '@/data/services/authService';
import useToast from '@/hooks/useToast';
import { authSchema } from '@/schema/authSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [handleLogin, { isLoading, isError, isSuccess }] = useLoginMutation();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema),
  });

  const onSubmit = (data) => {
    const loginData = {
      subdomain: 'flegri',
      email: data.email,
      password: data.password
    };

    handleLogin(loginData).unwrap()
      .then(() => {
        navigate('/');
        reset();
      })
      .catch((error) => {
        console.error('Login failed:', error);
        showToast('Giriş uğursuz oldu! Yenidən cəhd edin', 'error');
      });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast('Giriş uğurlu başa çatdı', 'success');
    }
  }, [isSuccess, showToast]);

  useEffect(() => {
    if (isError) {
      showToast('Giriş uğursuz oldu! Yenidən cəhd edin', 'error');
    }
  }, [isError, showToast]);

  return (
    <section className='flex justify-center'>
      <Toaster />
      <div className='max-w-[352px] w-full flex flex-col justify-center items-center'>
        <h1 className='font-bold text-2xl leading-normal mb-5 text-center'>Giriş et</h1>
        <p className='max-w-[196px] text-center text-sm font-light mb-6'>
          flegrei şirkətindən sizə verilən e-poçt və şifrə ilə giriş edin.
        </p>
        <form
          className='w-full mb-5 flex flex-col gap-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='email'
                placeholder='Email adresinizi daxil edin...'
                label='E-poçt'
                disabled={isLoading}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='password'
                placeholder='Şifrənizi daxil edin...'
                label='Şifrə'
                disabled={isLoading}
                error={errors.password?.message}
              />
            )}
          />
          <Link
            to={'/forgot-password'}
            className='text-end w-full text-sm font-base underline text-secondary mb-5'
          >
            Şifrəmi unutdum
          </Link>
          <Button value='Giriş et' type='submit' isLoading={isLoading} />
        </form>
      </div>
    </section>
  );
};

export default Login;
