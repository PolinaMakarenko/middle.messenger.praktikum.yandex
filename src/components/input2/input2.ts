import Block from "../../core/Block";
import template from "./input2.hbs";

interface InputProps {
    class?: string;
    name?: string;
    type?: string;
    placeholder?: string;
}

export default class Input2 extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

