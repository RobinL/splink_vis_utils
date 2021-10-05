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
}

export { SplinkSettings };
