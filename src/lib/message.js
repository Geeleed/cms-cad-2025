// Thin proxy — set by AntdProvider after App context is ready
let _api = null;

export function _setMessageApi(api) {
  _api = api;
}

export const message = {
  error:   (...a) => _api?.error(...a),
  success: (...a) => _api?.success(...a),
  warning: (...a) => _api?.warning(...a),
  info:    (...a) => _api?.info(...a),
  loading: (...a) => _api?.loading(...a),
};
