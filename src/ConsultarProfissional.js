const soap = require('soap');
const xml = require('xml-parser');

var url = 'https://servicos.saude.gov.br/cnes/ProfissionalSaudeService/v1r0?wsdl';

const options = {
  forceSoap12Headers: true,
};

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

soap.createClient(url, options, function(err, client) {
  if(err) return console.log(err);
  
  client.setSecurity(new soap.WSSecurity('CNES.PUBLICO', 'cnes#2015public', { hasTimeStamp: false, hasTokenCreated: false, mustUnderstand: true }));

  const args = {
    'FiltroPesquisaProfissionalSaude': {
      'CPF': {
        'numeroCPF': '09696772432'
      }
    }
  }

  const args2 = {
    'FiltroPesquisaProfissionalSaude': {
      'CNS': {
        'numeroCNS': '898004246128246'
      }
    }
  }

  client.consultarProfissionalSaude(args, function(err, result, rawResponse, soapHeader, rawRequest) {    
    console.log(result);
  });

});