export function detect_node_size_metrics(data) {
  const node_metrics = new Map([["None", "none"]]);
  const keys = Object.keys(data[0]);

  if (keys.includes("eigen_centrality")) {
    node_metrics.set("Eigen Centrality", "eigen_centrality");
  }

  return node_metrics;
}

export function detect_node_colour_metrics(data) {
  const node_metrics = new Map([["None", "none"]]);
  const keys = Object.keys(data[0]);

  if (keys.includes("ground_truth_cluster")) {
    node_metrics.set("Ground truth cluster", "ground_truth_cluster");
  }

  if (keys.includes("source_dataset")) {
    node_metrics.set("Source dataset", "source_dataset");
  }

  return node_metrics;
}

export function detect_edge_colour_metrics(data) {
  const edge_metrics = new Map();
  const keys = Object.keys(data[0]);

  if (keys.includes("match_probability")) {
    edge_metrics.set("Match probability", "match_probability");
  }

  if (keys.includes("match_weight")) {
    edge_metrics.set("Match weight (log2 bayes factor)", "match_weight");
  }

  if (keys.includes("tf_adjusted_match_prob")) {
    edge_metrics.set("TF adjusted match probability", "tf_adjusted_match_prob");
  }

  if (keys.includes("edge_betweenness")) {
    edge_metrics.set("Edge betweenness", "edge_betweenness");
  }

  if (keys.includes("is_bridge")) {
    edge_metrics.set("Is bridge", "is_bridge");
  }

  if (keys.includes("is_false_positive")) {
    edge_metrics.set("Is false positive", "is_false_positive");
  }

  return edge_metrics;
}
