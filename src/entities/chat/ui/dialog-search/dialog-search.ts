import { Input } from "../../../../shared/ui";
import "./dialog-search.scss";

interface DialogSearchProps extends CompileOptions {
  onChange: (value: string) => void;
}

export class DialogSearch extends Input {
  constructor({ onChange }: DialogSearchProps) {
    super({
      id: "display_name",
      name: "search",
      type: "text",
      class: "search",
      placeholder: "Поиск",
      onChange: (e: Event) => {
        const target = e.target as HTMLInputElement;
        onChange(target.value || "");
      },
    });
  }
}
