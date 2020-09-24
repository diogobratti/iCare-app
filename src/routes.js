import {
  createAppContainer, createSwitchNavigator,
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AuthLoadingScreen from './pages/auth-v2/LoadingScreen';

import ListagemAnuncioScreen from './pages/anuncio/ListagemAnuncio';
import VisualizarAnuncioScreen from './pages/anuncio/VisualizarAnuncio';
import PerfilAnuncioScreen from './pages/prestador/PerfilAnuncio';
import IconeMenu from './pages/IconeMenu';
import TermosServicoScreen from './pages/termo/TermosServicoScreen';
import EscolhePerfilScreen from './pages/auth-v2/EscolhePerfilScreen';
import LoginScreen from './pages/auth-v2/LoginScreen';
import NewUserNomeScreen from './pages/auth-v2/NewUserNomeScreen';
import NewUserFotoScreen from './pages/auth-v2/NewUserFotoScreen';
import NewUserLocalidadeScreen from './pages/auth-v2/NewUserLocalidadeScreen';
import NewUserEmailScreen from './pages/auth-v2/NewUserEmailScreen';
import NewUserTelefoneScreen from './pages/auth-v2/NewUserTelefoneScreen';
import NewUserAnuncioScreen from './pages/auth-v2/NewUserAnuncioScreen';
import NewUserProfissaoScreen from './pages/auth-v2/NewUserProfissaoScreen';
import NewUserCadastrar from './pages/auth-v2/NewUserCadastrar';
import NewUserRedesSociaisScreen from './pages/auth-v2/NewUserRedesSociais';
import FaleConoscoScreen from './pages/faleconosco/FaleConoscoScreen';
import Imagem from "./pages/Imagem";

import StyleBase, { navigationOptions } from "./styles/StyleBase";

const HomeStack = createStackNavigator(
  {
    ListagemAnuncio: ListagemAnuncioScreen,
    VisualizarAnuncio: VisualizarAnuncioScreen,
  },
);

const AnuncioStack = createStackNavigator(
  {
    PerfilAnuncio: PerfilAnuncioScreen,
    NewUserFoto: NewUserFotoScreen,
    NewUserNome: NewUserNomeScreen,
    NewUserEmail: NewUserEmailScreen,
    NewUserLocalidade: NewUserLocalidadeScreen,
    NewUserTelefone: NewUserTelefoneScreen,
    NewUserAnuncio: NewUserAnuncioScreen,
    NewUserProfissao: NewUserProfissaoScreen,
    NewUserRedesSociais: NewUserRedesSociaisScreen,
    // NewUserCadastrar,
  },
);

const AppTabNavigator = createBottomTabNavigator(
  {
    'Anúncio': HomeStack,
    'Perfil': AnuncioStack,
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
    NewUserEmail: NewUserEmailScreen,
    NewUserLocalidade: NewUserLocalidadeScreen,
    NewUserTelefone: NewUserTelefoneScreen,
    NewUserAnuncio: NewUserAnuncioScreen,
    NewUserProfissao: NewUserProfissaoScreen,
    // NewUserRedesSociais: NewUserRedesSociaisScreen,
    NewUserCadastrar,
  },
);

const NewUserClienteStack = createStackNavigator(
  {
    NewUserLocalidade: NewUserLocalidadeScreen,
    NewUserTelefone: NewUserTelefoneScreen,
    // NewUserRedesSociais: NewUserRedesSociaisScreen,
    NewUserAnuncio: NewUserAnuncioScreen,
    NewUserCadastrar,
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
