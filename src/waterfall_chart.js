import * as base_spec from "./specs/waterfall.json";

import cloneDeep from "lodash.clonedeep";

export function get_waterfall_chart_spec(data, overrides, simplified = false) {
  let base_spec_2 = cloneDeep(base_spec);

  base_spec_2.data.values = data;
  let spec = { ...base_spec_2, ...overrides };
  if (simplified) {
    // Remove right hand axis
    spec["layer"][1]["encoding"]["y"]["axis"] = false;

    // Remove bayes factor text overlays
    // spec["layer"][0]["layer"].splice(2, 1);
    spec["layer"][0]["layer"][2]["encoding"]["text"] = {
      type: "nominal",
      field: "up_down_emoji",
    };
    spec["layer"][0]["layer"][2]["encoding"]["opacity"] = {
      condition: {
        value: 0,
        test: "datum.column_name == 'Final score' || datum.column_name == 'Prior'",
      },
    };

    // Make left hand side axis probability
    let expr = "format(1 / (1 + pow(2, -1*datum.value)), '.2r')";
    spec["layer"][0]["layer"][1]["encoding"]["y"]["axis"]["labelExpr"] = expr;
    spec["layer"][0]["layer"][1]["encoding"]["y"]["axis"]["title"] =
      "probability";

    // Tooltip

    spec["layer"][0]["layer"][1]["encoding"]["tooltip"] = [
      {
        type: "quantitative",
        field: "prob",
        format: ".3r",
        title: "Cumulative match probability",
      },
    ];
  }

  return spec;
}
