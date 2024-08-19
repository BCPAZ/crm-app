import SecondInput from "@/components/common/SecondInput"
import Button from "@/components/common/Button"
const CreateProject = () => {
  return (
    <section className="w-full h-full py-10">
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Create project</h1>
        <div className="flex flex-col gap-4 md:w-1/2 w-full h-full mt-10">
          <SecondInput column label="* Name project" placeholder="Enter project name..."/>
          <SecondInput column label="* Code project" placeholder="Enter project name..."/>
          <div className="w-fit mt-3">
            <Button value="Create project"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateProject