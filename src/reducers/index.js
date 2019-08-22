import { combineReducers, createStore } from 'redux';

//importar meus reducers
import ListagemAnuncioFiltroAplicarReducer from './ListagemAnuncioFiltroAplicarReducer';

const AppReducers = combineReducers({
  //meus reducers
  ListagemAnuncioFiltroAplicarReducer,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
}

let store = createStore(rootReducer);

export default store;