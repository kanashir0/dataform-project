// Read more in the JS API documentation here: https://docs.dataform.co/guides/javascript/js-api
var tableConfigs = tableConfigurations.stagingTables;

tableConfigs.forEach(tableCfg => {
  var tableVars = queryVars.stagingVars[tableCfg.name];

  var tableQuery = (ctx) => {
    if (tableVars.refs.length > 0) {
      tableVars.refs.forEach(ref => {
        tableVars[`ref-${ref}`] = ctx.ref(ref);
      });
    }

    return queries.getStagingQuery(ctx, tableCfg.name, tableVars);
  }

  publish(tableCfg.name).type(tableCfg.type).query(tableQuery).config(tableCfg);
});
