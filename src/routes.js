import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import ListagemAnuncio from "./pages/anuncio/ListagemAnuncio";
import ListagemAnuncioFiltro from "./pages/anuncio/ListagemAnuncioFiltro";
import VisualizarAnuncio from "./pages/anuncio/VisualizarAnuncio";
import ListagemConversa from "./pages/chat/ListagemConversa";
import PerfilAnuncio from "./pages/prestador/PerfilAnuncio";
import Perfil from "./pages/cliente/Perfil";
import IconeMenu from "./pages/IconeMenu";
import Localidade from "./pages/Localidade";
import Loading from "./pages/auth/Loading";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Main from "./pages/auth/Main";


import StyleBase, { navigationOptions } from "./styles/StyleBase";

const MenuHome = createStackNavigator({
    ListagemAnuncio: { screen: ListagemAnuncio },
    ListagemAnuncioFiltro: { screen: ListagemAnuncioFiltro },
    VisualizarAnuncio: { screen: VisualizarAnuncio },
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
        //Chat: { screen: MenuChat },
        'Anuncie aqui': { screen: MenuAnuncio },
        //Perfil: { screen: MenuTeste },      
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          IconeMenu(navigation, focused, tintColor),
      }),
      tabBarOptions: navigationOptions.tabBarOptions,
    }
);

const EscolhaLocalidade = createStackNavigator({
    Localidade,
    MenuPrincipal,
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });

const Routes = createAppContainer(EscolhaLocalidade);

export default Routes;