# Bootstrap a new React component!

I tend to write my React components like this:

```
src/
  components/
    component-name/
      index.js
      ComponentName.js
```

The `index.js` file simply works as a proxy for the component, so that you can 
import it like this:

```javascript
import ComponentName from './components/component-name';
```

If you do the same, then you'll love this script!

## Usage

You can (and should) install this tool globally:

```
npm install -g bootstrap-component
yarn global add bootstrap-component
```

You can also use `npx` without installing it first - if you'd like to 
"try before you buy":

```
npx bootstrap-component
```

Run this script from your project's root folder like this:

```
$ comp
```

You can specify the name of your component like this:

```
$ comp my-component
```

### Arguments

This script is interactive, but can also be used in a scriptable way - via 
command line arguments. 

#### `--path`

This is the path to your components folder, relative to the current folder. 
Default is `--path=src/components`.

#### `--type`

One of `functionComponent`, `classComponent` or `empty` Default is `empty`.
You can also use the shorthand `function` or `func` for function components, and 
`class` for class components.

## Have a feature request? Found a bug?

Please create an issue - or if you're up for it, a pull request.

