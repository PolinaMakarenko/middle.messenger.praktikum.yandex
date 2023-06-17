import Block from "../../../core/Block";
import template from "./form-login.hbs";
import Input from "../../../components/input/input";
import Buttons from "../../../components/button/button";
import Link from "../../../components/link/link";
import "../authStyle.scss";
import {focusout, focusin, checkInputValue } from "../../../core/Validation";
import Router  from "../../../core/Rourer";
import AuthController from "../../../controlers/AuthController";
import { SignupData } from "../../../api/AuthAPI";


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
        // to: "/sign-up",
        href: "/registration",
        class: "link-enter",
        label: "Registration",
        // events: { click:  ()=> Router.go("/sign-up")}
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}

export const submit = (event: Event): void =>{
  event.preventDefault();
  const allFormInputs = document.querySelectorAll("input");
  const data = {};
  allFormInputs.forEach((input: HTMLInputElement) => {
      (checkInputValue(input)) ? data[input.name] = input.value : ""
  });
  (allFormInputs.length == Object.keys(data).length) 
  ? ( console.log(data), 
  AuthController.signin(data as SignupData)): ""
//  (event.target as HTMLFormElement ).reset()
}
