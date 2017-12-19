# Bootstrap a new React component!

I tend to write my React components like this:

```
src/
  components/
    component-name/
      index.js
      ComponentName.md
```

The `index.js` file simply works as a proxy for the component, so that you can import it like this:

```javascript
import ComponentName from './components/component-name';
```

If you do the same, then you'll love this script!

## Usage

I recommend you to install this globally (but you don't have to if you don't want to):

```
npm install -g bootstrap-component
yarn global add bootstrap-component
```

Run this script from your project's root folder like this:

```
$ comp my-component
```

If you don't provide a component name, you'll be asked to provide it. You can case it as you want,
this script uses `case` in order to figure it out :)

This will bootstrap a new component, complete with index.js file and ready to be coded.

## Have a feature request? Found a bug?

Please create an issue - or if you're up for it, a pull request.

