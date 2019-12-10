import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import ListagemAnuncio from "./pages/anuncio/ListagemAnuncio";
import ListagemConversa from "./pages/chat/ListagemConversa";
import PerfilAnuncio from "./pages/prestador/PerfilAnuncio";
import Perfil from "./pages/cliente/Perfil";
import Cadastro from "./pages/auth/Cadastro";
import IconeMenu from "./pages/IconeMenu";
// import MenuLogin from "./pages/auth/App";
import Loading from "./pages/auth/Loading";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Main from "./pages/auth/Main";


import StyleBase, { navigationOptions } from "./styles/StyleBase";

const MenuHome = createStackNavigator({
    ListagemAnuncio,
});

const MenuChat = createStackNavigator({
    ListagemConversa,
});

const MenuAnuncio = createStackNavigator({
    PerfilAnuncio,
});

const MenuPerfil = createStackNavigator({
    Perfil,
});

const MenuCadastro = createStackNavigator({
    Cadastro,
});

const MenuTeste = createSwitchNavigator({
    Loading,
    SignUp,
    Login,
    Main
})

const MenuPrincipal = createBottomTabNavigator(
    {
        Home: { screen: MenuHome },
        Chat: { screen: MenuChat },
        Anúncio: { screen: MenuAnuncio },
        Perfil: { screen: MenuTeste },      
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          IconeMenu(navigation, focused, tintColor),
      }),
      tabBarOptions: navigationOptions.tabBarOptions,
    }
);

const Routes = createAppContainer(MenuPrincipal);

export default Routes;
