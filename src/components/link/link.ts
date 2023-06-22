import Block from "../../core/Block";
import  Router  from "../../core/Rourer";
import { PropsWithRouter, withRouter } from "../../hocs/withRouter";
import template from "./link.hbs";

interface LinkProps extends PropsWithRouter   {
  // to: string
  href: string
  class?: string;
  label?: string;
  // events: {
  //   click: () => void
  // }
  events?: Record<string, (...args: any) => void>;
}

 class Link extends Block<LinkProps>{
  constructor(props: LinkProps) {
    super({
      ...props,
      // events: {
      //   click: () => this.navigate()
      // }
    });
  }
  // navigate() {
  //   Router.go(this.props.href)
  // }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Link;


// export const Link = withRouter(LinkR)
