import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks";
import type { FormikHelpers } from "formik";
import { selectIsLoggedIn } from "features/auth/auth-selectors";
import { useSelector } from "react-redux";
import { BaseResponseType } from "common/types";
import { loginTC } from "features/auth/auth-reducer";

type FormValues = Omit<LoginParamsType, "captcha">;

type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export const Login = () => {
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
      } else if (values.password.length < 4) {
        return {
          password: "Must be more then 3 characters",
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

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel={"noreferrer"}>
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField {...formik.getFieldProps("email")} label={"Email"} margin={"normal"} />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
              <TextField {...formik.getFieldProps("password")} type={"password"} label={"Password"} margin={"normal"} />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
