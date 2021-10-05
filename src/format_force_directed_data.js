export function format_nodes_data_for_force_directed(
  nodes_data,
  splink_settings
) {
  // Create a __node_id field that uniquely identifies the row

  if (splink_settings.link_type == "dedupe_only") {
    let c = splink_settings.unique_id_column_name;
    nodes_data.forEach(function (node) {
      node.__node_id = node[c];
    });
  } else {
    let c = splink_settings.unique_id_column_name;
    let sds = splink_settings.source_dataset_column_name;
    nodes_data.forEach(function (node) {
      node.__node_id = node[sds] + "-__-" + node[c];
    });
  }

  return nodes_data;
}

export function format_edges_data_for_force_directed(
  nodes_data,
  splink_settings
) {
  if (splink_settings.link_type == "dedupe_only") {
    let c = splink_settings.unique_id_column_name;
    nodes_data.forEach(function (node) {
      node.source = node[`${c}_l`];
      node.target = node[`${c}_r`];
    });
  } else {
    let c = splink_settings.unique_id_column_name;
    let sds = splink_settings.source_dataset_column_name;
    nodes_data.forEach(function (node) {
      node.source = node[`${sds}_l`] + "-__-" + node[`${c}_l`];
      node.target = node[`${sds}_r`] + "-__-" + node[`${c}_r`];
    });
  }

  return nodes_data;
}
