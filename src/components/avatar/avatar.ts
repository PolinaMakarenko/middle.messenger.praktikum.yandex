import Block from "../../core/Block";
import template from "./avatar.hbs";
import Main from "../../../static/Main.png";

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
