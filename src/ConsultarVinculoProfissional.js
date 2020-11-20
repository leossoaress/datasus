const soap = require('soap');
const xml = require('xml-parser');

var url = 'https://servicos.saude.gov.br/cnes/VinculacaoProfissionalService/v1r0?wsdl';

const options = {
  forceSoap12Headers: true,
};

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

soap.createClient(url, options, function(err, client) {
  if(err) return console.log(err);
  
  client.setSecurity(new soap.WSSecurity('CNES.PUBLICO', 'cnes#2015public', { hasTimeStamp: false, hasTokenCreated: false, mustUnderstand: true }));

  const args = {
    'FiltroPesquisaVinculacaos': {
      'IdentificacaoProfissional': {
        'cpf': {
          'numeroCPF': '09696772432'
        }
      },
      'IdentificacaoEstabelecimento': {
        'cnes': {
          'codigo': '2821923'
        }
      }
    },
    'Paginacao': {
      'registroInicial': '1',
      'quantidadeRegistros': '100',
      'totalRegistros': '100'
    }
  }

  const args2 = {
    'FiltroPesquisaVinculacaos': {
      'IdentificacaoProfissional': {
        'cns': {
          'numeroCNS': '700305433066640'
        }
      },
      'IdentificacaoEstabelecimento': {
        'cnes': {
          'codigo': '2821923'
        }
      }
    },
    'Paginacao': {
      'registroInicial': '1',
      'quantidadeRegistros': '100',
      'totalRegistros': '100'
    }
  }

  client.pesquisarVinculacaoProfissionalSaude(args2, function(err, result, rawResponse, soapHeader, rawRequest) {    
    console.log(result);
  });

});