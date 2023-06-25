import Block from "../../core/Block";
import template from "./button.hbs";

interface ButtonProps {
  class?: string;
  label?: string;
  events?: Record<string, (e: InputEvent) => void>;
}

export default class Buttons extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
