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
import NewUserTelefoneScreen from './pages/auth-v2/NewUserTelefoneScreen';
// import NewUserAnuncio from './pages/auth/NewUserAnuncio';
// import NewUserProfissao from './pages/auth/NewUserProfissao';
// import NewUserCadastrar from './pages/auth/NewUserCadastrar';
import FaleConoscoScreen from './pages/faleconosco/FaleConoscoScreen';
// //import Localidade from "./pages/localidade/Teste";
// //import Localidade from "./pages/localidade/Testando";

import { navigationOptions } from './styles/StyleBase';

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

const NewUserFornecedorStack = createStackNavigator(
  {
    NewUserNome: NewUserNomeScreen,
    //     // NewUserCPF,
    //     NewUserEmail,
    //     NewUserTelefone,
    //     NewUserAnuncio,
    //     NewUserCadastrar,
    //     NewUserProfissao,
    //     Localidade,
  },
);

const NewUserClienteStack = createStackNavigator(
  {
    NewUserTelefone: NewUserTelefoneScreen,
    // NewUserCadastrar: NewUserCadastrarScreen,
  },
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppTabNavigator,
    Auth: AuthStack,
    NewUserFornecedor: NewUserFornecedorStack,
    NewUserCliente: NewUserClienteStack,
    EscolhePerfil: EscolhePerfilScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);


const Routes = createAppContainer(AppNavigator);

export default Routes;
