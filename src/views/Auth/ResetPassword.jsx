import { Link } from "react-router-dom";
import AuthInput from "@/components/Auth/AuthInput";
import AuthButton from "@/components/Auth/AuthButton";
import GoBackButton from "@/components/Auth/GoBackButton";
const ResetPassword = () => {
  return (
    <section className="flex justify-center">
      <div className="max-w-[352px] w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl leading-normal mb-5 text-center">
          Yeni şifrə təyin et
        </h1>
        <p className="max-w-[196px] text-center text-sm font-light mb-6">
          Şifrənizi qeyd edərkən (A-Z,0-9 və simvollardan istifadə edin)
        </p>

        <form className="w-full mb-5 flex flex-col gap-5" action="">
          <AuthInput
            type="password"
            label="Şifrəniz"
            placeholder="Şifrənizi daxil edin..."
          />
          <AuthInput
            type="password"
            label="Şifrənizin təkrarı"
            placeholder="Şifrənizi təkrar daxil edin..."
          />
        </form>
        <Link
          to={"/forgot-password"}
          className="text-end w-full text-sm font-base underline text-secondary mb-5"
        >
          Şifrəmi unutdum
        </Link>
        <AuthButton value="Dəyişdir" />
        <GoBackButton />
      </div>
    </section>
  );
};

export default ResetPassword;
