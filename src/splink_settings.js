class SplinkSettings {
  constructor(settings_json) {
    const s = JSON.parse(settings_json);
    Object.assign(this, s);
  }
}

export { SplinkSettings };
