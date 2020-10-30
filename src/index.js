const soap = require('soap');

var url = 'http://servicos.saude.gov.br/cadsus/CadsusService/v5r0?wsdl';

soap.createClient(url, function(err, client) {
  var wsSecurity = new soap.WSSecurity('CNES.PUBLICO', 'cnes#2015public');
  client.setSecurity(wsSecurity);
  console.log(client);
  console.log(err);
});

