import { ErrorLayout } from "../../layouts";
import { APP_PATH } from "../../shared/constants";

export const NotFoundPage = () =>
  new ErrorLayout({
    code: "404",
    message: "Странно, но такой страницы не существует",
    backPath: APP_PATH.PROFILE,
    textBackPath: "Вернуться",
  });
