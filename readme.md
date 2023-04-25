## Development notes

### Aim

A single javascript file that contains all the code needed for splink comparison
viewer and splink cluster studio

Specificaly this bundles together into a standalone [js file](dist/splink_vis_utils.js) the following:

- the `splink_vis_utils` library of utility function
- the observable notebooks containing the reactive code for the cluster studio and comparison viewer
- all of their dependencies

This means that splink version 3 can output a single html file which works offline that contains all of the javascript code needed for these dashboards

### Development process

#### To server the rolledup code

```
npx http-server --cors
./node_modules/.bin/rollup -c -w
./update_pkg.sh
```
#### Developing the observable notebooks

To edit the observable notebooks, they need to be edited in the observable gui:
[splink comparison viewer](https://observablehq.com/d/c43e4e0aeb54d263)
[splink cluster studio](https://observablehq.com/d/5496e67e6ca05c7b)

Note that at the bottom of these notebooks, for development purposes, we pass in the
live rolledup code at localUrl = "http://127.0.0.1:8080/dist/splink_vis_utils.js"

I also set some test data - which needs to be commented out before you 'republish' in observable.

This allows you to do real-time edits to the splink_vis_utils package.

#### Persisting edits of the rolled up code back to the rolled-up javascript

After you've edited the notebooks, you need this code to make its way back into the
rolled up library

To do so, you need to install the correct versions. In observable, get the version number from export -> download code -> view the download url.

For example:

```
https://api.observablehq.com/d/c43e4e0aeb54d263@621.tgz?v=3"
```

means the version number is 621.

Then update the version number in [update pkg](update_pkg.sh), which should update the version in `package.json`.

If you're having problems, you can reset everything with:

```
rm -rf node_modules/
npm install
```

## Running code

Tests using test explorer should be working, including breakpoints. If not, you can run tests with the debugger with:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js
```
