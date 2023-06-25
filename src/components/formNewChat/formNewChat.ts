import Block from "../../core/Block";
import Input2 from "../input2/input2";
import template from "./formNewChat.hbs";

interface FormMessProps {
    events?: Record<string, (e: SubmitEvent) => void>;
}

export default class FormNewChat extends Block {
  constructor(props: FormMessProps) {
    super({...props});
  }

  init() {
    this.children.inputNameChat = new Input2({
          class: "chat_new-message_input",
          name: "title",
          type: "text",
          placeholder: "Chat name",
      });
    }

  render() {
    return this.compile(template, this.props );
  }
}
