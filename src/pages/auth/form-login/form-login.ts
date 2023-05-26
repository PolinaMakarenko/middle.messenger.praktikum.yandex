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
      events: {
        submit
        // submit: (event) => {
        //   this.onSubmitForm(event);
        // },
        // submit: (e: FormDataEvent) => this.dataLog(e),
        } });
  }
  // events: {
  //   submit: (e: FormDataEvent) => this.dataLog(e),
  //   },
  // onSubmitForm(event) {
  //   event?.preventDefault()
  //   console.log(event.target)

  // }
  // dataLog(e: Event) {
    // e.preventDefault();
    // const formData = new FormData(e.target as HTMLFormElement);
    // const name = formData.get('login')
    // eslint-disable-next-line no-console
    // console.log(e.target.value);
    // eslint-disable-next-line no-console
  // }

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

