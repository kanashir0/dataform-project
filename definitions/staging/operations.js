// Read more in the JS API documentation here: https://docs.dataform.co/guides/javascript/js-api
var operationConfigs = tableConfigurations.stagingOperations;

operationConfigs.forEach(opCfg => {
  var opVars = queryVars.stagingOpVars[opCfg.name];
  
  var opQuery = (ctx) => {
    if (opVars.refs.length > 0) {
      opVars.refs.forEach(ref => {
        opVars[`ref-${ref}`] = ctx.ref(ref);
      });
    };

    return queries.getStagingOpQuery(opCfg.name, opVars);
  };
  
  operate(opCfg.name).queries(opQuery).config(opCfg);
});
