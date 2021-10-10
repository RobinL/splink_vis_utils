class SplinkSettings {
  constructor(settings_json) {
    const s = JSON.parse(settings_json);
    Object.assign(this, s);
  }

  comparison_column_lookup() {
    let lookup = {};

    this.comparison_columns.forEach((d) => {
      let col_name;
      if ("custom_name" in d) {
        col_name = d["custom_name"];
      } else {
        col_name = d["col_name"];
      }
      lookup[col_name] = d;
    });

    return lookup;
  }

  cols_used_by_model() {
    const ccs = this.comparison_columns;
    let cols_in_use = [];
    ccs.forEach((cc) => {
      if ("custom_name" in cc) {
        cc["custom_columns_used"].forEach((col) => {
          if (!cols_in_use.includes(col)) {
            cols_in_use.push(col);
          }
        });
      } else {
        if (!cols_in_use.includes(cc["col_name"])) {
          cols_in_use.push(cc["col_name"]);
        }
      }
    });

    return cols_in_use;
  }

  get_col_by_name(col_name) {
    return this.comparison_column_lookup()[col_name];
  }

  column_case_expression_lookup(col_name) {
    let col = this.get_col_by_name(col_name);
    let parsed = parse_case_expression(col["case_expression"]);
    let fmt = format_parsed_expression(parsed);
    return fmt;
  }
}

export { SplinkSettings };

function parse_case_expression(case_expr) {
  const case_regex = /when.+?then.+?(\-?[012345678])/gi;
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
    debugger;
    formatted_expressions[k[0]] = k[1].join("\n");
  });

  return formatted_expressions;
}
