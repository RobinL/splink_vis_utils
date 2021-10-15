import { SplinkSettings } from "./splink_settings.js";
import { table } from "./table.js";

export function node_rows_to_table(nodes_list_of_dicts, splink_settings) {
  const first_cols = splink_settings.cols_used_by_model_inc_add_to_retain;
  let all_cols = Object.keys(nodes_list_of_dicts[0]);

  all_cols = all_cols.filter(function (el) {
    return !first_cols.includes(el);
  });

  let cols = first_cols.concat(all_cols);

  let new_data = nodes_list_of_dicts.map((d) => {
    let d2 = {};
    cols.forEach((c) => {
      d2[c] = d[c];
    });
    return d2;
  });

  return table(new_data, { layout: "auto" });
}
