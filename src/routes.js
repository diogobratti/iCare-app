import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import ListagemAnuncio from "./pages/anuncio/ListagemAnuncio";
import VisualizarAnuncio from "./pages/anuncio/VisualizarAnuncio";
import ListagemConversa from "./pages/chat/ListagemConversa";
import PerfilAnuncio from "./pages/prestador/PerfilAnuncio";
import Perfil from "./pages/cliente/Perfil";
import IconeMenu from "./pages/IconeMenu";
import Localidade from "./pages/localidade/Localidade";
import TermoServico from "./pages/termo/TermoServico";
import Loading from "./pages/auth/Loading";
import Login from "./pages/auth/Login";
import NewUserNome from './pages/auth/NewUserNome';
import NewUserCPF from './pages/auth/NewUserCPF';
import NewUserEmail from './pages/auth/NewUserEmail';
import NewUserTelefone from './pages/auth/NewUserTelefone';
import NewUserEstadoCidade from './pages/auth/NewUserEstadoCidade';
import NewUserAnuncio from './pages/auth/NewUserAnuncio';
import NewUserCadastrar from './pages/auth/NewUserCadastrar';
// import {NewUserNome, NewUserCPF, NewUserEmail, NewUserTelefone, NewUserEstadoCidade, NewUserAnuncio, NewUserCadastrar} from "./pages/auth/";
//import Localidade from "./pages/localidade/Teste";
//import Localidade from "./pages/localidade/Testando";

import StyleBase, { navigationOptions } from "./styles/StyleBase";

const MenuHome = createStackNavigator({
  ListagemAnuncio: { screen: ListagemAnuncio },
  VisualizarAnuncio: { screen: VisualizarAnuncio },
});

const Anuncio = createStackNavigator({
  PerfilAnuncio
});

const Cadastro = createStackNavigator({
  NewUserNome,
  NewUserCPF,
  NewUserEmail,
  NewUserTelefone,
  NewUserEstadoCidade,
  NewUserAnuncio,
  NewUserCadastrar
});

const LoginStack = createStackNavigator({ screen: Login });

const MenuAnuncio = createSwitchNavigator({
  AuthLoading: Loading,
  App: Anuncio,
  NewUser: Cadastro,
  Login: LoginStack
});

const MenuPrincipal = createBottomTabNavigator(
  {
    Home: { screen: MenuHome },
    //Chat: { screen: MenuChat },
    'Anuncie aqui': { screen: MenuAnuncio },
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
  TermoServico,
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