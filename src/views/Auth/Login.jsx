import GoBackButton from '@/components/Auth/GoBackButton';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useLoginMutation } from '@/data/services/authService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [handleLogin, { isLoading, isError, isSuccess }] = useLoginMutation();

  // TODO: formike cevir :D
  const [form, setForm] = useState({
    subdomain: 'flegri',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handleLogin(form);
  };

  useEffect(() => {
    if (isSuccess) {
      // TODO: success handling
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      // TODO: error handling
    }
  }, [isError]);

  return (
    <section className='flex justify-center'>
      <div className='max-w-[352px] w-full flex flex-col justify-center items-center'>
        <h1 className='font-bold text-2xl leading-normal mb-5 text-center'>Giriş et</h1>
        <p className='max-w-[196px] text-center text-sm font-light mb-6'>
          flegrei şirkətindən sizə verilən e-poçt və şifrə ilə giriş edin.
        </p>
        <form className='w-full mb-5 flex flex-col gap-5' action=''>
          <Input
            type='email'
            placeholder='Email adresinizi daxil edin...'
            label='E-poçt'
            value={form.email}
            name='email'
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            type='password'
            placeholder='Şifrənizi daxil edin...'
            label='Şifrə'
            value={form.password}
            name='password'
            onChange={handleChange}
            disabled={isLoading}
          />
        </form>
        <Link
          to={'/forgot-password'}
          className='text-end w-full text-sm font-base underline text-secondary mb-5'
        >
          Şifrəmi unutdum
        </Link>
        <Button value='Giriş et' onClick={handleSubmit} />
        <GoBackButton />
      </div>
    </section>
  );
};

export default Login;
