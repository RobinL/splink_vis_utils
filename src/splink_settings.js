class Comparison {
  constructor(cc) {
    this.original_dict = cc;
  }

  get name() {
    return this.original_dict["column_name"];
  }

  get columns_used() {
    if (this.is_custom_column) {
      return this.original_dict.custom_columns_used;
    } else {
      return [this.original_dict.col_name];
    }
  }

  get column_case_expression_lookup() {
    let expr = this.original_dict["case_expression"];
    let parsed = parse_case_expression(expr);
    let fmt = format_parsed_expression(parsed);
    if (!("0" in fmt)) {
      fmt["0"] = "else 0";
    }
    return fmt;
  }

  get_case_expression_for_level(level) {
    return this.column_case_expression_lookup[level];
  }

  get m_probabilities() {
    return this.original_dict["m_probabilities"];
  }

  get u_probabilities() {
    return this.original_dict["u_probabilities"];
  }

  data_from_row(edge_row_as_dict) {
    let data = {
      left: [],
      right: [],
    };
    this.columns_used.forEach((col) => {
      let left_data = {
        col_name: col,
        col_value: edge_row_as_dict[`${col}_l`],
      };
      let right_data = {
        col_name: col,
        col_value: edge_row_as_dict[`${col}_r`],
      };
      data["left"].push(left_data);
      data["right"].push(right_data);
    });
    return data;
  }

  concat_data_from_row(edge_row_as_dict) {
    let left_right_data = this.data_from_row(edge_row_as_dict);

    let left_data = left_right_data["left"];
    let right_data = left_right_data["right"];

    left_data = left_data.map((d) => d.col_value);
    left_data = left_data.filter((d) => d != null);
    left_data = left_data.join(" | ");

    right_data = right_data.map((d) => d.col_value);
    right_data = right_data.filter((d) => d != null);
    right_data = right_data.join(" | ");

    return {
      left: left_data,
      right: right_data,
    };
  }

  level_from_row(edge_row_as_dict) {
    let key = "gamma_" + this.name;
    return edge_row_as_dict[key];
  }

  case_expression_from_row(edge_row_as_dict) {
    let lev = this.level_from_row(edge_row_as_dict);
    return this.get_case_expression_for_level(lev);
  }
}

class SplinkSettings {
  constructor(settings_json) {
    const s = JSON.parse(settings_json);
    this.settings_dict = s;
  }

  get comparisons() {
    let comparisons = this.settings_dict["comparisons"];
    return comparisons.map((d) => {
      return new Comparison(d);
    });
  }

  get comparison_column_lookup() {
    let lookup = {};

    this.comparison_columns.forEach((cc) => {
      lookup[cc.name] = cc;
    });

    return lookup;
  }

  get cols_used_by_model() {
    const ccs = this.comparison_columns;
    let cols_in_use = [];
    ccs.forEach((cc) => {
      cc.columns_used.forEach((used_col) => {
        if (cols_in_use.indexOf(used_col) == -1) {
          cols_in_use.push(used_col);
        }
      });
    });
    return cols_in_use;
  }

  get cols_used_by_model_inc_add_to_retain() {
    let all_cols = [];
    if (this.settings_dict.link_type == "dedupe_only") {
      all_cols.push(this.settings_dict.unique_id_column_name);
    } else {
      all_cols.push(this.settings_dict.unique_id_column_name);
      all_cols.push(this.settings_dict.source_dataset_column_name);
    }

    let ccs = this.cols_used_by_model;
    all_cols.push(...ccs);

    if ("additional_columns_to_retain" in this.settings_dict) {
      all_cols.push(...this.settings_dict["additional_columns_to_retain"]);
    }

    let cols_in_order_deduped = [];
    all_cols.forEach((col) => {
      if (cols_in_order_deduped.indexOf(col) == -1) {
        cols_in_order_deduped.push(col);
      }
    });

    return cols_in_order_deduped;
  }

  get_col_by_name(col_name) {
    return this.comparison_column_lookup[col_name];
  }
}

export { SplinkSettings, Comparison };

function parse_case_expression(case_expr) {
  const case_regex = /when[\s\S]+?then[\s\S]+?(\-?[012345678])/gi;
  let matches = case_expr.matchAll(case_regex);
  matches = [...matches];

  let results = {};
  matches.forEach((d) => {
    const key = d[1];

    if (key in results) {
      results[key].push(d[0]);
    } else {
      results[key] = [d[0]];
    }
  });

  return results;
}

function format_parsed_expression(parsed_case_expression) {
  let formatted_expressions = {};

  Object.entries(parsed_case_expression).forEach((k) => {
    formatted_expressions[k[0]] = k[1].join("\n");
  });

  return formatted_expressions;
}
