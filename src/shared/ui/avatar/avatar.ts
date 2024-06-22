import Handlebars from "handlebars";
import template from "./avatar.hbs?raw";
import "./avatar.scss";

interface IAvatarProps {
  src?: string;
  isEditable?: boolean;
}

export const Avatar = ({ isEditable = false, ...props }: IAvatarProps) => {
	return Handlebars.compile(template)({ isEditable, ...props });
};
