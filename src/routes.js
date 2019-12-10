import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import ListagemAnuncio from "./pages/anuncio/ListagemAnuncio";
import ListagemAnuncioFiltro from "./pages/anuncio/ListagemAnuncioFiltro";
import ListagemConversa from "./pages/chat/ListagemConversa";
import PerfilAnuncio from "./pages/prestador/PerfilAnuncio";
import Perfil from "./pages/cliente/Perfil";
import IconeMenu from "./pages/IconeMenu";
import Loading from "./pages/auth/Loading";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Main from "./pages/auth/Main";


import StyleBase, { navigationOptions } from "./styles/StyleBase";

const MenuHome = createStackNavigator({
    ListagemAnuncio: { screen: ListagemAnuncio },
    ListagemAnuncioFiltro: { screen: ListagemAnuncioFiltro },
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

const MenuTeste = createStackNavigator({
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
