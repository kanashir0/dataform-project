// Read more in the JS API documentation here: https://docs.dataform.co/guides/javascript/js-api
var operationConfigs = tableConfigurations.analyticsOperations;

operationConfigs.forEach(opCfg => {
  var opVars = queryVars.analyticsOpVars[opCfg.name];
  
  var opQuery = (ctx) => {
    if (opVars.refs.length > 0) {
      opVars.refs.forEach(ref => {
        opVars[`ref-${ref}`] = ctx.ref(ref);
      });
    };

    return queries.getAnalyticsOpQuery(opCfg.name, opVars);
  };
  
  operate(opCfg.name).queries(opQuery).config(opCfg);
});
