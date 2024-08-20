import * as Yup from "yup";

export const authSchema = Yup.object().shape({
  email : Yup.string()
  .required('Email daxil etmək mütləqdir!')
  .email('Yanlış email adresi'),
  password : Yup.string()
  .min(8 , "Şifrə minimum 8 simvol olmalıdır.")
  .required('Şifrə daxil etmək mütləqdir.')
})