import renderDom from "./core/RenderDom";
import AllPages  from "./pages/allPages/allPages";
import FormLogin from "./pages/auth/form-login/form-login";
import FormReg from "./pages/auth/form-reg/form-reg";
import Chats from "./pages/chats/chats";
import containerError from "./pages/erorr/containerError";
import ProfileChangeInfo from "./pages/profile/pChangeInfo/profileChangeInfo";
import ProfileChangePassword from "./pages/profile/pChangePassword/profileChangePassword";
import Profile from "./pages/profile/profile/profile";



window.addEventListener("DOMContentLoaded", () => {
    const page404 = new containerError({erorrNumber: "404",erorrText:"Oh no...We lost this page"  });
    const page500 = new containerError({erorrNumber:"500", erorrText:"Sorry unexpected error", erorrPic:"../../../static/500Erorr.png" });
    const login = new FormLogin();
    const registration = new FormReg();
    const profile = new Profile({
      email: "1234@gmail.com",
      login: "Lala",
      name: "Igor" ,
      surname: "Petrov",
      phone: "+79098135633",
      chatName: "LALA",
    })
    const profileChangePassword = new ProfileChangePassword();
    const profileChangeInfo = new ProfileChangeInfo();

    const pages = [
      { link: "/home", label: "Home" },
      { link: "/login", label: "Login" },
      { link: "/registration", label: "Registration" },
      { link: "/profile", label: "Profile" },
      { link: "/ChangePassword", label: "Change Password" },
      { link: "/ChangeInfo", label: "Change Info" },
      { link: "/erorr404", label: "404" },
      { link: "/erorr500", label: "500" },
      { link: "/chats", label: "Chats" },
    ];
    const allChats = [
      {label: "Ivan", lastMess: "Привет"},
      {label: "vitek", lastMess: "Сообщение"},
      {label: "Nik", lastMess: "Письмо"},
      {label: "olga44", lastMess: "Новость"},
    ]

    const allPages = new AllPages({ pages });
    const chats = new Chats({allChats})

    renderDom("#app", allPages);

    switch (window.location.pathname) {
      case "/home":
        renderDom("#app",allPages);
        break;
      case "/login":
        renderDom("#app",login);
        break;
      case "/profile":
        renderDom("#app",profile);
        break;
      case "/ChangePassword":
        renderDom("#app",profileChangePassword );
        break;
      case "/ChangeInfo":
        renderDom("#app",profileChangeInfo );
        break;
      case "/registration":
        renderDom("#app",registration);
        break;
      case "/erorr404":
        renderDom("#app",page404);
        break;
      case "/erorr500":
        renderDom("#app",page500);
        break;
      case "/chats":
        renderDom("#app",chats);
        break;
      default:
        renderDom("#app", allPages);
        break;
    }



  });
