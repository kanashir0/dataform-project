// Read more in the JS API documentation here: https://docs.dataform.co/guides/javascript/js-api

const stagingTables = [
  {
    type: "incremental",
    name: "my_table",
    schema: "my_dataset",
    database: "my-project",
    tags: ["tag1", "tag2"],
    assertions: {
      nonNull: ["column1", "column2"],
      rowConditions: [
        "column1 >= column2",
        "column1 = 'value'"
      ]
    },
    uniqueKey: [
      "column1",
      "column2"
    ],
    bigquery: {
      partitionBy: "DATETIME_TRUNC(column1, DAY)",
      clusterBy: [
        "column1",
        "column2"
      ],
      updatePartitionFilter: `partitionTs >= TIMESTAMP(DATE_SUB(CURRENT_DATE('UTC'), INTERVAL ${queryVars.stagingVars['staging']['scanRange']} DAY))`,
    },
    columns: {
      column1: "description1",
      column2: "description2",
    }
  }
];

const analyticsTables = [
  {
    type: "incremental",
    name: "my-table",
    schema: "my-dataset",
    database: "my-project",
    tags: ["tag1", "tag2"],
    columns: {
      column1: "description1",
      column2: "description2",
    }
  }
];

const stagingOperations = [
  {
    name: "stagingOp",
    tags: ["stg-op"],
    hasOutput: false
  }
];

const analyticsOperations = [
  {
    name: "realtimeOp",
    tags: ["rt-op"],
    hasOutput: false
  },
  {
    name: "historicalOp",
    tags: ["hist-op"],
    hasOutput: false
  }
];

module.exports = {
  stagingTables,
  analyticsTables,
  stagingOperations,
  analyticsOperations
};