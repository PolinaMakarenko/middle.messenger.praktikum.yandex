import Block from "../../../core/Block";
import Link from "../../../components/link/link";
import template from "./profileChangePassword.hbs";
import "../profileStyle.scss";
import Buttons from "../../../components/button/button";
import Input from "../../../components/input/input";


// interface ProfileProps {
//     email?: string;
//     login?: string;
//     name?: string ;
//     surname?: string;
//     phone?: string;
//     chatName?: string;
//   }

export default class ProfileChangePassword extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.inputOldPassword = new Input({
        class: "container__info_about-user_info",
        name: "oldPassword",
        label:"Old password:",
        type: "password",
        placeholder: "",
    });
    this.children.inputNewPassword = new Input({
        class: "container__info_about-user_info",
        name: "newPassword",
        label:"New password:",
        type: "password",
        placeholder: "",
    });
    this.children.inputReapatPassword = new Input({
        class: "container__info_about-user_info",
        name: "newPassword2",
        label:"Repeat new password:",
        type: "password",
        placeholder: "",
    });
    this.children.button = new Buttons({
        class: "container__info_about-user_button",
        label: "Save",
    });
    this.children.linkProfile = new Link({
      href: "/",
      class: "link-enter",
      label: "Go to Profil",
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
