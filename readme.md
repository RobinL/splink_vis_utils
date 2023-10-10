## Development notes

### Aim

The goal is to produce a standalone [JavaScript file](dist/splink_vis_utils.js) that contains all the code needed for splink comparison
viewer and splink cluster studio to runn completely offline.

The `splink_vis_utils` library includes three separate things when it's rolled up:

- The `splink_vis_utils` library of utility functions
- The code in two Observable notebooks containing the reactive code for the Cluster Studio and Comparison Viewer
- All their dependencies

Note that observable notebooks are themselves javascript libraries so can be `npm add`ed as dependencies to the `splink_vis_utils` library.

This enables Splink version 3 to output a single HTML file that can work offline, containing all the JavaScript code needed for these dashboards.

### Development Process

#### Serving the Rolled-up Code

Run the following commands in the `splink_vis_utils` directory:

```
npx http-server --cors
```

and in s separate terminal

```
./node_modules/.bin/rollup -c -w
```

#### Developing the Observable Notebooks

Edit the Observable notebooks via their respective GUIs:

- [Splink Comparison Viewer](https://observablehq.com/d/c43e4e0aeb54d263)
- [Splink Cluster Studio](https://observablehq.com/d/5496e67e6ca05c7b)

For development, the live rolled-up code is passed in at `localUrl = "http://127.0.0.1:8080/dist/splink_vis_utils.js"` at the bottom of these notebooks.

#### Symlinking for Easier Splink Development

If you're working on Splink. create a symlink to the rolled-up JS file in your Splink directory to avoid manual copying of changes. Navigate to your Splink directory and run:

```
cd splink/files/splink_vis_utils/
ln -s /path/to/dist/splink_vis_utils.js splink_vis_utils.js
```

#### Refreshing Changes in Observable

To see the changes you've made in Observable, manually refresh the library by clicking the `viewof refresh = Inputs.button("refresh splink_vis_utils javascript lib")` button in the notebook.

#### Persisting Edits

After editing the notebooks, you need this code to make its way back into the rolled up library

update the version number in [update pkg](update_pkg.sh) based on the number obtained from Observable's export -> download code -> view the download URL, or just npm install what's on the clipboard

If you encounter issues, you can reset everything with:

```
rm -rf node_modules/
npm install
```

### Running Code

Tests using Test Explorer should be operational, including breakpoints. If they are not, run tests with the debugger:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js
```
