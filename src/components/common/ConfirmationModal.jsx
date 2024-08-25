import Alert from "./Alert";
import PropTypes from "prop-types";

const ConfirmationModal = ({ closeConfirmationModal, showConfirmation, handleDelete }) => {
  return (
    <div
      className={`w-full h-screen bg-black/70 ${showConfirmation ? 'flex' : 'hidden'} items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0 px-5`}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5 min-w-1/2">
        <Alert value="Pozisiyanı sildyiniz təqdirdə digər layihələrdə problem yaşanma ehtimalı var" type="danger"/>
        <p className="font-semibold">Qərarınızdan əminsinizmi? Silmək istəyirsinizmi?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleDelete}
            className="text-sm p-2 bg-red-600 rounded-lg font-semibold text-white min-w-[100px]"
          >
            Sil
          </button>
          <button
            onClick={closeConfirmationModal}
            className="text-sm p-2 border border-grey/40 rounded-lg font-semibold bg-white min-w-[100px]"
          >
            Ləğv et
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  showConfirmation: PropTypes.bool.isRequired,
  closeConfirmationModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ConfirmationModal;
