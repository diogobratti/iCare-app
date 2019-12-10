import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import ListagemAnuncio from "./pages/anuncio/ListagemAnuncio";
import VisualizarAnuncio from "./pages/anuncio/VisualizarAnuncio";
import PerfilAnuncio from "./pages/prestador/PerfilAnuncio";
import IconeMenu from "./pages/IconeMenu";
import Localidade from "./pages/localidade/Localidade";
import TermoServico from "./pages/termo/TermoServico";
import EscolhePerfil from "./pages/auth/EscolhePerfil";
import Loading from "./pages/auth/Loading";
import Login from "./pages/auth/Login";
import NewUserNome from './pages/auth/NewUserNome';
// import NewUserCPF from './pages/auth/NewUserCPF';
import NewUserEmail from './pages/auth/NewUserEmail';
import NewUserTelefone from './pages/auth/NewUserTelefone';
import NewUserAnuncio from './pages/auth/NewUserAnuncio';
import NewUserProfissao from './pages/auth/NewUserProfissao';
import NewUserCadastrar from './pages/auth/NewUserCadastrar';
import FaleConosco from './pages/faleconosco/FaleConosco';
//import Localidade from "./pages/localidade/Teste";
//import Localidade from "./pages/localidade/Testando";
import Imagem from "./pages/Imagem";

import StyleBase, { navigationOptions } from "./styles/StyleBase";

const MenuHome = createStackNavigator({
  ListagemAnuncio: { screen: ListagemAnuncio },
  VisualizarAnuncio: { screen: VisualizarAnuncio }
});

const MenuAnuncio = createStackNavigator(
  {
    Loading,
    Login,
    NewUserNome,
    // NewUserCPF,
    NewUserEmail,
    NewUserTelefone,
    NewUserAnuncio,
    NewUserCadastrar,
    NewUserProfissao,
    PerfilAnuncio
  },
  {
    screenInterpolator: sceneProps => {
      return null;
    }
  }
);

const MenuFaleConosco = createStackNavigator({
  FaleConosco
});

const MenuPrincipal = createBottomTabNavigator(
  {
    Home: { screen: MenuHome },
    //Chat: { screen: MenuChat },
    "Anuncie aqui": { screen: MenuAnuncio },
    "Fale Conosco": { screen: MenuFaleConosco }
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
  EscolhePerfil,
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