export function detect_node_metrics(data) {
  const node_metrics = new Map([["None", "none"]]);
  const keys = Object.keys(data[0]);

  if (keys.includes("eigen_centrality")) {
    node_metrics.set("Eigen Centrality", "eigen_centrality");
  }

  return node_metrics;
}

export function detect_edge_metrics(data) {
  const node_metrics = new Map();
  const keys = Object.keys(data[0]);

  if (keys.includes("match_probability")) {
    node_metrics.set("Match probability", "match_probability");
  }

  if (keys.includes("weight")) {
    node_metrics.set("Match weight (log2 bayes factor)", "weight");
  }

  if (keys.includes("tf_adjusted_match_prob")) {
    node_metrics.set("TF adjusted match probability", "tf_adjusted_match_prob");
  }

  if (keys.includes("edge_betweenness")) {
    node_metrics.set("Edge betweenness", "edge_betweenness");
  }

  if (keys.includes("is_bridge")) {
    node_metrics.set("Is bridge", "is_bridge");
  }

  return node_metrics;
}
