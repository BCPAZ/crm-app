import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import GoBackButton from "@/components/Auth/GoBackButton";
const ForgotPassword = () => {
  return (
    <section className="flex justify-center">
      <div className="max-w-[352px] w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl leading-normal mb-5 text-center">Şifrə yeniləmə</h1>
        <p className="w-full text-center text-sm font-light mb-6">
        flegrei.crm.com adresindən şifrənizi yeniləmək üçün
        e-poçtunuzu qeyd edin.
        </p>

        <form className="w-full mb-5 flex flex-col gap-5" action="">
          <Input label='e-poçt' placeholder="E-poçt daxil edin..." type='email' />
        </form>
        <Button value='Göndər' />
        <GoBackButton path="/login"/>
      </div>
    </section>
  )
}

export default ForgotPassword