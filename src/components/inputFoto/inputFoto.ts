import Block from "../../core/Block";
import template from "./inputFoto.hbs";



export default class InputFoto extends Block {


  render() {
    return this.compile(template, { ...this.props });
  }
}

