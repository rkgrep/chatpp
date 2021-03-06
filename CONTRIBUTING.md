# Contribution Guidelines
If you can understand Vietnamese, please refer [this post in Viblo](https://viblo.asia/thangtd90/posts/157G5noZvAje),
which describes in detail about how to contribute to Chat++.

## Setup
- Chat++ is rewritten in [ECMAScript 6](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
and compiled by [babel](https://babeljs.io/).
- Install `nodejs` and `gulp`, if you do not have.
- Run `npm install` to install the required node modules.
- Chat++ uses [ESLint](http://eslint.org/) for checking code styles. It uses `eslint-babel` parser instead of the default ESLint parser.
You have to install them first.
```
npm install -g eslint babel-eslint
```
- You can refer the [.eslintrc.json](./.eslintrc.json) file for the rules that Chat++ is following. Check [ESLint Rules Document](http://eslint.org/docs/rules/)
for the rules in detail.
- Run `gulp` to build codes from `src` folder.
- Run `npm test` or `eslint src` to check whether your codes satisfy the convention or not.

## Report an Issue

Please follow the guidelines below when creating an issue so that your issue can be more promptly resolved:

* Provide us as much information as you can. If possible, please describe the steps for reproducing the issue. A screenshot or a gif image to explain the issue is very appreciated. :+1:

* Please search through [existing issues](../../issues/) to see if your issue is already reported or fixed to make sure you are not reporting a duplicated issue.

## Contribute to the project
- With Pull Requests about the new features, bug fixes, code refactoring ... please send to **develop** branch.
- With Pull Requests for the **Firefox version** ... please send to **firefox** branch.

They are always welcome. :+1:


