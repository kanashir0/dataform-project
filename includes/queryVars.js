// Read more in the JS API documentation here: https://docs.dataform.co/guides/javascript/js-api

const stagingVars = {
  staging: {
    refs: ["my-bq-table"],
    scanRange: 0
  }
};

const stagingOpVars = {
  stagingOp: {
    refs: ["my-bq-table", "staging"],
    scanRange: 7
  },
  stagingPartitionOp: {
    refs: ["staging"],
  }
};

const analyticsVars = {
  realtime: {
    refs: ["realtime"],
    scanRange: 0
  },
  historical: {
    refs: ["historical"],
    scanRange: 0
  },
};

const analyticsOpVars = {
  realtimeOp: {
    refs: ["realtime", "staging"],
    scanRange: 7
  },
  historicalOp: {
    refs: ["realtime", "historical"],
    scanRange: 7
  },
  realtimePartitionOp: {
    refs: ["realtime"]
  },
  historicalPartitionOp: {
    refs: ["historical"]
  }
};

module.exports = {
  stagingVars,
  stagingOpVars,
  analyticsVars,
  analyticsOpVars
};