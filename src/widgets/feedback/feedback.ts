import Handlebars from "handlebars";
import formInputTemplate from "./feedback.hbs?raw";
import "./feedback.scss";

interface FeedbackPropsI {
  value: string;
  isInvalid?: boolean
  class?: string
}

export const Feedback = (props: FeedbackPropsI) => {
  return Handlebars.compile(formInputTemplate)(props);
};
