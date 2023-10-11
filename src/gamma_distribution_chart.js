import base_spec from "./specs/gamma_distribution.json";

import cloneDeep from "lodash.clonedeep";

function sort_match_weight(a, b) {
  return a.match_weight - b.match_weight;
}

function sort_sum_matches(a, b) {
  return a.sum_matches - b.sum_matches;
}

export function get_gamma_distribution_chart(
  data,
  ss_object,
  width,
  sort_bars = "sort_match_weight"
) {
  let base_spec_2 = cloneDeep(base_spec);
  let sort_field;
  data.forEach((d) => {
    d.sum_matches = d.match_probability * d.count;
  });
  if (sort_bars == "sort_match_weight") {
    data.sort(sort_match_weight);
    sort_field = "match_weight";
  }
  if (sort_bars == "sort_sum_matches") {

    data.sort(sort_sum_matches);
    sort_field = "sum_matches";
  }

  let gamma_data = gamma_table_data(data, ss_object);

  base_spec_2.data.values = data;
  base_spec_2.vconcat[1]["layer"][0].data.values = gamma_data;
  base_spec_2.vconcat[1]["layer"][1].data.values = gamma_data;

  base_spec_2.vconcat[0].width = width;
  base_spec_2.vconcat[1]["layer"][0].width = width;
  base_spec_2.vconcat[1]["layer"][1].width = width;
  base_spec_2.vconcat[2].width = width;

  base_spec_2.vconcat[0]["encoding"]["x"]["sort"]["field"] = sort_field;
  base_spec_2.vconcat[1]["layer"][0]["encoding"]["x"]["sort"]["field"] =
    sort_field;
  base_spec_2.vconcat[1]["layer"][1]["encoding"]["x"]["sort"]["field"] =
    sort_field;
  base_spec_2.vconcat[2]["encoding"]["x"]["sort"]["field"] = sort_field;

  return base_spec_2;
}

function gamma_table_data(data, ss_object) {
  let gamma_keys = Object.keys(data[0]);

  let result_data = [];
  gamma_keys = gamma_keys.filter((d) => d.startsWith("gamma_"));

  let counter = 0;
  data.forEach((d) => {
    counter += 1;
    let gam_key_counter = 0;
    gamma_keys.forEach((k) => {
      let data_col_name = k.replace("gamma_", "");
      let settings_col = ss_object.get_col_by_name(data_col_name);
      let num_levels = settings_col.num_levels;

      let row = {};
      row["gam_name"] = k;
      row["gam_value"] = d[k];

      row["gam_concat"] = d["gam_concat"];
      row["gam_concat_id"] = counter;
      row["gam_key_count"] = gam_key_counter;
      row["bayes_factor"] = d[`bf_${data_col_name}`];
      const log2 = Math.log2;
      row["match_weight"] = log2(d[`bf_${data_col_name}`]);

      row["label_for_charts"] = settings_col.comparison_level_lookup[row["gam_value"]]["label_for_charts"]
      row["sql_condition"] = settings_col.comparison_level_lookup[row["gam_value"]]["sql_condition"]
      result_data.push(row);
      gam_key_counter += 1;
    });
  });
  return result_data;
}
