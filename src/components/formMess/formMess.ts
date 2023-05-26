import Block from "../../core/Block";
import Input2 from "../input2/input2";
import template from "./formMess.hbs";

interface FormMessProps {
    events?: Record<string, (e: SubmitEvent) => void>;
}

export default class FormMess extends Block {
  constructor(props: FormMessProps) {
    super({...props});
  }

  init() {
    this.children.inputNewMess = new Input2({
          class: "chat_new-message_input",
          name: "message",
          type: "text",
          placeholder: "New message",
      });
    }

  render() {
    return this.compile(template, this.props );
  }
}
