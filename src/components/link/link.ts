import Block from "../../core/Block";
import template from "./link.hbs";

interface LinkProps   {
  href: string
  class?: string;
  label?: string;
  events: {
    click: () => void
  }
}

 class Link extends Block<LinkProps>{
  constructor(props: LinkProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Link;


