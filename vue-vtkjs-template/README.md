# vue-vtkjs-template

This project aims to provide a base template in the creation of a Web project involving vtk.js without rendering server.
The steps below explained how we reach the point the template is currently in and does not require the user to run them again.
The goal is to highlight how we started from a main stream project and edit it to accommodate our expectation in web development with vtk.js.

## Start from vue-cli project generation

This project was created using the `vue-cli` with the following set of options:

```
$ vue create vue-vtkjs-template

Vue CLI v3.4.1
? Please pick a preset:
  Manually select features
? Check the features needed for your project:
  Babel, Vuex, Linter
? Pick a linter / formatter config:
  Airbnb
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
  Lint on save
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.?
  In dedicated config files
? Save this as a preset for future projects?
  No


Vue CLI v3.4.1
✨  Creating project in /.../vue-vtk-template.
🗃  Initializing git repository...
⚙  Installing CLI plugins. This might take a while...
🚀  Invoking generators...
📦  Installing additional dependencies...
⚓  Running completion hooks...
📄  Generating README.md...

🎉  Successfully created project vue-vtk-template.
👉  Get started with the following commands:

 $ cd vue-vtkjs-template
 $ npm run serve
```

## Prettier configuration

Create prettier config file `.prettierrc.js`

```
module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'always',
};
```

Install `@vue/eslint-config-prettier` and update linter config to use that preset as well.

```
$ npm install -D @vue/eslint-config-prettier
```

Edit `.eslintrc.js` to add `@vue/prettier` to the list of extensions

```
[...]
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/prettier'],
[...]
```

Run the reformatting

```
$ npm run lint
```

## Dependencies

Edit your `package.json` and remove any `^` in the version side to prevent package update without you knowing.
Lock files aims to overcome the described issue which make that step optional.

Check the dependencies and update them

```
$ npm outdated
Package  Current  Wanted  Latest  Location
vue        2.6.7   2.6.6   2.6.7  vue-vtk-template
vuex       3.1.0   3.0.1   3.1.0  vue-vtk-template

$ npm install -s vue@2.6.7 vuex@3.1.0
```

Add `vtk.js`, `typeface-roboto`, `vuetify` and `@mdi/font`

```
$ npm install -P vtk.js typeface-roboto vuetify @mdi/font
$ npm install -D core-js shader-loader worker-loader
```

## Add vtk rules and project name as alias

Edit `vue.config.js` with the following content

```
const vtkChainWebpack = require('vtk.js/Utilities/config/chainWebpack');

module.exports = {
  chainWebpack: (config) => {
    // Add project name as alias
    config.resolve.alias.set('vue-vtkjs-template', __dirname);

    // Add vtk.js rules
    vtkChainWebpack(config);
  },
};
```

## Application content/structure

This template application aims to provide the following set of features:
- Vue components (toolbar + vtkRenderWindow + busy feedback)
- VueX composable store
- IO client to communicate with a server side

```
vue-vtkjs-template/
  - dist/             <--- (vue-cli) Generated bundle
  - node_modules/     <--- (vue-cli) Generated from dependencies
  - public/           <--- (vue-cli) Static resources to deploy
    - index.html      <--- (vue-cli) Home page template
    - favicon.ico     <--- (vue-cli) Icon
  - src/              <--- (vue-cli) Base directory that contains client code
    - components/     <--- (vue-cli) Vue components
      - core/         <--- (app) Application specific components using the store
        - App/        <--- (app) Vue component is split with its various pieces
          - index.vue
          - script.js
          - template.html
          - style.css
      - widgets/      <--- (app) Generic/Reusable vue components
        - VtkView/
    - store/
      - index.js      <--- (app) Composite store entry point
      - TYPES.js      <--- (app) Map for various keys used in getters, mutations, actions
    - main.js         <--- (app) Application entry point
  - .browserlistrc    <--- (vue-cli) Browser compatibility list
  - .eslintrc.js      <--- (vue-cli) Linter configuration
  - .editorconfig     <--- (vue-cli) Shared IDE configuration
  - .gitignore        <--- (vue-cli) Git ignore generated files
  - .prettierrc.js    <--- (app) Add prettier config on top of airbnb rules
  - babel.config.js   <--- (vue-cli) Transpiler configuration
  - package.json      <--- (vue-cli + vtk) Project description with dependencies
  - postcss.config.js <--- (vue-cli) Post-css configuration
  - vue.config.js     <--- (app) Add custom rules to support vtk.js/Sources/* imports
```
