import { instance } from "common/api";
import { BaseResponseType } from "common/types/commonTypes";

export const authApi = {
  login(payload: LoginParamsType) {
    return instance.post<BaseResponseType<{ userId: number }>>(`auth/login`, payload);
  },
  logout() {
    return instance.delete<BaseResponseType>(`auth/login`);
  },
  me() {
    return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("/auth/me");
  },
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};
