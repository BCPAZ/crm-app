import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import PropTypes from "prop-types";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
  { id: 6, name: "Katelyn Rohan" },
  { id: 7, name: "Katelyn Rohan" },
];

function Select({label, column}) {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <Listbox
      as="nav"
      className={"relative"}
      value={selectedPerson}
      onChange={setSelectedPerson}
    >
      <div className={`flex ${column ? 'flex-col' : 'flex-row items-center'} gap-2`}>
        {
          label && <label className="text-md font-light text-gray-500" htmlFor="">
          Date
        </label>
        }
        <ListboxButton className="w-full border border-grey/20 text-gray-500 text-start p-4 rounded-lg text-sm flex items-center justify-between">
          {selectedPerson.name}
          <MdKeyboardArrowDown size={20}/>
        </ListboxButton>
      </div>
      <ListboxOptions
        className="p-4 bg-white shadow-lg absolute top-[100%] h-[250px] overflow-y-scroll z-20 left-0 w-full outline-none rounded-xl"
      >
        {people.map((person) => (
          <ListboxOption
            key={person.id}
            value={person}
            className="data-[focus]:bg-blue-100 p-2 rounded-md text-sm "
          >
            {person.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

Select.propTypes = {
  label : PropTypes.string,
  column : PropTypes.bool
}

export default Select;
