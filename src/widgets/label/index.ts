import Handlebars from "handlebars";
import labelTemplate from "./label.hbs?raw";
import "./label.scss";

interface InputProps {
  for: string
  value?: string;
}

export default ({ value = "", ...props }: InputProps) => {
  return Handlebars.compile(labelTemplate)({ ...props });
};
