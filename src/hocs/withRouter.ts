import Block from "../core/Block"
import Router from "../core/Rourer"


export function withRouter(Component: typeof Block) {
  // type Props = typeof Component extends typeof Block <any> ? P : any;

  return class WithRouter extends Component {
    constructor(props: any & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  }
}

export interface PropsWithRouter {
  router: typeof Router;
}
