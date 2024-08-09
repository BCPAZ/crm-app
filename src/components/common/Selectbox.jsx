import { Field, Select } from '@headlessui/react';
import { MdKeyboardArrowDown } from "react-icons/md";
import PropTypes from "prop-types";
import clsx from 'clsx';

export default function Selectbox({outline}) {
  return (
    <div className="w-full max-w-md">
      <Field>
        <div className="relative">
          <Select
            className={clsx(
              `mt-3 block w-full appearance-none rounded-lg border-none ${outline ? 'text-black border border-grey/20' : 'bg-secondary text-white'} py-1.5 px-3 text-sm`,
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

Selectbox.propTypes = {
  outline : PropTypes.bool
}
