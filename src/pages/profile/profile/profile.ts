import Block from "../../../core/Block";
import Link from "../../../components/link/link";
import template from "./profile.hbs";
import "../profileStyle.scss";
import Avatar from "../../../components/avatar/avatar";
import constAvatar from "../../../../static/Main.png"
import { store, withStore } from "../../../core/Store";
import AuthController from "../../../controlers/AuthController";
import  Router  from "../../../core/Rourer";
import Buttons from "../../../components/button/button";


interface ProfileProps {
    email?: string;
    login?: string;
    name?: string ;
    surname?: string;
    phone?: string;
    chatName?: string;
    first_name?: string;
    second_name?: string;
    display_name?: string

  }

export default class Profile extends Block {
  constructor(props?: ProfileProps) {
    super({ ...props,
  });
  }


  init() {
    const { data } = store.getState().user;
    const checAvatar = (data?.avatar == undefined) ? constAvatar : "https://ya-praktikum.tech/api/v2/resources"+data.avatar


    this.setProps({
      email: data?.email,
      login: data?.login, 
      name: data?.first_name, 
      surname: data?.second_name ,
      phone: data?.phone,
      chatName: data?.display_name,

    });

    this.children.avatar = new Avatar({
      class: "container__info_foto_img",
      img: checAvatar,
    });
    this.children.linkInfo = new Link({
      href: "/changeInfo",
      class: "link-enter",
      label: "Change information",
      events: { click:  ()=> Router.go("/changeInfo")}
    });
    this.children.linkavatar = new Link({
      href: "/changeAvatar",
      class: "link-enter",
      label: "Change avatar",
      events: { click:  ()=> Router.go("/changeAvatar")}
    });
    this.children.linkPass = new Link({
        href: "/changePassword",
        class: "link-enter",
        label: "Change password",
        events: { click:  ()=> Router.go("/changePassword")}
    });
    this.children.linkMess = new Link({
      href: "/messenger",
      class: "link-enter",
      label: "To Messenger",
      events: { click:  ()=> Router.go("/messenger")}
  });
    this.children.linkLogout = new Buttons({
        class: "login-form__submit",
        label: "LOGOUT",
        events: {
          click: (event) => {
            event.preventDefault()
            AuthController.logout()
          }
        }
    });
  }
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ( { ...state.user.data }))


export const ProfileUser = withUser(Profile)


