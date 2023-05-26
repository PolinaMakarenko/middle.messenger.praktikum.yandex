import Block from "../../core/Block";
import template from "./input.hbs";
import "./input.scss";

interface InputProps {
    class?: string;
    name?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    inputValue?: string;
    events?: Record<string, (e: InputEvent) => void>;
    errorMessage?: string;
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }
  
  render() {
    return this.compile(template, { ...this.props });
  }
}
