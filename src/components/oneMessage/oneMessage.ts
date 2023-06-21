import Block from '../../core/Block'
// import SendStatus, { ISendStatusProps } from './sendStatus/SendStatus'
import template from './oneMessage.hbs'

interface oneMessProps {
  text: string
  class: string
  time: string
}

 export default class oneMessage extends Block<oneMessProps> {
  constructor(props: oneMessProps) {
    super(props)
  }

  render() {
    return this.compile(template, {...this.props})
  }
}

