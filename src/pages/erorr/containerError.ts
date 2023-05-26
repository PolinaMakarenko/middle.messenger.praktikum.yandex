import Block from "../../core/Block";
import template from "./containerError.hbs";
import Link from "../../components/link/link";

import "./erorrStyle.scss";
import MyFile from './500Erorr.png'
// type glf = "../../../static/404Erorr.png"

interface ErrorContProps {
    erorrNumber?: string;
    erorrText?: string;
    erorrPic?: string ;
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

