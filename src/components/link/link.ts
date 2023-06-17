import Block from "../../core/Block";
import { PropsWithRouter, withRouter } from "../../hocs/withRouter";
import template from "./link.hbs";

interface LinkProps {
  // to: string
  href?: string
  class: string;
  label: string;
  events?: Record<string, (...args: any) => void>;
}

 class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props
    });
  }

  // navigate() {
  //   this.props.router.go(this.props.to);
  // }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Link;
