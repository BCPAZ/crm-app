import PropTypes from "prop-types";
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineChevronLeft } from "react-icons/hi";

const Pagination = ({ meta, onPageChange }) => {
    const { current_page, last_page } = meta;

    const handlePageChange = (page) => {
        if (page < 1 || page > last_page) return;
        onPageChange(page);
    };

    return (
        <div className="p-5 flex items-center gap-2 text-sm font-medium">
            <button 
                onClick={() => handlePageChange(current_page - 1)} 
                disabled={current_page === 1}
                className="p-2 flex items-center gap-1"
            >
                <HiOutlineChevronLeft />
                Geriyə
            </button>
            <span className="p-2">
                Səhifə {current_page} of {last_page}
            </span>
            <button 
                onClick={() => handlePageChange(current_page + 1)} 
                disabled={current_page === last_page}
                className="p-2 flex items-center gap-2"
            >
                İrəliyə
                <HiOutlineChevronRight />
            </button>
        </div>
    );
};

Pagination.propTypes = {
  meta : PropTypes.object,
  onPageChange : PropTypes.func
}

export default Pagination;
