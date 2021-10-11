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
    weight: {
      edge_metric_name: "weight",
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
  },
  node_size: {
    eigen_centrality: {
      node_metric_name: "eigen_centrality",
      reverse: false,
      domain: { data: "node-data", field: "eigen_centrality" },
      range: [100, 2000],
    },
  },
};
