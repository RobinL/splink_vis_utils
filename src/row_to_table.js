import { table } from "@observablehq/inputs";

export function node_row_to_table(node_as_dict) {
  return table([node_as_dict], { layout: "auto" });
}

export function edge_row_to_table(edge_as_dict, splink_settings) {
  const cols_in_use = splink_settings.cols_used_by_model();
  const row_1 = {};
  const row_2 = {};
  cols_in_use.forEach((col) => {
    let l_val = edge_as_dict[col + "_l"];
    let r_val = edge_as_dict[col + "_r"];

    // if (l_val && r_val)
    row_1[col] = edge_as_dict[col + "_l"];
    row_2[col] = edge_as_dict[col + "_r"];
  });
  let table_data = [row_1, row_2];

  return table(table_data, { layout: "auto" });
}
