import cloneDeep from "lodash.clonedeep";
export { cloneDeep };

import { Runtime, Inspector } from "@observablehq/runtime";
export { Runtime, Inspector };

import { select, checkbox, range } from "@observablehq/inputs";
export { select, checkbox, range };

import define from "@robinl/to-embed-in-splink-outputs";
export { define };

export {
  bayes_factor_to_prob,
  prob_to_bayes_factor,
  prob_to_log2_bayes_factor,
  log2_bayes_factor_to_prob,
  log2,
} from "./match_weight.js";

// export { d } from "./bayes_factor_chart.js";

export { get_waterfall_chart_data } from "./waterfall_data.js";

export { ForceDirectedChart } from "./force_directed_chart.js";

export { SplinkSettings, ComparisonColumn } from "./splink_settings.js";

export {
  format_nodes_data_for_force_directed,
  format_edges_data_for_force_directed,
  get_unique_cluster_ids_from_nodes_data,
  filter_nodes_with_cluster_id,
  filter_edges_with_cluster_id,
} from "./format_force_directed_data.js";

export { get_waterfall_chart_spec } from "./waterfall_chart.js";

export {
  node_row_to_table,
  edge_row_to_table,
  comparison_column_table,
} from "./row_to_table.js";

export { table } from "./table.js";

export { detect_node_metrics, detect_edge_metrics } from "./detect_cols.js";

export { metric_vis_args } from "./metric_args.js";
