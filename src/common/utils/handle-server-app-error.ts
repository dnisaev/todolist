import { BaseResponseType } from "common/types/common.types";
import { Dispatch } from "redux";
import { setAppError, setAppStatus } from "app/appSlice";

/**
 * Обработчик ошибок с сервера.
 * @template D - тип данных ответа от сервера.
 * @param {BaseResponseType<D>} data - данные ответа от сервера.
 * @param {Dispatch} dispatch - функция диспетчера для отправки действий Redux.
 * @param {boolean} isShowGlobalError - флаг, указывающий на необходимость отображения глобальной ошибки. По умолчанию true.
 * @returns {void} - void
 */
export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
  isShowGlobalError: boolean = true,
): void => {
  // этот блок отработает в случае если у нас глобал ошибка true
  if (isShowGlobalError) {
    if (data.messages.length) {
      dispatch(setAppError({ error: data.messages[0] }));
    } else {
      dispatch(setAppError({ error: "Some error occurred" }));
    }
  }
  dispatch(setAppStatus({ status: "failed" }));
};
