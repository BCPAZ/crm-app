import AuthInput from "@/components/Auth/AuthInput";
import AuthButton from "@/components/Auth/AuthButton";
import GoBackButton from "@/components/Auth/GoBackButton";
const ForgotPassword = () => {
  return (
    <section className="flex justify-center">
      <div className="max-w-[352px] w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl leading-normal mb-5">Şifrə yeniləmə</h1>
        <p className="w-full text-center text-sm font-light mb-6">
        flegrei.crm.com adresindən şifrənizi yeniləmək üçün
        e-poçtunuzu qeyd edin.
        </p>

        <form className="w-full mb-5 flex flex-col gap-5" action="">
          <AuthInput label='e-poçt' placeholder="E-poçt daxil edin..." type='email' />
        </form>
        <AuthButton value='Göndər' />
        <GoBackButton />
      </div>
    </section>
  )
}

export default ForgotPassword