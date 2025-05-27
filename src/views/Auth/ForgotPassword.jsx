import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import GoBackButton from "@/components/Auth/GoBackButton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgotPasswordMutation } from "@/data/services/authService";
import { useEffect } from "react";
import useToast from "@/hooks/useToast";
import { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import useSubdomain from "@/hooks/useSubdomain";

const ForgotPassword = () => {
  const subdomain = useSubdomain();

  const [handleForgotPassword, { isLoading, isError, isSuccess }] =
    useForgotPasswordMutation();
  const { showToast } = useToast();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string()
          .required("Email daxil etmək mütləqdir!")
          .email("Yanlış email adresi"),
      })
    ),
  });

  const onSubmit = (data) => {
    const forgotPasswordData = {
      subdomain,
      email: data.email,
    };
    handleForgotPassword(forgotPasswordData);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      showToast("Mail göndərildi", "success");
    }
  }, [isSuccess, showToast]);

  useEffect(() => {
    if (isError) {
      showToast("Xəta baş verdi", "error");
    }
  }, [isError, showToast]);

  return (
    <section className="flex justify-center">
      <Toaster />
      <div className="max-w-[352px] w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl leading-normal mb-5 text-center">
          Şifrə yeniləmə
        </h1>
        <p className="w-full text-center text-sm font-light mb-6">
          flegrei.crm.com adresindən şifrənizi yeniləmək üçün e-poçtunuzu qeyd
          edin.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mb-5 flex flex-col gap-5"
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="E-poçt"
                placeholder="E-poçt daxil edin..."
                type="email"
                error={errors.email?.message}
              />
            )}
          />
          <Button isLoading={isLoading} type="submit" value="Göndər" />
        </form>
        <GoBackButton path="/login" />
      </div>
    </section>
  );
};

export default ForgotPassword;
