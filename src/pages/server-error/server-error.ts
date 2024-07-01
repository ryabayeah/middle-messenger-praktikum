import { ErrorLayout } from "../../layouts";

export const ServerErrorPage = () => new ErrorLayout({
    code: "500",
    message: "Мы уже фиксим",
  })
