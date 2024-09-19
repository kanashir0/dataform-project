// Read more in the JS API documentation here: https://docs.dataform.co/guides/javascript/js-api
var tableConfigs = tableConfigurations.analyticsTables;

tableConfigs.forEach(tableCfg => {
  var tableVars = queryVars.analyticsVars[tableCfg.name];

  var tableQuery = (ctx) => {
    if (tableVars.refs.length > 0) {
      tableVars.refs.forEach(ref => {
        tableVars[`ref-${ref}`] = ctx.ref(ref);
      });
    }
    
    return queries.getAnalyticsQuery(ctx, tableCfg.name, tableVars);
  };

  publish(tableCfg.name).type(tableCfg.type).query(tableQuery).config(tableCfg)
});
