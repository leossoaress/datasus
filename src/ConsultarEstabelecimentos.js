const soap = require('soap');
const xml = require('xml-parser');

var url = 'https://servicos.saude.gov.br/cnes/EstabelecimentoSaudeService/v1r0?wsdl';

const options = {
  forceSoap12Headers: true,
};

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

soap.createClient(url, options, function(err, client) {
  if(err) return console.log(err);
  
  client.setSecurity(new soap.WSSecurity('CNES.PUBLICO', 'cnes#2015public', { hasTimeStamp: false, hasTokenCreated: false, mustUnderstand: true }));

  const args = {
    'FiltroPesquisaEstabelecimentoSaude': {
      'CodigoCNES': {
        'codigo': 2821923
      }
    }
  }

  client.consultarEstabelecimentoSaude(args, function(err, result, rawResponse, soapHeader, rawRequest) {    
    console.log(result);
  });

});