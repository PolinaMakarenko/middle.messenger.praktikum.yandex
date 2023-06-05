import Block from "../../core/Block";
import template from "./avatar.hbs";

interface AvatarProps {
    class: string;
    img?: string;
}

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }
  render() {
    return this.compile(template, this.props);
  }
}
