import SecondInput from "@/components/common/SecondInput"
import Button from "@/components/common/Button"
import SelectUserProject from "@/components/App/Projects/SelectProjectUser"
import CustomButton from "@/components/common/CustomButton"
import { useState } from "react"
const CreateProject = () => {
  const [showModal , setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false);
  }
  return (
    <section className="w-full h-full py-10">
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Proyekt yarat</h1>
        <div className="flex flex-col gap-4 md:w-1/2 w-full h-full mt-10">
          <SecondInput column label="* Proyekt adı" placeholder="Proyekt adını daxil edin..."/>
          <SecondInput column label="* Proyektin kodu" placeholder="Proyekt kodunu daxil edin..."/>
          <CustomButton functionality={openModal} value="İstifadəçi seç"/>
          <SelectUserProject showModal={showModal} closeModal={closeModal} />
          <div className="w-fit mt-3">
            <Button value="Create project"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateProject