// import { force_directed_spec } from "./dist/splink_vis_utils.js";
import { get_waterfall_chart_data } from "./src/waterfall_data.js";
import { SplinkSettings } from "./src/splink_settings.js";

// svu = require("./dist/splink_vis_utils.js");
// let nodes_data = [{ node_id: 1 }, { node_id: 2 }];
// let edges_data = [{ src: 1, dst: 2 }];

// let a = force_directed_spec(nodes_data, edges_data);
// let b = a;

let sel_edge = {
  tf_adjusted_match_prob: 0.9999017555,
  match_probability: 0.994335954,
  source_dataset_l: "df_2",
  unique_id_l: 249,
  source_dataset_r: "df_2",
  unique_id_r: 250,
  first_name_l: "Freddi ",
  first_name_r: null,
  gamma_first_name: -1,
  surname_l: "Lewis",
  surname_r: "Lewis",
  gamma_surname: 2,
  dob_l: "1971-12-19",
  dob_r: "1971-12-19",
  gamma_dob: 1,
  email_l: "tyler28@wecveralvarez.aom",
  email_r: "tyler28@weaver-alvarez.com",
  gamma_email: 0,
  group_l: 63,
  group_r: 63,
  cluster_medium_l: 3,
  cluster_medium_r: 3,
};

let splink_settings = {
  link_type: "link_and_dedupe",
  blocking_rules: ["l.city = r.city"],
  comparison_columns: [
    {
      col_name: "first_name",
      num_levels: 3,
      term_frequency_adjustments: true,
      gamma_index: 0,
      data_type: "string",
      fix_u_probabilities: false,
      fix_m_probabilities: false,
      case_expression:
        "case\n    when (first_name_l is null or first_name_r is null) then -1\n    when jaro_winkler_sim(first_name_l, first_name_r) >= 1.0 then 2\n    when jaro_winkler_sim(first_name_l, first_name_r) >= 0.88 then 1\n    else 0 end as gamma_first_name",
      m_probabilities: [
        0.36731645464897156, 0.17439667880535126, 0.4582868814468384,
      ],
      u_probabilities: [
        0.9930018782615662, 0.0028558988124132156, 0.0041422066278755665,
      ],
    },
    {
      col_name: "surname",
      num_levels: 3,
      term_frequency_adjustments: true,
      gamma_index: 1,
      data_type: "string",
      fix_u_probabilities: false,
      fix_m_probabilities: false,
      case_expression:
        "case\n    when (surname_l is null or surname_r is null) then -1\n    when jaro_winkler_sim(surname_l, surname_r) >= 1.0 then 2\n    when jaro_winkler_sim(surname_l, surname_r) >= 0.88 then 1\n    else 0 end as gamma_surname",
      m_probabilities: [
        0.34741583466529846, 0.12415848672389984, 0.5284256935119629,
      ],
      u_probabilities: [
        0.9902822375297546, 0.0029645985923707485, 0.006753162480890751,
      ],
    },
    {
      col_name: "dob",
      gamma_index: 2,
      num_levels: 2,
      data_type: "string",
      term_frequency_adjustments: false,
      fix_u_probabilities: false,
      fix_m_probabilities: false,
      case_expression:
        "case\n    when dob_l is null or dob_r is null then -1\n    when dob_l = dob_r then 1\n    else 0 end as gamma_dob",
      m_probabilities: [0.3700525462627411, 0.6299474835395813],
      u_probabilities: [0.996875524520874, 0.0031245029531419277],
    },
    {
      col_name: "email",
      gamma_index: 3,
      num_levels: 2,
      data_type: "string",
      term_frequency_adjustments: false,
      fix_u_probabilities: false,
      fix_m_probabilities: false,
      case_expression:
        "case\n    when email_l is null or email_r is null then -1\n    when email_l = email_r then 1\n    else 0 end as gamma_email",
      m_probabilities: [0.2865733206272125, 0.7134267091751099],
      u_probabilities: [0.9964072108268738, 0.00359280314296484],
    },
  ],
  additional_columns_to_retain: ["group"],
  em_convergence: 0.0001,
  source_dataset_column_name: "source_dataset",
  unique_id_column_name: "unique_id",
  retain_matching_columns: true,
  retain_intermediate_calculation_columns: false,
  max_iterations: 25,
  proportion_of_matches: 0.03724955394864082,
};

let ss = new SplinkSettings(JSON.stringify(splink_settings));

let d = get_waterfall_chart_data(sel_edge, ss);
console.log(d);
