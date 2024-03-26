import { useSelector } from "react-redux";
import { useAppDispatch } from "common/hooks";
import { type FormikHelpers, useFormik } from "formik";
import { loginTC, selectIsLoggedIn } from "features/auth/model/authSlice";
import { BaseResponseType } from "common/types";

type FormValues = Omit<LoginParamsType, "captcha">;

type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export const useLogin = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values: FormValues) => {
      if (!values.email) {
        return {
          email: "Email is required",
        };
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return {
          email: "Invalid email address",
        };
      }

      if (!values.password) {
        return {
          password: "Password is required",
        };
      } else if (values.password.length < 3) {
        return {
          password: "Must be 3 characters or more",
        };
      }
    },
    onSubmit: (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
      formik.resetForm();
      dispatch(loginTC(values))
        .unwrap()
        .catch((err: BaseResponseType) => {
          console.log(err);
          if (err.fieldsErrors) {
            err.fieldsErrors.forEach((el) => {
              formikHelpers.setFieldError(el.field, el.error);
            });
          }
        });
    },
  });
  return {
    formik,
    isLoggedIn,
  };
};
