
export const LISTAGEM_ANUNCIO_ORDERBY_PADRAO = 'preco';
export const LISTAGEM_ANUNCIO_PRECO_MAXIMO = 2000;
export const LISTAGEM_ANUNCIO_PROPAGANDA_APOS_ANUNCIO = 5;
export const LISTAGEM_ANUNCIO_TEM_PROPAGANDA_APOS_ANUNCIO = false;
export const LISTAGEM_ANUNCIO_QTD_ANUNCIOS_CARREGADOS_POR_VEZ_PADRAO = 10;
export const LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_CUIDADOR = true;
export const LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_TECNICO_ENFERMAGEM = true;
export const LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_ENFERMEIRO = true;
export const LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_TERAPEUTA_OCUPACIONAL = true;
export const LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_FISIOTERAPEUTA = true;
export const LISTAGEM_ANUNCIO_FILTRO_PROFISSAO_NUTRICIONISTA = true;
export const LISTAGEM_ANUNCIO_FILTRO_AVALIACAO = 5;

// Profissoes
export const PROFISSAO_CUIDADOR = 'Cuidador';
export const PROFISSAO_TECNICO_ENFERMAGEM = 'Técnico em Enfermagem';
export const PROFISSAO_TERAPEUTA_OCUPACIONAL = 'Terapeuta Ocupacional';
export const PROFISSAO_FISIOTERAPEUTA = 'Fisioterapeuta';
export const PROFISSAO_ENFERMEIRO = 'Enfermeiro';
export const PROFISSAO_NUTRICIONISTA = 'Nutricionista';

// Rotas
export const ROUTES_LOADING = 'AuthLoading';
export const ROUTES_APP = 'App';
export const ROUTES_ESCOLHE_PERFIL = 'EscolhePerfil';
export const ROUTES_AUTENTICACAO = 'Auth';
export const ROUTES_AUTENTICACAO_LOGIN = 'Login';
export const ROUTES_AUTENTICACAO_TERMO_SERVICO = 'TermoServico';
export const ROUTES_NEW_USER_CLIENTE = 'NewUserCliente';
export const ROUTES_NEW_USER_FORNECEDOR = 'NewUserFornecedor';
export const ROUTES_NEW_USER_NOME = 'NewUserNome';
export const ROUTES_NEW_USER_EMAIL = 'NewUserEmail';
export const ROUTES_NEW_USER_TELEFONE = 'NewUserTelefone';
export const ROUTES_NEW_USER_ANUNCIO = 'NewUserAnuncio';
export const ROUTES_NEW_USER_PROFISSAO = 'NewUserProfissao';
export const ROUTES_NEW_USER_LOCALIDADE = 'NewUserLocalidade';
export const ROUTES_NEW_USER_REDES_SOCIAIS = 'NewUserRedesSociais';
export const ROUTES_NEW_USER_CADASTRAR = 'NewUserCadastrar';
export const ROUTES_HOME_LISTAGEM_ANUNCIO = 'ListagemAnuncio';
export const ROUTES_HOME_VISUALIZAR_ANUNCIO = 'VisualizarAnuncio';
export const ROUTES_FALE_CONOSCO = 'Fale Conosco';
export const ROUTES_ANUNCIO = 'Anuncie aqui';

// AsyncStorage Valores
export const ASYNC_USER_PERFIL_CLIENTE = 'Cliente';
export const ASYNC_USER_PERFIL_FORNECEDOR = 'Fornecedor';

// AsyncStorage Chaves
export const ASYNC_ITEM_PERFIL = 'userPerfil';
export const ASYNC_ITEM_CADASTRO_COMPLETO = 'userCadastroCompleto';
export const ASYNC_ITEM_USUARIO_TOKEN = 'userToken';
export const ASYNC_ITEM_USUARIO_UID = 'userUID';
export const ASYNC_ITEM_USUARIO_PROVIDER_ID = 'userProviderID';
export const ASYNC_ITEM_USUARIO_NOME = 'userNome';
export const ASYNC_ITEM_USUARIO_EMAIL = 'userEmail';
export const ASYNC_ITEM_USUARIO_INSTAGRAM = 'userInstagram';
export const ASYNC_ITEM_USUARIO_FOTO = 'userFoto';
export const ASYNC_ITEM_USUARIO_TELEFONE = 'userTelefone';
export const ASYNC_ITEM_USUARIO_PROFISSAO = 'userProfissao';
export const ASYNC_ITEM_USUARIO_PRECO = 'userPreco';
export const ASYNC_ITEM_USUARIO_ANUNCIO = 'userAnuncio';
export const ASYNC_ITEM_USUARIO_ESTADO = 'estado';
export const ASYNC_ITEM_USUARIO_MUNICIPIO = 'municipio';
export const ASYNC_ITEM_USUARIO_REGIAO = 'microrregiao';
export const ASYNC_ITEM_AUTH_PROVIDER_TOKEN = 'userAuthProviderToken';
export const ASYNC_ITEM_AUTH_PROVIDER_NAME = 'userAuthProviderName';
export const ASYNC_ITEM_TERMO_SERVICO = 'versaoTermosServico';

export const ASYNC_GRUPO_ITENS_ANUNCIO_COMPLETO = [
  ASYNC_ITEM_USUARIO_FOTO,
  ASYNC_ITEM_USUARIO_NOME,
  ASYNC_ITEM_USUARIO_TELEFONE,
  ASYNC_ITEM_USUARIO_PROFISSAO,
  ASYNC_ITEM_USUARIO_ANUNCIO,
  ASYNC_ITEM_USUARIO_PRECO
]

// Firestore Collections
export const FIRESTORE_COLLECTION_ANUNCIOS = 'anuncios';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_PERFIL = 'perfil';
// export const FIRESTORE_FIELD_ANUNCIO_USUARIO_TOKEN = 'usuario_token';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_UID = 'user_uid';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_ID = 'id';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_PROVIDER_ID = 'provider_id';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_NOME = 'nome';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_EMAIL = 'email';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_FOTO = 'foto';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_TELEFONE = 'telefone';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_PROFISSAO = 'profissao';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_PRECO = 'preco';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_ANUNCIO = 'anuncio';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_ESTADO = 'uf';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_MUNICIPIO = 'cidade';
export const FIRESTORE_FIELD_ANUNCIO_USUARIO_REGIAO = 'microrregiao';
// export const FIRESTORE_FIELD_ANUNCIO_AUTH_PROVIDER_TOKEN = 'authProviderToken';
// export const FIRESTORE_FIELD_ANUNCIO_AUTH_PROVIDER_NAME = 'authProviderID';
export const FIRESTORE_FIELD_ANUNCIO_TERMO_SERVICO = 'versaoTermosServico';
export const FIRESTORE_FIELD_ANUNCIO_CADASTRO_COMPLETO = 'cadastroCompleto';
