import Router  from "./core/Rourer";
import FormLogin from "./pages/auth/form-login/form-login"
import FormReg from "./pages/auth/form-reg/form-reg";
import ContainerError from "./pages/erorr/containerError";
import Chats from "./pages/chats/chats"
import AuthController from "./controlers/AuthController";
import ProfileUser from "./pages/profile/profile/profile";
import ProfileChangeInfoUser from "./pages/profile/pChangeInfo/profileChangeInfo";
import { ProfileChangePasswUser } from "./pages/profile/pChangePassword/profileChangePassword";
import ProfileChangeFoto from "./pages/profile/pChangeFoto/pChangeFoto";
import { ChatsTestStroe } from "./pages/chat3/chats3";

// window.addEventListener("DOMContentLoaded", () => {
    // const page404 = new containerError({erorrNumber: "404",erorrText:"Oh no...We lost this page", img:img404  });
    // const page500 = new containerError({erorrNumber:"500", erorrText:"Sorry unexpected error", img:img500  });
//     const login = new FormLogin();
//     const registration = new FormReg();
//     const profile = new Profile({
//       email: "1234@gmail.com",
//       login: "Lala",
//       name: "Igor" ,
//       surname: "Petrov",
//       phone: "+79098135633",
//       chatName: "LALA",
//     })
//     const profileChangePassword = new ProfileChangePassword();
//     const profileChangeInfo = new ProfileChangeInfo();

//     const pages = [
//       { link: "/home", label: "Home" },
//       { link: "/login", label: "Login" },
//       { link: "/registration", label: "Registration" },
//       { link: "/profile", label: "Profile" },
//       { link: "/ChangePassword", label: "Change Password" },
//       { link: "/ChangeInfo", label: "Change Info" },
//       { link: "/erorr404", label: "404" },
//       { link: "/erorr500", label: "500" },
//       { link: "/chats", label: "Chats" },
//     ];
//     const allChats = [
//       {label: "Ivan", lastMess: "Привет"},
//       {label: "vitek", lastMess: "Сообщение"},
//       {label: "Nik", lastMess: "Письмо"},
//       {label: "olga44", lastMess: "Новость"},
//     ]

//     const allPages = new AllPages({ pages });
//     const chats = new Chats({allChats})

//     renderDom("#app", allPages);

//     switch (window.location.pathname) {
//       case "/home":
//         renderDom("#app",allPages);
//         break;
//       case "/login":
//         renderDom("#app",login);
//         break;
//       case "/profile":
//         renderDom("#app",profile);
//         break;
//       case "/ChangePassword":
//         renderDom("#app",profileChangePassword );
//         break;
//       case "/ChangeInfo":
//         renderDom("#app",profileChangeInfo );
//         break;
//       case "/registration":
//         renderDom("#app",registration);
//         break;
//       case "/erorr404":
//         renderDom("#app",page404);
//         break;
//       case "/erorr500":
//         renderDom("#app",page500);
//         break;
//       case "/chats":
//         renderDom("#app",chats);
//         break;
//       default:
//         renderDom("#app", allPages);
//         break;
//     }



//   });
// document.addEventListener("DOMContentLoaded", () => {
//   const store = new Store<AppState>(defaultState);

//   /**
//    * Помещаем роутер и стор в глобальную область для доступа в хоках with*
//    * @warning Не использовать такой способ на реальный проектах
//    */
//   window.store = store;

//   store.on("changed", (prevState, nextState) => {
//       if(!prevState.appIsInited && nextState.appIsInited) {
//         initRouter(store);
//       }
//       console.log(
//         "%cstore updated",
//         "background: #222; color: #bada55",
//         nextState,
//       );
//   });

//   /**
//    * Загружаем данные для приложения
//    */
//   store.dispatch(initApp);
// });

export const Routes = {
  Login: "/",
  Registr: "/registration",
  Profile: "/profile",
  ChangeInfo: "/changeInfo",
  ChangePassword: "/changePassword",
  ChangeAvatar: "/changeAvatar",
  Messenger: "/messenger",
  Error400: "/404",
  Error500: "/500",
  testChat: "/newChat"
}

window.addEventListener("DOMContentLoaded", async () => {
  Router
    .use(Routes.Login, FormLogin)
    .use(Routes.Registr, FormReg)
    .use(Routes.Profile, ProfileUser)
    .use(Routes.ChangeInfo, ProfileChangeInfoUser)
    .use(Routes.ChangePassword, ProfileChangePasswUser)
    .use(Routes.ChangeAvatar, ProfileChangeFoto)
    .use(Routes.Messenger, Chats)
    .use(Routes.Error400,ContainerError)
    .use(Routes.Error500,ContainerError)
    .use(Routes.testChat, ChatsTestStroe)

  let isProtectedRoute = true

  switch (window.location.pathname) {
    case Routes.Login:
    case Routes.Registr:
    // case Routes.Error400:
      isProtectedRoute = false
      break
    default:
      if (!Object.values(Routes).includes(window.location.pathname)) {
        Router.go(Routes.Error400)
      }
      break
  }

  try {
    await AuthController.getUser()

    Router.start()

    if (!isProtectedRoute) {
      Router.go(Routes.Messenger)
    }
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(Routes.Login)
    }
  }

})

