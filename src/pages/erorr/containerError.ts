import Block from "../../core/Block";
import template from "./containerError.hbs";
import Link from "../../components/link/link";

import "./erorrStyle.scss";
import Erorr404 from "../../../static/404Erorr.png";
import Erorr500 from "../../../static/500Erorr.png";
import Avatar from "../../components/avatar/avatar";

// type glf = "../../../static/404Erorr.png"

interface ErrorContProps {
    erorrNumber: string;
    erorrText?: string;
    // erorrPic?: string ;
    img?: string
  }

export default class containerError extends Block {
  constructor(props?: ErrorContProps) {
    super({ ...props });
  }

  init() {
    this.children.link = new Link({
      href: "/",
      class: "link-enter",
      label: "Go to chats",
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}

