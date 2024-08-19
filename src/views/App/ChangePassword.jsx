import Input from "@/components/common/Input"

const ChangePassword = () => {
  return (
    <section className="w-full h-full">
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Change password</h1>
        <div>
          <Input type="password" label="New password" placeholder="Enter new password" />
          <Input type="password" label="Confirm new password" placeholder="Confirm new password" />
        </div>
      </div>
    </section>
  )
}

export default ChangePassword