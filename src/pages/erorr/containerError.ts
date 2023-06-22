import Block from "../../core/Block";
import template from "./containerError.hbs";
import Link from "../../components/link/link";

import "./erorrStyle.scss";
import Erorr404 from "../../../static/404Erorr.png";
import Erorr500 from "../../../static/500Erorr.png";


export default class containerError extends Block {
  constructor(props?: ErrorContProps) {
    super({ ...props });
  }


  init() {
    this.children.link = new Link({
      href: "/messenger",
      class: "link-enter",
      label: "Go to chats",
    });

    switch(window.location.pathname) {
      case "/404": {
        this.setProps({
          erorrNumber: "404",
          erorrText:"Oh no...We lost this page", 
          img:Erorr404 
        });
        break;
      }
  
      case "/500" : {
        this.setProps({
          erorrNumber: "500",
          erorrText:"Sorry unexpected error", 
          img:Erorr500 
        });
        
        break;
  
  
      }
      default: {
        break;
      }
    }
  }
  render() {
    // console.log(this.props)
    return this.compile(template, this.props);
  }
}

interface ErrorContProps {
    erorrNumber: string;
    erorrText?: string;
    // erorrPic?: string ;
    img?: string
  }

  // const path = window.location.pathname

  // console.log (path)

  // switch(window.location.pathname) {
  //   case "/404": {
  //     const page404 = new containerError({erorrNumber: "404",erorrText:"Oh no...We lost this page", img:Erorr404  });
  //     break;
  //   }

  //   case "/500" : {
  //     const page500 = new containerError({erorrNumber: "404",erorrText:"Oh no...We lost this page", img:Erorr404  });
  //     break;


  //   }
  //   default: {
  //     break;
  //   }

  // }

  // export default class containerError extends Block {
  //   constructor(props?: ErrorContProps) {
  //     super({ ...props });
  //   }
  
  //   init() {
  //     this.children.link = new Link({
  //       // href: "/",
  //       class: "link-enter",
  //       label: "Go to chats",
  //     });
  //   }
  //   render() {
  //     return this.compile(template, this.props);
  //   }
  // }

