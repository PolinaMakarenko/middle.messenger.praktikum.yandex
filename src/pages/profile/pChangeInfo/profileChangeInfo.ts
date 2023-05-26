import Block from "../../../core/Block";
import Link from "../../../components/link/link";
import template from "./profileChangeInfo.hbs";
import "../profileStyle.scss";
import Buttons from "../../../components/button/button";
import Input from "../../../components/input/input";
import { focusin, focusout } from "../../../core/Validation";

export default class ProfileChangeInfo extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.inputAvatar = new Input({
      class: "container__info_about-user_info",
      name: "avatar",
      label:"Avatar:",
      type: "file",
      placeholder: "",
    });
    this.children.inputEmail = new Input({
      class: "container__info_about-user_info",
      name: "email",
      label:"Email:",
      type: "email",
      placeholder: "",
      inputValue: "1234@gmail.com",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputLogin = new Input({
      class: "container__info_about-user_info",
      name: "login",
      label:"Login:",
      type: "text",
      placeholder: "",
      inputValue: "Lala",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputName = new Input({
      class: "container__info_about-user_info",
      name: "first_name",
      label:"Name:",
      type: "text",
      placeholder: "",
      inputValue: "Igor",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputSurname = new Input({
      class: "container__info_about-user_info",
      name: "second_name",
      label:"Surname:",
      type: "text",
      placeholder: "",
      inputValue: "Petrov",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputDisplayName = new Input({
      class: "container__info_about-user_info",
      name: "display_name",
      label:"Chat name:",
      type: "text",
      placeholder: "",
      inputValue: "LALA",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputPhone = new Input({
      class: "container__info_about-user_info",
      name: "phone",
      label:"Phone:",
      type: "tel",
      placeholder: "",
      inputValue: "+79098135633",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.button = new Buttons({
      class: "container__info_about-user_button",
      label: "Save",
    });
    this.children.linkProfile = new Link({
      href: "/profile",
      class: "link-enter",
      label: "Go to Profil",
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}

