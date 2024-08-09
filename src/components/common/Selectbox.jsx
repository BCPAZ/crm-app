import { Field, Select } from '@headlessui/react';
import PropTypes from "prop-types";
import clsx from 'clsx';

export default function Selectbox({outline}) {
  return (
      <Field>
        <div className="relative max-w-md">
          <Select
            className={clsx(
              `block w-full appearance-none rounded-lg ${outline ? 'text-black border border-grey/20' : 'bg-secondary text-white'} py-1.5 px-3 text-sm`,
              'focus:outline-none data-[focus]:-outline-offset-2',
              '*:text-black'
            )}
          >
            <option value="active">AZINTEST</option>
            <option value="paused">Paused</option>
            <option value="delayed">Delayed</option>
            <option value="canceled">Canceled</option>
          </Select>
        </div>
      </Field>
  )
}

Selectbox.propTypes = {
  outline : PropTypes.bool
}
