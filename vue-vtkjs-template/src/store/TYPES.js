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
  // index
  'APP_DARK_THEME',

  // cone
  'CONE_RESOLUTION',
  'CONE_SOURCE',

  // view
  'VIEW_PROXY',
]);

// ----------------------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------------------

export const Mutations = objEnum([
  // index
  'APP_DARK_THEME_SET',

  // cone
  'CONE_RESOLUTION_SET',
  'CONE_SOURCE_SET',

  // view
  'VIEW_PROXY_SET',
]);

// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------

export const Actions = objEnum([
  // cone
  'CONE_INITIALIZE',
  'CONE_UPDATE_RESOLUTION',
  'CONE_RESET_CAMERA',
]);

// ----------------------------------------------------------------------------

export default {
  Actions,
  Getters,
  Mutations,
};
