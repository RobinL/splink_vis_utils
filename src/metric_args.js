export const metric_vis_args = {
  edge_colour: {
    match_probability: {
      edge_metric_name: "match_probability",
      reverse: false,
      domain: [0, 1],
      range: { scheme: "redyellowgreen" },
    },
    tf_adjusted_match_prob: {
      edge_metric_name: "tf_adjusted_match_prob",
      reverse: false,
      domain: [0, 1],
      range: { scheme: "redyellowgreen" },
    },
    match_weight: {
      edge_metric_name: "match_weight",
      reverse: false,
      domain: [-20, 20],
      range: { scheme: "redyellowgreen" },
    },
    edge_betweenness: {
      edge_metric_name: "edge_betweenness",
      reverse: true,
      domain: [0, 1],
      range: { scheme: "redyellowgreen" },
    },
    is_bridge: {
      edge_metric_name: "is_bridge",
      reverse: true,
      domain: [0, 1],
      range: { scheme: "redyellowgreen" },
    },
    is_false_positive: {
      edge_metric_name: "is_false_positive",
      reverse: true,
      domain: [0, 1],
      range: { scheme: "redyellowgreen" },
    },
  },
  node_size: {
    eigen_centrality: {
      node_metric_name: "eigen_centrality",
      reverse: false,
      domain: { data: "node-data", field: "eigen_centrality" },
      range: [100, 2000],
    },
  },
  node_colour: {
    ground_truth_cluster: {
      node_metric_name: "ground_truth_cluster",

      domain: { data: "node-data", field: "ground_truth_cluster" },
      range: { scheme: "category10" },
    },
    source_dataset: {
      node_metric_name: "source_dataset",

      domain: { data: "node-data", field: "source_dataset" },
      range: { scheme: "category10" },
    },
  },
};
