import { connect } from 'react-redux';

import * as Actions from './ActionTypes';
import ListagemAnuncioFiltro from '../pages/anuncio/ListagemAnuncioFiltro';

const mapStateToProps = (state) => ({
     count: state.ListagemAnuncioFiltroAplicarReducer.count
});

const mapDispatchToProps = (dispatch) => ({
    aplicarFiltro: () => dispatch({type: Actions.LISTAGEM_ANUNCIO_FILTRO_APLICAR_FILTROS_E_ORDENACAO}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListagemAnuncioFiltro);