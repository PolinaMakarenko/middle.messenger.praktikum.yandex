import Input2 from "../../components/input2/input2";
import FormMess from "../../components/formMess/formMess";
import Link from "../../components/link/link";
import Block from "../../core/Block";
import { submitMess } from "../../core/Validation";
import ChatsController from  "../../controlers/ChatController";
import template from "./chats.hbs";
import "./chatsStyle.scss";
import Router from "../../core/Rourer";


type allChatsProp = {
  label: string;
  lastMess: string;
};

interface AllPagesProps {
    allChats: allChatsProp[];
}

export default class Chats extends Block {
  constructor(props: AllPagesProps) {
    super(props);
  }

  init() {
  this.children.inputSerch = new Input2({
      class: "all-chats__search",
      name: "search",
      type: "text",
      placeholder: "Search",
  });
  this.children.newMess = new FormMess({
    events: {
      // submit: (event)=> { event.preventDefault() 
      //   console.log(event.target.value)},
      submit: submitMess

    },

    
    });
  
    this.children.link = new Link({
        href: "/profile",
        class: "link-enter",
        label: "Go to Profil",
        events: { click:  ()=> Router.go("/profile")}
    });

  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
