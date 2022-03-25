import cloneDeep from "lodash.clonedeep";
import {
  prob_to_bayes_factor,
  prob_to_log2_bayes_factor,
  log2,
} from "./match_weight.js";

function get_waterfall_row_single_column(gamma_key, row, splink_settings) {
  let rows_for_column = [];
  let key = gamma_key;
  let gamma_value = row[key];
  let col_name = key.replace("gamma_", "");

  let this_cc = splink_settings.get_col_by_name(col_name);
  let this_cl = this_cc.get_comparison_level(gamma_value);

  let value_l = row[col_name + "_l"];
  let value_r = row[col_name + "_r"];

  let bayes_factor = row["bf_" + col_name];

  let single_row = {
    bayes_factor: bayes_factor,
    column_name: col_name,
    gamma_column_name: "𝛾_" + col_name,
    gamma_index: gamma_value,

    level_name: "level_" + gamma_value,

    log2_bayes_factor: log2(bayes_factor),
    m_probability: this_cl["m_probability"],

    num_levels: this_cc.num_levels,
    u_probability: this_cl["u_probability"],
    value_l: value_l,
    value_r: value_r,
    sql_condition: this_cl.sql_condition,
  };
  rows_for_column.push(single_row);

  // If there's a term frequency adjustment for this column, we need a second row

  let bf_tf_col_name = "bf_tf_adj_" + col_name;
  if (bf_tf_col_name in row) {
    let tf_row = cloneDeep(single_row);
    tf_row["column_name"] = "tf_" + col_name;
    bayes_factor = row[bf_tf_col_name];
    tf_row["bayes_factor"] = bayes_factor;
    tf_row["log2_bayes_factor"] = log2(bayes_factor);
    tf_row["m_probability"] = null;
    tf_row["u_probability"] = null;

    rows_for_column.push(tf_row);
  }
  return rows_for_column;
}

function get_waterfall_data_comparison_columns(
  row,
  splink_settings,
  term_freqs
) {
  let keys = Object.keys(row);
  keys = keys.filter((key) => key.startsWith("gamma_"));

  let column_rows = [];
  keys.forEach((gamma_key) => {
    let rows = get_waterfall_row_single_column(
      gamma_key,
      row,
      splink_settings,
      term_freqs
    );
    column_rows.push(...rows);
  });
  return column_rows;
}

function get_waterfall_data_lambda_row(splink_settings) {
  let row = {
    bayes_factor: prob_to_bayes_factor(
      splink_settings.settings_dict.proportion_of_matches
    ),
    column_name: "Prior",
    gamma_column_name: "",
    gamma_index: "",

    level_name: null,

    log2_bayes_factor: prob_to_log2_bayes_factor(
      splink_settings.settings_dict.proportion_of_matches
    ),
    m_probability: null,

    num_levels: null,
    u_probability: null,
    value_l: "",
    value_r: "",
  };

  return row;
}

function get_waterfall_data_final_row() {
  let row = {
    bayes_factor: null,
    column_name: "Final score",
    gamma_column_name: "",
    gamma_index: "",

    level_name: null,

    log2_bayes_factor: null,
    m_probability: null,

    num_levels: null,
    u_probability: null,
    value_l: "",
    value_r: "",
  };

  return row;
}

export function get_waterfall_chart_data(
  row,
  splink_settings,
  term_freqs = {}
) {
  let lambda_row = get_waterfall_data_lambda_row(splink_settings);
  let waterfall_data_other_rows = get_waterfall_data_comparison_columns(
    row,
    splink_settings,
    term_freqs
  );

  let rows_except_final = [lambda_row].concat(waterfall_data_other_rows);
  let final_row = get_waterfall_data_final_row(splink_settings);

  let cumulative_log2_bayes_factor = rows_except_final.reduce(
    (a, b) => a + b["log2_bayes_factor"],
    0
  );

  final_row["bayes_factor"] = 2 ** cumulative_log2_bayes_factor;
  final_row["log2_bayes_factor"] = cumulative_log2_bayes_factor;

  return rows_except_final.concat([final_row]);
}
