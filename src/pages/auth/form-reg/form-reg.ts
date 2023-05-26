import Block from "../../../core/Block";
import template from "./form-reg.hbs";
import Input from "../../../components/input/input";
import Buttons from "../../../components/button/button";
import Link from "../../../components/link/link";
import "../authStyle.scss";
import { focusin, focusout } from "../../../core/Validation";

interface FormRegProps {
  title?: string;
}

export default class FormReg extends Block {
  constructor(props?: FormRegProps) {
    super({ ...props,  events: {
        submit: (e: FormDataEvent) => this.ref(e),
        },
    });
  }
  ref(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // const name = formData.get('login')
    // eslint-disable-next-line no-console
    console.log(formData);
    // eslint-disable-next-line no-console
  }

  init() {
    this.children.inputEmail = new Input({
        class: "reg-form__email-input",
        name: "email",
        label:"Email:",
        type: "email",
        placeholder: "",
        events: {
          focusin,
          focusout,
        },
    });
    this.children.inputLogin = new Input({
        class: "reg-form__login-input",
        name: "login",
        label:"Login:",
        type: "text",
        placeholder: "",
        events: {
          focusin,
          focusout,
        },
    });
    this.children.inputName = new Input({
      class: "reg-form__first_name-input",
      name: "first_name",
      label:"Name:",
      type: "text",
      placeholder: "",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.Surname = new Input({
      class: "reg-form__second_name-input",
      name: "second_name",
      label:"Surname:",
      type: "text",
      placeholder: "",
    });
  this.children.inputPhone = new Input({
      class: "reg-form__phone-input",
      name: "phone",
      label:"Phone:",
      type: "tel",
      placeholder: "",
      events: {
        focusin,
        focusout,
      },
  });
  this.children.inputPassword = new Input({
      class: "reg-form__password-input",
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
        label: "Create profile",
    });
    this.children.link = new Link({
        href: "/login",
        class: "link-enter",
        label: "Sign in",
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}

