export function format_nodes_data_for_force_directed(
  nodes_data,
  splink_settings
) {
  // Create a __node_id field that uniquely identifies the row
  if (splink_settings.settings_dict.link_type == "dedupe_only") {
    let c = splink_settings.settings_dict.unique_id_column_name;
    nodes_data.forEach(function (node) {
      node.__node_id = node[c];
    });
  } else {
    let c = splink_settings.settings_dict.unique_id_column_name;
    let sds = splink_settings.settings_dict.source_dataset_column_name;
    nodes_data.forEach(function (node) {
      node.__node_id = node[sds] + "-__-" + node[c];
    });
  }

  // Create a tooltip field that contains only the info used by the model
  let cols_for_tooltip = splink_settings.cols_used_by_model_inc_add_to_retain;

  nodes_data.forEach(function (node) {
    let tooltip = {};
    debugger;
    cols_for_tooltip.forEach(function (col) {
      tooltip[col] = node[col];
    });
    node.tooltip = tooltip;
  });

  return nodes_data;
}

export function format_edges_data_for_force_directed(
  edge_data,
  splink_settings
) {
  if (splink_settings.settings_dict.link_type == "dedupe_only") {
    let c = splink_settings.settings_dict.unique_id_column_name;
    edge_data.forEach(function (edge) {
      edge.source = edge[`${c}_l`];
      edge.target = edge[`${c}_r`];
    });
  } else {
    let c = splink_settings.settings_dict.unique_id_column_name;
    let sds = splink_settings.settings_dict.source_dataset_column_name;
    edge_data.forEach(function (edge) {
      edge.source = edge[`${sds}_l`] + "-__-" + edge[`${c}_l`];
      edge.target = edge[`${sds}_r`] + "-__-" + edge[`${c}_r`];
    });
  }

  // Create a tooltip field that contains only the info used by the model
  let cols_for_tooltip = splink_settings.cols_used_by_model_inc_add_to_retain;

  edge_data.forEach(function (edge) {
    let tooltip = {};
    debugger;
    cols_for_tooltip.forEach(function (col) {
      if (edge[`${col}_l`] && edge[`${col}_r`]) {
        tooltip[`${col}_l`] = edge[`${col}_l`];
        tooltip[`${col}_r`] = edge[`${col}_r`];
      }
    });
    edge.tooltip = tooltip;
  });

  return edge_data;
}

export function get_unique_cluster_ids_from_nodes_data(
  nodes_data,
  cluster_field
) {
  let cluster_ids = nodes_data.map((d) => d[cluster_field]);
  return [...new Set(cluster_ids)];
}

export function filter_nodes_with_cluster_id(
  nodes_data,
  cluster_field,
  selected_cluster_id
) {
  return nodes_data.filter((d) => d[cluster_field] == selected_cluster_id);
}

export function filter_edges_with_cluster_id(
  edges_data,
  cluster_field,
  selected_cluster_id
) {
  return edges_data
    .filter((d) => d[`${cluster_field}_l`] == selected_cluster_id)
    .filter((d) => d[`${cluster_field}_r`] == selected_cluster_id);
}
