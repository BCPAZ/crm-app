import PropTypes from "prop-types";
import { IoSearchOutline } from "react-icons/io5";
import Button from "./Button";

const Searchbar = ({ simple, onChange }) => {
  return (
    <div className="flex justify-between items-center gap-4 w-auto">
      <div
        className={`flex items-center p-4 gap-5 rounded-lg border border-grey/20 ${
          simple ? "w-full" : "w-[90%]"
        }`}
      >
        <IoSearchOutline size={18} color="gray" />
        <input
          name="search"
          onChange={onChange}
          className="bg-transparent w-full h-full outline-none border-none"
          placeholder="Axtarış"
          type="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          role="searchbox"
          aria-label="Axtarış"
        />
      </div>
      {!simple ? (
        <div className="flex flex-1">
          <Button value="Search" />
        </div>
      ) : null}
    </div>
  );
};

Searchbar.propTypes = {
  simple: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Searchbar;
