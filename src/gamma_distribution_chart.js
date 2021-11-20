import * as base_spec from "./specs/gamma_distribution.json";

import cloneDeep from "lodash.clonedeep";

export function get_gamma_distribution_chart(data, ss_object, width) {
  let base_spec_2 = cloneDeep(base_spec);

  let gamma_data = gamma_table_data(data, ss_object);

  base_spec_2.data.values = data;
  base_spec_2.vconcat[1]["layer"][0].data.values = gamma_data;
  base_spec_2.vconcat[1]["layer"][1].data.values = gamma_data;
  base_spec_2.vconcat[1]["layer"][0].width = width;
  base_spec_2.vconcat[1]["layer"][1].width = width;

  base_spec_2.vconcat[0].width = width;

  base_spec_2.vconcat[2].width = width;

  return base_spec_2;
}

function gamma_table_data(data, ss_object) {
  data.sort((a, b) => a.match_weight - b.match_weight);

  let gamma_keys = Object.keys(data[0]);

  let result_data = [];
  gamma_keys = gamma_keys.filter((d) => d.startsWith("gamma_"));
  let counter = 0;
  data.forEach((d) => {
    counter += 1;
    gamma_keys.forEach((k) => {
      let settings_col = ss_object.get_col_by_name(k.replace("gamma_", ""));
      let num_levels = settings_col["original_dict"]["num_levels"];

      let row = {};
      row["gam_name"] = k;
      row["gam_value"] = d[k];
      row["gam_value_norm"] = d[k] == -1 ? null : d[k] / (num_levels - 1);

      row["gam_concat"] = d["gam_concat"];
      row["gam_concat_id"] = counter;
      result_data.push(row);
    });
  });
  return result_data;
}
