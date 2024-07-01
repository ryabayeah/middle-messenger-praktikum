import { ErrorLayout } from "../../layouts";

export const NotFoundPage = () => new ErrorLayout({
    code: "404",
    message: "Странно, но такой страницы не существует",
  })
