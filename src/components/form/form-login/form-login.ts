import Block from "../../../core/Block";
import template from "./form-login.hbs";
import Link from "../../link/link";
import Input from "../../input/input";
import Button from "../../button/button";

import "../authStyle.scss";

interface FormLoginProps {
  title?: string;
}

export default class FormLogin extends Block {
  constructor(props?: FormLoginProps) {
    super({ ...props,  events: {
        submit: (e: FormDataEvent) => this.dataLog(e),
        },
    });
  }
  dataLog(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // const name = formData.get('login')
    // eslint-disable-next-line no-console
    console.log(formData);
    // eslint-disable-next-line no-console
  }

  init() {
    this.children.inputLogin = new Input({
        class: "login-form__login-input",
        name: "password",
        label:"Login:",
        type: "text",
        placeholder: "",
    });
    this.children.inputPassword = new Input({
        class: "login-form__password-input",
        name: "login",
        label:"Password:",
        type: "password",
        placeholder: "",
    });
    this.children.buttonForm = new Button({
        class: "login-form__submit button",
        label: "Sign in",
    });
    this.children.link = new Link({
        href: "/",
        class: "link-enter",
        label: "Registration",
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}

