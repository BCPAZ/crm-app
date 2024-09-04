import Alert from "@/components/common/Alert";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import key from "@/assets/images/key-front-color.png";
const ChangePassword = () => {
  return (
    <section className="w-full h-full py-10">
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Şifrəni dəyişdirmək</h1>
        <div className="grid md:grid-cols-2 place-items-center">
          <div className="mt-10 flex flex-col gap-5 w-full">
            <Alert />
            <Input
              type="password"
              label="Yeni şifrə"
              placeholder="Yeni şifrəni daxil edin"
            />
            <Input
              type="password"
              label="Yeni şifrəni təsdiqi"
              placeholder="Yeni şifrəni təsdiqləyin"
            />
            <Button value="Şifrəni dəyişin" />
          </div>
          <div className="md:flex hidden items-center justify-center">
            <img className="w-[400px]" src={key} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
