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
}

export { SplinkSettings };
