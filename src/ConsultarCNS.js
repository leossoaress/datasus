const soap = require('soap');

var url = 'http://servicos.saude.gov.br/cadsus/CadsusService/v5r0?wsdl';

const options = {
  forceSoap12Headers: true,
};

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

soap.createClient(url, options, function(err, client) {
  if(err) return console.log(err);
  
  client.setSecurity(new soap.WSSecurity('CNES.PUBLICO', 'cnes#2015public', { hasTimeStamp: false, hasTokenCreated: false, mustUnderstand: true }));

  const args = {
    'CNESUsuario': {
      'CNES': '?',
      'Usuario': 'CADSUS.UNIFESP.SP',
      'Senha': '-Watzct-78U_R-5-P-2D9ZDj5i3w8_',
    },
    'FiltroPesquisa': {
      'CPF': {
        'numeroCPF': '70120981475'
      },
      'tipoPesquisa': 'APROXIMADA',
    },
    'higienizar': '0'
  }

  client.pesquisar(args, function(err, result, rawResponse, soapHeader, rawRequest) {
    
    console.log(result);

  });

});