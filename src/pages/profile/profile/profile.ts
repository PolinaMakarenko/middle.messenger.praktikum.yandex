import Block from "../../../core/Block";
import Link from "../../../components/link/link";
import template from "./profile.hbs";
import "../profileStyle.scss";


interface ProfileProps {
    email?: string;
    login?: string;
    name?: string ;
    surname?: string;
    phone?: string;
    chatName?: string;
  }

export default class Profile extends Block {
  constructor(props?: ProfileProps) {
    super({ ...props });
  }

  init() {
    this.children.linkInfo = new Link({
      href: "/ChangeInfo",
      class: "link-enter",
      label: "Change information",
    });
    this.children.linkPass = new Link({
        href: "/ChangePassword",
        class: "link-enter",
        label: "Change password",
    });
    this.children.linkLogout = new Link({
        href: "/",
        class: "link-enter",
        label: "LOGOUT",
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}

