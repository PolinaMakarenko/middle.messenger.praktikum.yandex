import Block from "../../../core/Block";
import Link from "../../../components/link/link";
import template from "./profileChangeInfo.hbs";
import "../profileStyle.scss";
import Buttons from "../../../components/button/button";
import Input from "../../../components/input/input";
import { checkInputValue, focusin, focusout } from "../../../core/Validation";
import { store, withStore } from "../../../core/Store";
import { UserDTO } from "../../../api/types";
import AuthController from "../../../controlers/AuthController";
import UserController from "../../../controlers/UserController";
import { SignupData } from "../../../api/AuthAPI";

// interface ProfileChangeInfoProps {
//   title?: string;
// }

interface EditProfilePageProps extends UserDTO {
  selector?: string;
  events?: Record<string, (args: any) => void>;
}

export default class ProfileChangeInfo extends Block {
  constructor(props?: any) {
    super({ ...props,
      events: { submit },
  });
  }

  init() {
    const { data } = store.getState().user;
    console.log(this.props)

    // this.children.inputAvatar = new Input({
    //   class: "container__info_about-user_info",
    //   name: "avatar",
    //   label:"Avatar:",
    //   type: "file",
    //   placeholder: "",
    // });



    this.children.inputEmail = new Input({
      class: "container__info_about-user_info",
      name: "email",
      label:"Email:",
      type: "email",
      placeholder: "",
      inputValue: data?.email,
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
      inputValue: data?.login,
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
      inputValue: data?.first_name,
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
      inputValue: data?.second_name,
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
      inputValue: data?.display_name,
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
      inputValue: data?.phone,
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

  protected componentDidUpdate(
    _oldProps: any,
    _newProps: any,
  ): boolean {
   
    Object.keys(_newProps).forEach((key) => {
      if (this.children[key] instanceof Input) {
        if (_newProps) {
          (this.children[key] as Input).setProps({
            value: _newProps[key as keyof UserDTO] as string,
          });
        }
      }
    });
    return false;
  }
    

 

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user.data }));

export const ProfileChangeInfoUser = withUser(ProfileChangeInfo);


export const submit = (event: Event): void =>{
  event.preventDefault();
  const allFormInputs = document.querySelectorAll("input");
  const data = {};
  allFormInputs.forEach((input: HTMLInputElement) => {
      (checkInputValue(input)) ? data[input.name] = input.value : ""
  });
  (allFormInputs.length == Object.keys(data).length) 
  ? ( console.log(data), 
  UserController.changeInfo(data as UserDTO)): ""
//  (event.target as HTMLFormElement ).reset()
}
