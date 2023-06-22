import Block from "../../core/Block"
import template from "./errorLable.hbs"



class ErrorLable extends Block {
  constructor(props: {text: string}) {
    super(props)
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

export default ErrorLable
