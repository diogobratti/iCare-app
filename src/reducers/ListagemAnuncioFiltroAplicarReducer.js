import * as Actions from '../actions/ActionTypes';

import * as CONSTANTES from '../data/Constantes';

const ListagemAnuncioFiltroAplicarReducer = (state = { 
                                  orderByValor: CONSTANTES.LISTAGEM_ANUNCIO_ORDERBY_PADRAO,
                                  filtroPreco: CONSTANTES.LISTAGEM_ANUNCIO_PRECO_MAXIMO,
                                  filtroProfissaoCuidador: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_CUIDADOR,
                                  filtroProfissaoTecnicoEnfermagem: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_TECNICO_ENFERMAGEM,
                                  filtroProfissaoEnfermeiro: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_ENFERMEIRO,
                                  filtroProfissaoTerapeutaOcupacional: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_TERAPEUTA_OCUPACIONAL,
                                  filtroProfissaoFisioterapeuta: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_FISIOTERAPEUTA,
                                  filtroProfissaoNutricionista: CONSTANTES.LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_NUTRICIONISTA,
                                  }, action) => {
  switch (action.type){
      case Actions.LISTAGEM_ANUNCIO_FILTRO_APLICAR_FILTROS_E_ORDENACAO:
          return {
            orderByValor: state.orderByValor,
            filtroPreco: state.filtroPreco,
            filtroProfissaoCuidador: state.filtroProfissaoCuidador,
            filtroProfissaoTecnicoEnfermagem: state.filtroProfissaoTecnicoEnfermagem,
            filtroProfissaoEnfermeiro: state.filtroProfissaoEnfermeiro,
            filtroProfissaoTerapeutaOcupacional: state.filtroProfissaoTerapeutaOcupacional,
            filtroProfissaoFisioterapeuta: state.filtroProfissaoFisioterapeuta,
            filtroProfissaoNutricionista: state.filtroProfissaoNutricionista,
          };
      default:
          return state;
  }

}
export default ListagemAnuncioFiltroAplicarReducer;