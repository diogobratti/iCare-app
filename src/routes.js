import {
  createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator,
} from 'react-navigation';

import AuthLoadingScreen from './pages/auth-v2/LoadingScreen';

import ListagemAnuncioScreen from './pages/anuncio/ListagemAnuncio';
import VisualizarAnuncioScreen from './pages/anuncio/VisualizarAnuncio';
import PerfilAnuncioScreen from './pages/prestador/PerfilAnuncio';
import IconeMenu from './pages/IconeMenu';
// import Localidade from "./pages/localidade/Localidade";
import TermosServicoScreen from './pages/termo/TermosServicoScreen';
import EscolhePerfilScreen from './pages/auth-v2/EscolhePerfilScreen';
// import Loading from "./pages/auth/Loading";
import LoginScreen from './pages/auth-v2/LoginScreen';
import NewUserNomeScreen from './pages/auth-v2/NewUserNomeScreen';
// // import NewUserCPF from './pages/auth/NewUserCPF';
// import NewUserEmail from './pages/auth/NewUserEmail';
// import NewUserTelefone from './pages/auth/NewUserTelefone';
// import NewUserAnuncio from './pages/auth/NewUserAnuncio';
// import NewUserProfissao from './pages/auth/NewUserProfissao';
// import NewUserCadastrar from './pages/auth/NewUserCadastrar';
import FaleConoscoScreen from './pages/faleconosco/FaleConoscoScreen';
// //import Localidade from "./pages/localidade/Teste";
// //import Localidade from "./pages/localidade/Testando";

import StyleBase, { navigationOptions } from './styles/StyleBase';

// const MenuHome = createStackNavigator({
//   ListagemAnuncio: { screen: ListagemAnuncio },
//   VisualizarAnuncio: { screen: VisualizarAnuncio }
// });

// const MenuAnuncio = createStackNavigator(
//   {
//     Loading,
//     Login,
//     NewUserNome,
//     // NewUserCPF,
//     NewUserEmail,
//     NewUserTelefone,
//     NewUserAnuncio,
//     NewUserCadastrar,
//     NewUserProfissao,
//     PerfilAnuncio
//   },
//   {
//     screenInterpolator: sceneProps => {
//       return null;
//     }
//   }
// );

// const MenuFaleConosco = createStackNavigator({
//   FaleConosco
// });

// const MenuPrincipal = createBottomTabNavigator(
//   {
//     Home: { screen: MenuHome },
//     // Chat: { screen: MenuChat },
//     'Anuncie aqui': { screen: MenuAnuncio },
//     'Fale Conosco': { screen: MenuFaleConosco },
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, tintColor }) => IconeMenu(navigation, focused, tintColor),
//     }),
//     tabBarOptions: navigationOptions.tabBarOptions,
//   },
// );

// const EscolhaLocalidade = createStackNavigator({
//   TermoServico,
//   Localidade,
//   EscolhePerfil,
//   MenuPrincipal,
// },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false,
//     }
//   });

const HomeStack = createStackNavigator(
  {
    ListagemAnuncio: ListagemAnuncioScreen,
    VisualizarAnuncio: VisualizarAnuncioScreen,
  },
);

const AnuncioStack = createStackNavigator(
  {
    PerfilAnuncio: PerfilAnuncioScreen,
  },
);

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    'Anuncie aqui': AnuncioStack,
    'Fale Conosco': FaleConoscoScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => IconeMenu(navigation, focused, tintColor),
    }),
    tabBarOptions: navigationOptions.tabBarOptions,
  },
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    TermoServico: TermosServicoScreen,
  },
);

const NewUserStack = createStackNavigator(
  {
    NewUserNome: NewUserNomeScreen,
    //     // NewUserCPF,
    //     NewUserEmail,
    //     NewUserTelefone,
    //     NewUserAnuncio,
    //     NewUserCadastrar,
    //     NewUserProfissao,
    //   Localidade,
  },
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppTabNavigator,
    Auth: AuthStack,
    NewUser: NewUserStack,
    EscolhePerfil: EscolhePerfilScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);


const Routes = createAppContainer(AppNavigator);

export default Routes;
