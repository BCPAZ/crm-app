import Alert from "./Alert";
import PropTypes from "prop-types";

const ConfirmationModal = ({ closeConfirmationModal, showConfirmation, handleDelete, title }) => {
  return (
    <div
      className={`w-full h-screen bg-black/70 ${showConfirmation ? 'flex' : 'hidden'} items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0 px-5`}
    >
      <div className="bg-white p-3 rounded-xl shadow-lg flex flex-col gap-5 min-w-1/2">
        <Alert value={title} type="danger"/>
        <p className="font-medium text-sm">Qərarınızdan əminsinizmi? Silmək istəyirsinizmi?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleDelete}
            className="text-xs p-2 bg-red-600 rounded-md font-medium text-white min-w-[100px] flex items-center justify-center gap-2"
          >
            Sil
          </button>
          <button
            onClick={closeConfirmationModal}
            className="text-xs p-2 border border-grey/40 rounded-md font-medium bg-white min-w-[100px]"
          >
            Ləğv et
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  showConfirmation: PropTypes.bool,
  closeConfirmationModal: PropTypes.func,
  handleDelete: PropTypes.func,
  isLoading : PropTypes.bool,
  title : PropTypes.string
};

export default ConfirmationModal;
