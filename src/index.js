import cloneDeep from "lodash.clonedeep";
export { cloneDeep };
export {
  bayes_factor_to_prob,
  prob_to_bayes_factor,
  prob_to_log2_bayes_factor,
  log2_bayes_factor_to_prob,
  log2,
} from "./match_weight.js";

export { d } from "./bayes_factor_chart.js";

export { get_waterfall_chart_data } from "./waterfall_data.js";

export {
  force_directed_spec,
  set_edge_colour_metric,
} from "./force_directed_chart.js";
