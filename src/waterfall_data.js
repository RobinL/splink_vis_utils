import {
  prob_to_bayes_factor,
  prob_to_log2_bayes_factor,
  log2,
} from "./match_weight.js";

function get_waterfall_row_single_column(
  gamma_key,
  row,
  splink_settings,
  term_freqs
) {
  let key = gamma_key;
  let gamma_value = row[key];
  let col_name = key.replace("gamma_", "");
  let cc_lookup = splink_settings.comparison_column_lookup();
  let this_cc = cc_lookup[col_name];

  let value_l = row[col_name + "_l"];
  let value_r = row[col_name + "_r"];

  let u_probability, m_probability;
  if (gamma_value == -1) {
    u_probability = 0.5;
    m_probability = 0.5;
  } else {
    u_probability = this_cc["u_probabilities"][gamma_value];
    m_probability = this_cc["m_probabilities"][gamma_value];

    if (value_l == value_r) {
      if (col_name in term_freqs) {
        let tfs = term_freqs[col_name];
        u_probability = tfs[value_l] || u_probability;
      }
    }
  }

  let bayes_factor = m_probability / u_probability;

  return {
    bayes_factor: bayes_factor,
    column_name: col_name,
    gamma_column_name: "𝛾_" + col_name,
    gamma_index: gamma_value,

    level_name: "level_" + gamma_value,

    log2_bayes_factor: log2(bayes_factor),
    m_probability: m_probability,

    num_levels: null,
    u_probability: u_probability,
    value_l: value_l,
    value_r: value_r,
  };
}

function get_waterfall_data_comparison_columns(
  row,
  splink_settings,
  term_freqs
) {
  let keys = Object.keys(row);
  keys = keys.filter((key) => key.includes("gamma_"));
  return keys.map((gamma_key) =>
    get_waterfall_row_single_column(gamma_key, row, splink_settings, term_freqs)
  );
}

function get_waterfall_data_lambda_row(splink_settings) {
  let row = {
    bayes_factor: prob_to_bayes_factor(splink_settings.proportion_of_matches),
    column_name: "Prior",
    gamma_column_name: "",
    gamma_index: "",

    level_name: null,

    log2_bayes_factor: prob_to_log2_bayes_factor(
      splink_settings.proportion_of_matches
    ),
    m_probability: null,

    num_levels: null,
    u_probability: null,
    value_l: "",
    value_r: "",
  };

  return row;
}

function get_waterfall_data_final_row(splink_settings) {
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
