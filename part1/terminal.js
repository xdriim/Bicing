var request = require("request");

//Comprova que en aquesta url tenim un array d'objectes
var options = {
  method: "GET",
  url: "https://opendata-ajuntament.barcelona.cat/data/api/action/datastore_search?resource_id=f59e276c-1a1e-4fa5-8c89-8a8a56e56b34",
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  //En la variable body tenim la resposta
  //pero la rebem amb format txt
  console.log(typeof body);
  var elMeuArray = JSON.parse(body);
  console.log(typeof elMeuArray);
  //I si no tu creus ....

  var bicis = [];
  elMeuArray.result.records.forEach((element) => {
    if (element.bikes > 10) {
      var bici = [];
      //console.log(element.streetName);
      bici.push(element.streetName);
      bici.push(element.latitude);
      bici.push(element.longitude);
      bici.push(element.bikes);

      bicis.push(bici);
    }
  });
  console.table(bicis);
});
