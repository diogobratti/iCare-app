import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";

import ListagemAnuncio from "./pages/anuncio/ListagemAnuncio";
import ListagemConversa from "./pages/chat/ListagemConversa";
import PerfilAnuncio from "./pages/prestador/PerfilAnuncio";
import Perfil from "./pages/cliente/Perfil";
import IconeMenu from "./pages/IconeMenu";

import StyleBase, { navigationOptions } from "./styles/StyleBase";

const MenuHome = createStackNavigator({
    ListagemAnuncio,
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: StyleBase.headerStyle
        },
        headerTintColor: navigationOptions.headerTintColor.headerTintColor
    },
});

const MenuChat = createStackNavigator({
    ListagemConversa,
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: StyleBase.headerStyle
        },
        headerTintColor: navigationOptions.headerTintColor.headerTintColor
    },
});

const MenuAnuncio = createStackNavigator({
    PerfilAnuncio,
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: StyleBase.headerStyle
        },
        headerTintColor: navigationOptions.headerTintColor.headerTintColor
    },
});

const MenuPerfil = createStackNavigator({
    Perfil,
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: StyleBase.headerStyle
        },
        headerTintColor: navigationOptions.headerTintColor.headerTintColor
    },
});

const MenuPrincipal = createBottomTabNavigator(
    {
        Home: { screen: MenuHome },
        Chat: { screen: MenuChat },
        Anúncio: { screen: MenuAnuncio },
        Perfil: { screen: MenuPerfil }
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
