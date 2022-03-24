import { SplinkSettings } from "./splink_settings.js";
import { table } from "./table.js";

export function node_row_to_table(node_as_dict, splink_settings) {
  const first_cols = splink_settings.cols_used_by_model_inc_add_to_retain;
  let all_cols = Object.keys(node_as_dict);

  all_cols = all_cols.filter(function (el) {
    return !first_cols.includes(el);
  });

  let cols = first_cols.concat(all_cols);

  let d2 = {};
  cols.forEach((c) => {
    d2[c] = node_as_dict[c];
  });

  return table([d2], { layout: "auto" });
}

export function edge_row_to_table(edge_as_dict, splink_settings) {
  const cols_in_use = splink_settings.cols_used_by_model;
  const row_1 = {};
  const row_2 = {};

  let col_priority = { 2: [], 1: [], 0: [] };

  cols_in_use.forEach((col) => {
    let l_val = edge_as_dict[col + "_l"];
    let r_val = edge_as_dict[col + "_r"];

    row_1[col] = edge_as_dict[col + "_l"];
    row_2[col] = edge_as_dict[col + "_r"];

    if (l_val && r_val) {
      col_priority[2].push(col);
    } else if (l_val || r_val) {
      col_priority[1].push(col);
    } else {
      col_priority[0].push(col);
    }
  });

  col_priority = col_priority[2]
    .concat(col_priority[1])
    .concat(col_priority[0]);

  let row_1_ordered = {};
  let row_2_ordered = {};
  col_priority.forEach((col) => {
    row_1_ordered[col] = row_1[col];
    row_2_ordered[col] = row_2[col];
  });
  let table_data = [row_1_ordered, row_2_ordered];

  return table(table_data, { layout: "auto" });
}

export function comparison_column_table(edge_as_dict, splink_settings) {
  // let splink_settings = new SplinkSettings
  let ccs = splink_settings.comparisons;

  let rows = [];

  ccs.forEach((cc) => {
    let this_row = {};
    this_row["comparison_column_name"] = cc.name;

    let expr = cc.case_expression_from_row(edge_as_dict);
    let data = cc.concat_data_from_row(edge_as_dict);

    this_row["data_left"] = data["left"];

    this_row["data_right"] = data["right"];
    this_row["case expression"] = expr;

    rows.push(this_row);
  });
  return table(rows, { layout: "auto" });
}

export function single_cluster_table(cluster_as_dict) {
  let rows = [];
  rows.push(cluster_as_dict);
  return table(rows, { layout: "auto" });
}
