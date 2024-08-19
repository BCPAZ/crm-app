import Alert from "@/components/common/Alert"
import CustomButton from "@/components/common/CustomButton";
import Input from "@/components/common/Input"
import Select from "@/components/common/Select";
import PropTypes from "prop-types";

const QuickUpdateModal = ({showModal, closeModal}) => {
  return (
    <div className={`w-full h-screen bg-black/70 ${showModal ? 'flex' : 'hidden'} items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0`}> 
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5">
        <h1 className="text-xl font-semibold">Quick Update</h1>
        <Alert />
        <div className="w-1/2">
          <Select absolute column label="Status"/>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Input label="Full name" type="text" placeholder="Enter fullname"/>
          <Input label="Email address" type="text" placeholder="Enter email"/>
          <Input label="Phone number" type="text" placeholder="Enter phone number"/>
          <Select absolute column label="Company"/>
          <Input label="Address" type="text" placeholder="Enter address"/>
          <Input label="Zip/Code" type="text" placeholder="Enter Zip Code"/>
          <Input label="Password" type="password" placeholder="Enter password"/>
          <Select absolute column label="Role"/>
        </div>
        <div className="flex justify-end gap-3">
          <CustomButton simple value="Update" />
          <button onClick={closeModal} className="text-sm p-2 border border-grey/40 rounded-lg font-semibold bg-white">Cancel</button>
        </div>
      </div>
    </div>
  )
}

QuickUpdateModal.propTypes = {
  showModal : PropTypes.bool,
  closeModal : PropTypes.func
}

export default QuickUpdateModal