import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
export default function ProfileCard() {
  return (
    <div className="relative overflow-hidden">
      <Menu as='nav'>
        <MenuButton className="flex w-[40px] h-[40px] overflow-hidden p-2 border-2 border-gray-400/20 rounded-full items-center justify-center font-semibold text-white">
          <img
            className="w-full h-full object-cover object-center"
            src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
            alt=""
          />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 flex flex-col overflow-hidden max-h-60 shadow-lg absolute right-0 mt-2 rounded-xl border bg-white p-1 text-sm font-medium text-black transition duration-100 ease-out focus:outline-none"
        >
          <div className="flex flex-col gap-1 p-4 border-b border-dashed">
            <span className="text-sm text-black">Anar Anar</span>
            <span className="text-sm text-gray-500">anar@flegrei.ru</span>
          </div>
          <div className="bg-secondary h-[100px] w-[100px] rounded-full blur-[50px] absolute -top-[25%] -right-[10%]"></div>
          <div className="border-b border-dashed py-2">
            <MenuItem>
              <Link to="/" className="flex w-full items-center gap-2 rounded-lg px-4 py-3 hover:bg-grey/20">
                Home
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/change-password" className="flex w-full items-center gap-2 rounded-lg px-4 py-3 hover:bg-grey/20">
                Change password
              </Link>
            </MenuItem>
          </div>
          <MenuItem>
            <button className="text-red-600 p-4 text-start">Logout</button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
