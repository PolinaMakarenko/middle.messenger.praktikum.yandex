import Block from "../../../core/Block";
import Link from "../../../components/link/link";
import template from "./pChangeFoto.hbs";
import "../profileStyle.scss";
import Buttons from "../../../components/button/button";
import Input from "../../../components/input/input";
import UserController from "../../../controlers/UserController";
// import { submit } from "../../../core/Validation";

interface ProfileChangeInfoProps {
  title?: string;
}

export default class ProfileChangeFoto extends Block {
  constructor(props?: ProfileChangeInfoProps) {
    super({ ...props,
      events: { submit },
  });
  }

  init() {
    this.children.inputAvatar = new Input({
      class: "container__info_about-user_info",
      name: "avatar",
      label:"Avatar:",
      type: "file",
      placeholder: "",
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


const submit = (event: Event): void =>{
  event.preventDefault();
  const allFormInputs  = document.querySelector("input");
  UserController.changeAvatar(allFormInputs.files[0])
  // const target = event.target
  // const gt = typeof(allFormInputs.files[0])
  // console.log(allFormInputs.files[0])


  // const fileName = allFormInputs.files[0];
  // const formData = new FormData();
  // formData.append("avatar", fileName);

//  (event.target as HTMLFormElement ).reset()
}
