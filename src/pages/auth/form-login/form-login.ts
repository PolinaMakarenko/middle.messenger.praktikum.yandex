import Block from "../../../core/Block";
import template from "./form-login.hbs";
import Input from "../../../components/input/input";
import Buttons from "../../../components/button/button";
import Link from "../../../components/link/link";
import "../authStyle.scss";
import {focusout, focusin, submit } from "../../../core/Validation";

interface FormLoginProps {
  title?: string;
}

export default class FormLogin extends Block {
  constructor(props?: FormLoginProps) {
    super({ ...props,
      events: {submit},
    });
  }

  init() {
    this.children.inputLogin = new Input({
      class: "login-form__login-input",
      name: "login",
      label:"Login:",
      type: "text",
      placeholder: "",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputPassword = new Input({
        class: "login-form__password-input",
        name: "password",
        label:"Password:",
        type: "password",
        placeholder: "",
        events: {
          focusin,
          focusout,
        },
    });
    this.children.buttonForm = new Buttons({
        class: "login-form__submit button",
        label: "Sign in",
    });
    this.children.link = new Link({
        href: "/registration",
        class: "link-enter",
        label: "Registration",
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}

