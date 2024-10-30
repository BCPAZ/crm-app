import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useLogoutMutation, useCurrentAccountQuery } from '@/data/services/accountService';

export default function ProfileCard() {
  const [logout] = useLogoutMutation();
  const { data: currentAccount } = useCurrentAccountQuery();
  const handleLogout = () => {
      logout();
  };
  return (
    <div className='relative overflow-hidden'>
      <Menu as='nav'>
        <MenuButton className='flex w-[35px] h-[35px] overflow-hidden border-2 border-gray-400/20 rounded-full items-center justify-center font-semibold text-white'>
          <img
            className='w-full h-full object-cover rounded-full object-center'
            src={ currentAccount?.avatar_url || "https://dentistry.co.uk/app/uploads/2020/11/anonymous-avatar-icon-25.png"}
            alt='User avatar'
          />
        </MenuButton>

        <MenuItems
          transition
          anchor='bottom end'
          className='w-52 flex flex-col !overflow-hidden max-h-60 shadow-lg relative right-0 mt-2 rounded-xl border bg-white p-1 text-sm font-medium text-black transition duration-100 ease-out focus:outline-none'
        >
          <div className='flex flex-col gap-1 p-4 border-b border-dashed'>
            <span className='text-sm text-black'>{currentAccount?.name || 'İstifadəçi adı'}</span>
            <span className='text-sm text-gray-500'>{currentAccount?.email || 'İstifadəçi emaili'}</span>
          </div>
          <div className='bg-secondary h-[100px] w-[100px] rounded-full blur-[50px] absolute -top-[25%] -right-[10%]'></div>
          <div className='border-b border-dashed py-2'>
            <MenuItem>
              <Link
                to='/'
                className='flex w-full items-center gap-2 rounded-lg px-4 py-3 hover:bg-grey/20'
              >
                Ana səhifə
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to='/change-password'
                className='flex w-full items-center gap-2 rounded-lg px-4 py-3 hover:bg-grey/20'
              >
                Şifrəmi dəyiş
              </Link>
            </MenuItem>
          </div>
          <MenuItem>
            <button onClick={handleLogout} className='text-red-600 rounded-lg px-4 py-3 hover:bg-grey/20 text-start mt-2'>Çıxış et</button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
