export function get_waterfall_chart_data(
  row,
  splink_settings,
  term_freqs = {}
) {
  let lambda_row = get_waterfall_data_lambda_row(splink_settings);
  let waterfall_data_other_rows = get_waterfall_data_other_rows(
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
