import Block from "../../core/Block";
import template from "./allPages.hbs";

type link = {
  link: string;
  label: string;
};

interface AllPagesProps {
  pages: link[];
}

export default class AllPages extends Block {
  constructor(props: AllPagesProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
