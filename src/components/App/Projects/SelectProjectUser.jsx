import Alert from "@/components/common/Alert";
import CustomButton from "@/components/common/CustomButton";
import Select from "@/components/common/Select";
import PropTypes from "prop-types";


const SelectUserProject = ({showModal, closeModal}) => {
   return (
    <div
      className={`w-full h-screen bg-black/70 ${
        showModal ? "flex" : "hidden"
      } items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0`}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5 min-w-[50%]">
        <h1 className="text-xl font-semibold">
          İstifadəçi əlavə edin
        </h1>
        <Alert
          type="primary"
          value="Alert burdadı"
        />
        <Select
          label="İstifadəçi seçin"
          type="text"
          placeholder="İstifadəçini seçin"
          absolute
          column
        />
        <Select
          label="Pozisiya adı"
          type="text"
          placeholder="Pozisiya əlavə edin"
          absolute
          column
        />
        <div className="flex justify-end gap-3">
          <CustomButton
            simple
            value='Seç'
          />
          <button
            onClick={closeModal}
            className="text-sm p-2 border border-grey/40 rounded-lg font-semibold bg-white"
          >
            Ləğv et
          </button>
        </div>
      </div>
    </div>
  );
};

SelectUserProject.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  position: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default SelectUserProject;
