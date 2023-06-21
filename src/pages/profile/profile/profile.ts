import Block from "../../../core/Block";
import Link from "../../../components/link/link";
import template from "./profile.hbs";
import "../profileStyle.scss";
import Avatar from "../../../components/avatar/avatar";
import constAvatar from "../../../../static/Main.png"
import { store, withStore } from "../../../core/Store";
import AuthController from "../../../controlers/AuthController";


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
  // constructor(props: any) {
  //   // super({ 
  //   //     email: props?.email,
  //   //   login: props?.login, 
  //   //   name: props?.first_name, 
  //   //   surname: props?.second_name ,
  //   //   phone: props?.phone,
  //   //   chatName: props?.display_name,
  //   //  });
  //   // console.log(this.props)

  // }
  // console.log(this.props)

  // store.on(fg)

  init() {
    //проба
    const { data } = store.getState().user;
    // console.log(this.props)
    // console.log(checAvatar)
    const checAvatar = (data?.avatar == undefined) ? constAvatar : 'https://ya-praktikum.tech/api/v2/resources'+data.avatar
    // console.log(checAvatar)


    this.setProps({
      email: data?.email,
      login: data?.login, 
      name: data?.first_name, 
      surname: data?.second_name ,
      phone: data?.phone,
      chatName: data?.display_name,


      // img:Erorr404 
    });

    this.children.avatar = new Avatar({
      class: "container__info_foto_img",
      img: checAvatar,
    });
    this.children.linkInfo = new Link({
      href: "/changeInfo",
      class: "link-enter",
      label: "Change information",
    });
    this.children.linkavatar = new Link({
      href: "/changeAvatar",
      class: "link-enter",
      label: "Change avatar",
    });
    this.children.linkPass = new Link({
        href: "/changePassword",
        class: "link-enter",
        label: "Change password",
    });
    this.children.linkLogout = new Link({
        href: "/",
        class: "link-enter",
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

const withUser = withStore((state:any) => {
  // console.log(state.user.data)
  return { ...state.user.data }
})
// console.log(withUser)

export const ProfileUser = withUser(Profile)
