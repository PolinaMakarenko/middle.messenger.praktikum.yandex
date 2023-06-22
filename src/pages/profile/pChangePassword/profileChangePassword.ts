import Block from "../../../core/Block";
import Link from "../../../components/link/link";
import template from "./profileChangePassword.hbs";
import "../profileStyle.scss";
import Buttons from "../../../components/button/button";
import Input from "../../../components/input/input";
import { checkInputValue, focusin, focusout } from "../../../core/Validation";
import { withStore } from "../../../core/Store";
import UserController from "../../../controlers/UserController";
import { PasswordData } from "../../../api/types";
import  Router  from "../../../core/Rourer";


interface ProfileChangePasswordProps {
  title?: string;
}

export default class ProfileChangePassword extends Block {
  constructor(props?: ProfileChangePasswordProps) {
    super({ ...props,
      events: { submit },
  });
  }

  init() {
    this.children.inputOldPassword = new Input({
        class: "container__info_about-user_info",
        name: "oldPassword",
        label:"Old password:",
        type: "password",
        placeholder: "",
        events: {
          focusin,
          focusout,
        },
    });
    this.children.inputNewPassword = new Input({
        class: "container__info_about-user_info",
        name: "newPassword",
        label:"New password:",
        type: "password",
        placeholder: "",
        events: {
          focusin,
          focusout,
        },
    });
    this.children.inputReapatPassword = new Input({
        class: "container__info_about-user_info",
        name: "newPassword2",
        label:"Repeat new password:",
        type: "password",
        placeholder: "",
        events: {
          focusin: (event: InputEvent)=> chekPass(event),
          focusout: (event: InputEvent)=> chekPass(event),

        },
    });

    const chekPass = (event: InputEvent) => {
      const newPassRepeat = event.target as HTMLInputElement
      const newPass = (document.getElementById("newPassword") as HTMLInputElement).value
      const parent = newPassRepeat.parentElement;
      const error = parent?.querySelector(".error-message");
      (newPassRepeat.value == newPass)? error!.textContent ="" : error!.textContent = "Пароли должна совпадать"
    }

    this.children.button = new Buttons({
        class: "container__info_about-user_button",
        label: "Save",
    });
    this.children.linkProfile = new Link({
      href: "/profile",
      class: "link-enter",
      label: "Go to Profil",
      events: { click:  ()=> Router.go("/profile")}
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}


const withUser = withStore((state) => ({ ...state.user }));

export const ProfileChangePasswUser = withUser(ProfileChangePassword);


export const submit = (event: Event): void =>{
  event.preventDefault();
  const allFormInputs = document.querySelectorAll("input");
  const data = {};
  const finishInputs = (Array.from(allFormInputs)).filter(el => el.name != "newPassword2")
  finishInputs.forEach((input: HTMLInputElement) => {
    (checkInputValue(input)) ? data[input.name] = input.value : ""    
  });
  (finishInputs.length == Object.keys(data).length) 
  ? ( console.log(data), 
  UserController.chahgePassword(data as PasswordData)): ""
//  (event.target as HTMLFormElement ).reset()
}
