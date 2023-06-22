import Block from "../core/Block"
import Router from "../core/Rourer"


export function withRouter(Component: typeof Block) {
    type Props = typeof Component extends typeof Block <infer P> ? P : any;
  
    return class WithRouter extends Component {
      constructor(props: Props & PropsWithRouter) {
        super({ ...props, router: Router });
      }
    }
  }
  
  export interface PropsWithRouter {
    router: typeof Router;
  }
