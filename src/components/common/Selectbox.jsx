import { Field, Select } from '@headlessui/react';
import { MdKeyboardArrowDown } from "react-icons/md";
import clsx from 'clsx';

export default function Selectbox() {
  return (
    <div className="w-full max-w-md">
      <Field>
        <div className="relative">
          <Select
            className={clsx(
              'mt-3 block w-full appearance-none rounded-lg border-none bg-secondary py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:-outline-offset-2',
              '*:text-black'
            )}
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="delayed">Delayed</option>
            <option value="canceled">Canceled</option>
          </Select>
          <MdKeyboardArrowDown
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white cursor-pointer"
          />
        </div>
      </Field>
    </div>
  )
}
