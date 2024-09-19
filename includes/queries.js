// Read more in the JS API documentation here: https://docs.dataform.co/guides/javascript/js-api
module.exports = {
  getStagingQuery,
  getStagingOpQuery,
  getAnalyticsQuery,
  getAnalyticsOpQuery
};

var stagingQueries = {
  staging
};

var stagingOpQueries = {
  stagingOp,
  stagingPartitionOp
};

var analyticsQueries = {
  realtime,
  historical,
  historical_avg_minute
};

var analyticsOpQueries = {
  realtimeOp,
  historicalOp,
  realtimePartitionOp,
  historicalPartitionOp
};

function staging(ctx, vars) {
  return `
  SELECT *
  FROM ${vars['ref-my-bq-table']}
  ${ctx.when(ctx.incremental(),
    `WHERE DATE(partitionTs) >= DATE_SUB(CURRENT_DATE('UTC'), INTERVAL ${vars['scanRange']} DAY)`
    ,
    `WHERE column = 'value'`
  )}`
}

function stagingOp(vars) {
  return `
  MERGE ${vars['ref-table1']} T
  USING (
  SELECT *
  FROM ${vars['ref-table']}
  WHERE DATE(partitionTs) >= DATE_SUB(CURRENT_DATE('UTC'), INTERVAL ${vars['scanRange']} DAY))
  `
}


function realtime(ctx, vars) {
  return `
  SELECT
    *
  FROM ${vars['ref-table']}
  ${ctx.when(ctx.incremental(),
    `WHERE DATE(partitionTs) >= DATE_SUB(CURRENT_DATE('UTC'), INTERVAL ${vars['scanRange']} DAY)`)}
  `
}

function historical(ctx, vars) {
  return `
  SELECT
    *
  FROM ${vars['ref-table']}
  ${ctx.when(ctx.incremental(), `WHERE DATE(data_minuto) >= DATE_SUB(CURRENT_DATE('UTC'), INTERVAL ${vars['scanRange']} DAY)`)}
  `
}

function realtimeOp(vars) {
  return `SELECT * FROM`
}

function historicalOp(vars) {
  return `SELECT * FROM`
}

function stagingPartitionOp(vars) {
  return `
  ALTER TABLE ${vars["ref-staging"]}
  SET OPTIONS (
    partition_expiration_days=3660
  )`
}

function realtimePartitionOp(vars) {
  return `
  ALTER TABLE ${vars["ref-realtime"]}
  SET OPTIONS (
    partition_expiration_days=90
  )`
}

function getAnalyticsQuery(ctx, name, vars) {
  return analyticsQueries[name](ctx, vars);
}

function getStagingQuery(ctx, name, vars) {
  return stagingQueries[name](ctx, vars);
}

function getStagingOpQuery(name, vars) {
  return stagingOpQueries[name](vars);
}

function getAnalyticsOpQuery(name, vars) {
  return analyticsOpQueries[name](vars);
}
