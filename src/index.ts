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
