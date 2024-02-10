import Handlebars from "handlebars";
import template from "./avatar.hbs?raw";
import "./avatar.scss";

interface IAvatarProps {
  src?: string
}

export const Avatar = ({ ...props }: IAvatarProps) => {
  return Handlebars.compile(template)({ ...props });
};
