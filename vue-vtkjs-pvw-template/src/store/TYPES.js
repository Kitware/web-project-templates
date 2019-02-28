function objEnum(names) {
  const obj = {};
  names.forEach((name) => {
    obj[name] = name;
  });
  return obj;
}

// ----------------------------------------------------------------------------
// Getters
// ----------------------------------------------------------------------------

export const Getters = objEnum([
  // busy
  'BUSY_PROGRESS',
  'BUSY_COUNT',

  // index
  'APP_DARK_THEME',

  // network
  'NETWORK_CLIENT',
  'NETWORK_CONFIG',

  // view
  'VIEW_ID',
  'VIEW_PROXY',
  'VIEW_STATS',
  'VIEW_QUALITY_STILL',
  'VIEW_QUALITY_INTERACTIVE',
  'VIEW_RATIO_STILL',
  'VIEW_RATIO_INTERACTIVE',
  'VIEW_FPS_MAX',
  'VIEW_MOUSE_THROTTLE',
]);

// ----------------------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------------------

export const Mutations = objEnum([
  // busy
  'BUSY_PROGRESS_SET',
  'BUSY_COUNT_SET',

  // index
  'APP_DARK_THEME_SET',

  // network
  'NETWORK_CLIENT_SET',
  'NETWORK_CONFIG_SET',

  // view
  'VIEW_ID_SET',
  'VIEW_STATS_SET',
  'VIEW_QUALITY_STILL_SET',
  'VIEW_QUALITY_INTERACTIVE_SET',
  'VIEW_RATIO_STILL_SET',
  'VIEW_RATIO_INTERACTIVE_SET',
  'VIEW_FPS_MAX_SET',
  'VIEW_MOUSE_THROTTLE_SET',
  'VIEW_PROXY_SET',
]);

// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------

export const Actions = objEnum([
  // busy
  'BUSY_UPDATE_PROGRESS',

  // network
  'NETWORK_CONNECT',

  // view
  'VIEW_UPDATE_CAMERA',
  'VIEW_RESET_CAMERA',
  'VIEW_ROLL_LEFT',
  'VIEW_ROLL_RIGHT',
  'VIEW_UPDATE_ORIENTATION',
  'VIEW_RENDER',
]);

// ----------------------------------------------------------------------------

export default {
  Actions,
  Getters,
  Mutations,
};
