# migme JavaScript Style Guide
migme's approach to JavaScript.
Semi-based on [Airbnb's Style Guide](https://github.com/airbnb/javascript) and [Standard](https://github.com/feross/standard)

## Table of Contents

  1. [Types](#types)
  1. [References](#references)
  1. [Objects](#objects)
  1. [Arrays](#arrays)
  1. [Destructuring](#destructuring)
  1. [Strings](#strings)
  1. [Functions](#functions)
  1. [Arrow Functions](#arrow-functions)
  1. [Constructors](#constructors)
  1. [Modules](#modules)
  1. [Iterators and Generators](#iterators-and-generators)
  1. [Properties](#properties)
  1. [Variables](#variables)
  1. [Hoisting](#hoisting)
  1. [Comparison Operators & Equality](#comparison-operators--equality)
  1. [Blocks](#blocks)
  1. [Comments](#comments)
  1. [Whitespace](#whitespace)
  1. [Commas](#commas)
  1. [Semicolons](#semicolons)
  1. [Type Casting & Coercion](#type-casting--coercion)
  1. [Naming Conventions](#naming-conventions)
  1. [Accessors](#accessors)
  1. [Events](#events)
  1. [jQuery](#jquery)
  1. [ECMAScript 5 Compatibility](#ecmascript-5-compatibility)
  1. [ECMAScript 6 Styles](#ecmascript-6-styles)
  1. [Testing](#testing)
  1. [Performance](#performance)
  1. [Resources](#resources)
  1. [License](#license)

## Types

  - [1.1](#1.1) <a name='1.1'></a> **Primitives**: When you access a primitive type you work directly on its value.

    - `string`
    - `number`
    - `boolean`
    - `null`
    - `undefined`

    ```javascript
    const foo = 1
    let bar = foo

    bar = 42

    console.log(foo, bar) // => 1, 42
    ```

  - [1.2](#1.2) <a name='1.2'></a> **Complex**: When you access a complex type you work on a reference to its value.

    - `object`
    - `array`
    - `function`

    ```javascript
    const foo = [1, 2]
    const bar = foo

    bar[0] = 42

    console.log(foo[0], bar[0]) // => 42, 42
    ```

## References

  - [2.1](#2.1) <a name='2.1'></a> Use `const` for all of your references; avoid using `var`. eslint: [`prefer-const`](http://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign.html)

  > Why? This ensures that you can't reassign your references, which can lead to bugs and difficult to comprehend code.

  ```javascript
  // bad
  var a = 1
  var b = 2

  // good
  const a = 1
  const b = 2
  ```

  - [2.2](#2.2) <a name='2.2'></a> If you must reassign references, use `let` instead of `var`. eslint: [`no-var`](http://eslint.org/docs/rules/no-var.html) jscs: [`disallowVar`](http://jscs.info/rule/disallowVar)

    > Why? `let` is block-scoped rather than function-scoped like `var`.

    ```javascript
    // bad
    var count = 1
    if (true) {
      count += 1
    }

    // good, use the let.
    let count = 1
    if (true) {
      count += 1
    }
    ```

  - [2.3](#2.3) <a name='2.3'></a> Note that both `let` and `const` are block-scoped.

    ```javascript
    // const and let only exist in the blocks they are defined in.
    {
      let a = 1
      const b = 1
    }
    console.log(a) // ReferenceError
    console.log(b) // ReferenceError
    ```

## Objects

  - [3.1](#3.1) <a name='3.1'></a> Use the literal syntax for object creation. eslint: [`no-new-object`](http://eslint.org/docs/rules/no-new-object.html)

  ```javascript
  // bad
  const item = new Object()

  // good
  const item = {}
  ```

  - [3.2](#3.2) <a name='3.2'></a> If your code will be executed in browsers in script context, don't use [reserved words](http://es5.github.io/#x7.6.1) as keys. It won't work in IE8. [More info](https://github.com/airbnb/javascript/issues/61). It’s OK to use them in ES6 modules and server-side code. jscs: [`disallowIdentifierNames`](http://jscs.info/rule/disallowIdentifierNames)

    ```javascript
    // bad
    const superman = {
      default: { clark: 'kent' },
      private: true,
    }

    // good
    const superman = {
      defaults: { clark: 'kent' },
      hidden: true,
    }
    ```

  - [3.3](#3.3) <a name='3.3'></a> Use readable synonyms in place of reserved words. jscs: [`disallowIdentifierNames`](http://jscs.info/rule/disallowIdentifierNames)

    ```javascript
    // bad
    const superman = {
      class: 'alien',
    }

    // bad
    const superman = {
      klass: 'alien',
    }

    // good
    const superman = {
      type: 'alien',
    }
    ```

  <a name="es6-computed-properties"></a>
  - [3.4](#3.4) <a name='3.4'></a> Use computed property names when creating objects with dynamic property names.

    > Why? They allow you to define all the properties of an object in one place.

    ```javascript

    function getKey (k) {
      return `a key named ${k}`
    }

    // bad
    const obj = {
      id: 5,
      name: 'San Francisco',
    }
    obj[getKey('enabled')] = true

    // good
    const obj = {
      id: 5,
      name: 'San Francisco',
      [getKey('enabled')]: true,
    }
    ```

  <a name="es6-object-shorthand"></a>
  - [3.5](#3.5) <a name='3.5'></a> Use object method shorthand. eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html) jscs: [`requireEnhancedObjectLiterals`](http://jscs.info/rule/requireEnhancedObjectLiterals)

    ```javascript
    // bad
    const atom = {
      value: 1,

      addValue: function (value) {
        return atom.value + value
      },
    }

    // good
    const atom = {
      value: 1,

      addValue (value) {
        return atom.value + value;
      },
    }
    ```

  <a name="es6-object-concise"></a>
  - [3.6](#3.6) <a name='3.6'></a> Use property value shorthand. eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html) jscs: [`requireEnhancedObjectLiterals`](http://jscs.info/rule/requireEnhancedObjectLiterals)

    > Why? It is shorter to write and descriptive.

    ```javascript
    const lukeSkywalker = 'Luke Skywalker'

    // bad
    const obj = {
      lukeSkywalker: lukeSkywalker,
    }

    // good
    const obj = {
      lukeSkywalker,
    }
    ```

  - [3.7](#3.7) <a name='3.7'></a> Group your shorthand properties at the beginning of your object declaration.

    > Why? It's easier to tell which properties are using the shorthand.

    ```javascript
    const anakinSkywalker = 'Anakin Skywalker'
    const lukeSkywalker = 'Luke Skywalker'

    // bad
    const obj = {
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      lukeSkywalker,
      episodeThree: 3,
      mayTheFourth: 4,
      anakinSkywalker,
    }

    // good
    const obj = {
      lukeSkywalker,
      anakinSkywalker,
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      episodeThree: 3,
      mayTheFourth: 4,
    }
    ```

  - [3.8](#3.8) <a name="3.8"></a> Only quote properties that are invalid identifiers. eslint: [`quote-props`](http://eslint.org/docs/rules/quote-props.html) jscs: [`disallowQuotedKeysInObjects`](http://jscs.info/rule/disallowQuotedKeysInObjects)

  > Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

  ```javascript
  // bad
  const bad = {
    'foo': 3,
    'bar': 4,
    'data-blah': 5,
  }

  // good
  const good = {
    foo: 3,
    bar: 4,
    'data-blah': 5,
  }
  ```

## Arrays

  - [4.1](#4.1) <a name='4.1'></a> Use the literal syntax for array creation. eslint: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor.html)

    ```javascript
    // bad
    const items = new Array()

    // good
    const items = []
    ```

  - [4.2](#4.2) <a name='4.2'></a> Use Array#push instead of direct assignment to add items to an array.

    ```javascript
    const someStack = []

    // bad
    someStack[someStack.length] = 'abracadabra'

    // good
    someStack.push('abracadabra')
    ```

  <a name="es6-array-spreads"></a>
  - [4.3](#4.3) <a name='4.3'></a> Use array spreads `...` to copy arrays.

    ```javascript
    // bad
    const len = items.length
    const itemsCopy = []
    let i

    for (i = 0; i < len; i++) {
      itemsCopy[i] = items[i]
    }

    // good
    const itemsCopy = [...items]
    ```
  - [4.4](#4.4) <a name='4.4'></a> To convert an array-like object to an array, use Array#from.

    ```javascript
    const foo = document.querySelectorAll('.foo')
    const nodes = Array.from(foo)
    ```

  - [4.5](#4.5) <a name='4.5'></a> Use return statements in array method callbacks. It's ok to omit the return if the function body consists of a single statement following [8.2](#8.2). eslint: [`array-callback-return`](http://eslint.org/docs/rules/array-callback-return)

    ```javascript
    // good
    [1, 2, 3].map((x) => {
      const y = x + 1
      return x * y
    })

    // good
    [1, 2, 3].map(x => x + 1)

    // bad
    const flat = {}
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
      const flatten = memo.concat(item)
      flat[index] = memo.concat(item)
    })

    // good
    const flat = {}
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
      const flatten = memo.concat(item)
      flat[index] = flatten
      return flatten
    });

    // bad
    inbox.filter((msg) => {
      const { subject, author } = msg
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee'
      } else {
        return false
      }
    })

    // good
    inbox.filter((msg) => {
      const { subject, author } = msg
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee'
      }

      return false
    })
    ```

## Destructuring

  - [5.1](#5.1) <a name='5.1'></a> Use object destructuring when accessing and using multiple properties of an object. jscs: [`requireObjectDestructuring`](http://jscs.info/rule/requireObjectDestructuring)

    > Why? Destructuring saves you from creating temporary references for those properties.

    ```javascript
    // bad
    function getFullName (user) {
      const firstName = user.firstName
      const lastName = user.lastName

      return `${firstName} ${lastName}`
    }

    // good
    function getFullName (user) {
      const { firstName, lastName } = user
      return `${firstName} ${lastName}`
    }

    // best
    function getFullName ({ firstName, lastName }) {
      return `${firstName} ${lastName}`
    }
    ```

  - [5.2](#5.2) <a name='5.2'></a> Use array destructuring. jscs: [`requireArrayDestructuring`](http://jscs.info/rule/requireArrayDestructuring)

    ```javascript
    const arr = [1, 2, 3, 4]

    // bad
    const first = arr[0]
    const second = arr[1]

    // good
    const [first, second] = arr
    ```

  - [5.3](#5.3) <a name='5.3'></a> Use object destructuring for multiple return values, not array destructuring.

    > Why? You can add new properties over time or change the order of things without breaking call sites.

    ```javascript
    // bad
    function processInput (input) {
      // then a miracle occurs
      return [left, right, top, bottom]
    }

    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input)

    // good
    function processInput (input) {
      // then a miracle occurs
      return { left, right, top, bottom }
    }

    // the caller selects only the data they need
    const { left, right } = processInput(input)
    ```

## Strings

  - [6.1](#6.1) <a name='6.1'></a> Use single quotes `''` for strings. eslint: [`quotes`](http://eslint.org/docs/rules/quotes.html) jscs: [`validateQuoteMarks`](http://jscs.info/rule/validateQuoteMarks)

    ```javascript
    // bad
    const name = "Malcolm Reynolds"

    // good
    const name = 'Malcolm Reynolds'
    ```

  - [6.2](#6.2) <a name='6.2'></a> Strings that cause the line to go over 100 characters should be written across multiple lines using string concatenation.
  - [6.3](#6.3) <a name='6.3'></a> Note: If overused, long strings with concatenation could impact performance. [jsPerf](http://jsperf.com/ya-string-concat) & [Discussion](https://github.com/airbnb/javascript/issues/40).

    ```javascript
    // bad
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.'

    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.'

    // good
    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.'
    ```

  <a name="es6-template-literals"></a>
  - [6.4](#6.4) <a name='6.4'></a> When programmatically building up strings, use template strings instead of concatenation. eslint: [`prefer-template`](http://eslint.org/docs/rules/prefer-template.html) [`template-curly-spacing`](http://eslint.org/docs/rules/template-curly-spacing) jscs: [`requireTemplateStrings`](http://jscs.info/rule/requireTemplateStrings)

    > Why? Template strings give you a readable, concise syntax with proper newlines and string interpolation features.

    ```javascript
    // bad
    function sayHi (name) {
      return 'How are you, ' + name + '?'
    }

    // bad
    function sayHi (name) {
      return ['How are you, ', name, '?'].join()
    }

    // bad
    function sayHi (name) {
      return `How are you, ${ name }?`
    }

    // good
    function sayHi (name) {
      return `How are you, ${name}?`
    }
    ```
  - [6.5](#6.5) <a name='6.5'></a> Never use `eval()` on a string, it opens too many vulnerabilities.

## Functions

  - [7.1](#7.1) <a name='7.1'></a> Use function declarations instead of function expressions. jscs: [`requireFunctionDeclarations`](http://jscs.info/rule/requireFunctionDeclarations)

    > Why? Function declarations are named, so they're easier to identify in call stacks. Also, the whole body of a function declaration is hoisted, whereas only the reference of a function expression is hoisted. This rule makes it possible to always use [Arrow Functions](#arrow-functions) in place of function expressions.

    ```javascript
    // bad
    const foo = function () {
    }

    // good
    function foo () {
    }
    ```

  - [7.2](#7.2) <a name='7.2'></a> Immediately invoked function expressions: eslint: [`wrap-iife`](http://eslint.org/docs/rules/wrap-iife.html) jscs: [`requireParenthesesAroundIIFE`](http://jscs.info/rule/requireParenthesesAroundIIFE)

    > Why? An immediately invoked function expression is a single unit - wrapping both it, and its invocation parens, in parens, cleanly expresses this. Note that in a world with modules everywhere, you almost never need an IIFE.

    ```javascript
    // immediately-invoked function expression (IIFE)
    (function () {
      console.log('Welcome to the Internet. Please follow me.')
    }())
    ```

  - [7.3](#7.3) <a name='7.3'></a> Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears. eslint: [`no-loop-func`](http://eslint.org/docs/rules/no-loop-func.html)

  - [7.4](#7.4) <a name='7.4'></a> **Note:** ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement. [Read ECMA-262's note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

    ```javascript
    // bad
    if (currentUser) {
      function test () {
        console.log('Nope.')
      }
    }

    // good
    let test;
    if (currentUser) {
      test = () => {
        console.log('Yup.')
      }
    }
    ```

  - [7.5](#7.5) <a name='7.5'></a> Never name a parameter `arguments`. This will take precedence over the `arguments` object that is given to every function scope.

    ```javascript
    // bad
    function nope (name, options, arguments) {
      // ...stuff...
    }

    // good
    function yup (name, options, args) {
      // ...stuff...
    }
    ```

  <a name="es6-rest"></a>
  - [7.6](#7.6) <a name='7.6'></a> Never use `arguments`, opt to use rest syntax `...` instead. [`prefer-rest-params`](http://eslint.org/docs/rules/prefer-rest-params)

    > Why? `...` is explicit about which arguments you want pulled. Plus rest arguments are a real Array and not Array-like like `arguments`.

    ```javascript
    // bad
    function concatenateAll () {
      const args = Array.prototype.slice.call(arguments)
      return args.join('')
    }

    // good
    function concatenateAll (...args) {
      return args.join('')
    }
    ```

  <a name="es6-default-parameters"></a>
  - [7.7](#7.7) <a name='7.7'></a> Use default parameter syntax rather than mutating function arguments.

    ```javascript
    // really bad
    function handleThings (opts) {
      // No! We shouldn't mutate function arguments.
      // Double bad: if opts is falsy it'll be set to an object which may
      // be what you want but it can introduce subtle bugs.
      opts = opts || {}
      // ...
    }

    // still bad
    function handleThings (opts) {
      if (opts === void 0) {
        opts = {}
      }
      // ...
    }

    // good
    function handleThings (opts = {}) {
      // ...
    }
    ```

  - [7.8](#7.8) <a name='7.8'></a> Avoid side effects with default parameters.

    > Why? They are confusing to reason about.

    ```javascript
    var b = 1
    // bad
    function count (a = b++) {
      console.log(a)
    }
    count()  // 1
    count()  // 2
    count(3) // 3
    count()  // 3
    ```

  - [7.9](#7.9) <a name='7.9'></a> Always put default parameters last.

    ```javascript
    // bad
    function handleThings (opts = {}, name) {
      // ...
    }

    // good
    function handleThings (name, opts = {}) {
      // ...
    }
    ```

  - [7.10](#7.10) <a name='7.10'></a> Never use the Function constructor to create a new function.

    > Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities.

    ```javascript
    // bad
    var add = new Function('a', 'b', 'return a + b')

    // still bad
    var subtract = Function('a', 'b', 'return a - b')
    ```

  - [7.11](#7.11) <a name="7.11"></a> Spacing in a function signature.

    > Why? Consistency is good.

    ```javascript
    // bad
    const f = function(){}
    const g = function (){}
    const h = function() {}

    // good
    const x = function () {}
    const y = function a () {}
    ```

  - [7.12](#7.12) <a name="7.12"></a> Never mutate parameters. eslint: [`no-param-reassign`](http://eslint.org/docs/rules/no-param-reassign.html)

    > Why? Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.

    ```javascript
    // bad
    function f1 (obj) {
      obj.key = 1
    }

    // good
    function f2 (obj) {
      const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1
    }
    ```

  - [7.13](#7.13) <a name="7.13"></a> Never reassign parameters. eslint: [`no-param-reassign`](http://eslint.org/docs/rules/no-param-reassign.html)

    > Why? Reassigning parameters can lead to unexpected behavior, especially when accessing the `arguments` object. It can also cause optimization issues, especially in V8.

    ```javascript
    // bad
    function f1 (a) {
      a = 1
    }

    function f2 (a) {
      if (!a) { a = 1 }
    }

    // good
    function f3 (a) {
      const b = a || 1
    }

    function f4 (a = 1) {
    }
    ```

## Arrow Functions

  - [8.1](#8.1) <a name='8.1'></a> When you must use function expressions (as when passing an anonymous function), use arrow function notation. eslint: [`prefer-arrow-callback`](http://eslint.org/docs/rules/prefer-arrow-callback.html), [`arrow-spacing`](http://eslint.org/docs/rules/arrow-spacing.html) jscs: [`requireArrowFunctions`](http://jscs.info/rule/requireArrowFunctions)

    > Why? It creates a version of the function that executes in the context of `this`, which is usually what you want, and is a more concise syntax.

    > Why not? If you have a fairly complicated function, you might move that logic out into its own function declaration.

    ```javascript
    // bad
    [1, 2, 3].map(function (x) {
      const y = x + 1
      return x * y
    })

    // good
    [1, 2, 3].map((x) => {
      const y = x + 1
      return x * y
    })
    ```

  - [8.2](#8.2) <a name='8.2'></a> If the function body consists of a single expression, omit the braces and use the implicit return. Otherwise, keep the braces and use a `return` statement. eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html), [`arrow-body-style`](http://eslint.org/docs/rules/arrow-body-style.html) jscs:  [`disallowParenthesesAroundArrowParam`](http://jscs.info/rule/disallowParenthesesAroundArrowParam), [`requireShorthandArrowFunctions`](http://jscs.info/rule/requireShorthandArrowFunctions)

    > Why? Syntactic sugar. It reads well when multiple functions are chained together.

    > Why not? If you plan on returning an object.

    ```javascript
    // bad
    [1, 2, 3].map(number => {
      const nextNumber = number + 1
      `A string containing the ${nextNumber}.`
    })

    // good
    [1, 2, 3].map(number => `A string containing the ${number}.`)

    // good
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1
      return `A string containing the ${nextNumber}.`
    })
    ```

  - [8.3](#8.3) <a name='8.3'></a> In case the expression spans over multiple lines, wrap it in parentheses for better readability.

    > Why? It shows clearly where the function starts and ends.

    ```js
    // bad
    [1, 2, 3].map(number => 'As time went by, the string containing the ' +
      `${number} became much longer. So we needed to break it over multiple ` +
      'lines.'
    )

    // good
    [1, 2, 3].map(number => (
      `As time went by, the string containing the ${number} became much ` +
      'longer. So we needed to break it over multiple lines.'
    ))
    ```


  - [8.4](#8.4) <a name='8.4'></a> If your function takes a single argument and doesn’t use braces, omit the parentheses. Otherwise, always include parentheses around arguments. eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html) jscs:  [`disallowParenthesesAroundArrowParam`](http://jscs.info/rule/disallowParenthesesAroundArrowParam)

    > Why? Less visual clutter.

    ```js
    // bad
    [1, 2, 3].map((x) => x * x)

    // good
    [1, 2, 3].map(x => x * x)

    // good
    [1, 2, 3].map(number => (
      `A long string with the ${number}. It’s so long that we’ve broken it ` +
      'over multiple lines!'
    ))

    // bad
    [1, 2, 3].map(x => {
      const y = x + 1
      return x * y
    });

    // good
    [1, 2, 3].map((x) => {
      const y = x + 1
      return x * y
    })
    ```

  - [8.5](#8.5) <a name='8.5'></a> Avoid confusing arrow function syntax (`=>`) with comparison operators (`<=`, `>=`). eslint: [`no-confusing-arrow`](http://eslint.org/docs/rules/no-confusing-arrow)

    ```js
    // bad
    const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize

    // bad
    const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize

    // good
    const itemHeight = item => { return item.height > 256 ? item.largeSize : item.smallSize }
    ```

## Constructors

  - [9.1](#9.1) <a name='9.1'></a> Always use `class`. Avoid manipulating `prototype` directly.

    > Why? `class` syntax is more concise and easier to reason about.

    ```javascript
    // bad
    function Queue (contents = []) {
      this._queue = [...contents]
    }
    Queue.prototype.pop = function () {
      const value = this._queue[0]
      this._queue.splice(0, 1)
      return value
    }


    // good
    class Queue {
      constructor (contents = []) {
        this._queue = [...contents]
      }
      pop () {
        const value = this._queue[0]
        this._queue.splice(0, 1)
        return value
      }
    }
    ```

  - [9.2](#9.2) <a name='9.2'></a> Use `extends` for inheritance.

    > Why? It is a built-in way to inherit prototype functionality without breaking `instanceof`.

    ```javascript
    // bad
    const inherits = require('inherits')
    function PeekableQueue (contents) {
      Queue.apply(this, contents)
    }
    inherits(PeekableQueue, Queue)
    PeekableQueue.prototype.peek = function () {
      return this._queue[0]
    }

    // good
    class PeekableQueue extends Queue {
      peek () {
        return this._queue[0]
      }
    }
    ```

  - [9.3](#9.3) <a name='9.3'></a> Methods can return `this` to help with method chaining.

    ```javascript
    // bad
    Jedi.prototype.jump = function () {
      this.jumping = true
      return true
    };

    Jedi.prototype.setHeight = function (height) {
      this.height = height
    };

    const luke = new Jedi()
    luke.jump() // => true
    luke.setHeight(20) // => undefined

    // good
    class Jedi {
      jump () {
        this.jumping = true
        return this
      }

      setHeight (height) {
        this.height = height
        return this
      }
    }

    const luke = new Jedi()

    luke.jump()
      .setHeight(20)
    ```


  - [9.4](#9.4) <a name='9.4'></a> It's okay to write a custom toString() method, just make sure it works successfully and causes no side effects.

    ```javascript
    class Jedi {
      constructor (options = {}) {
        this.name = options.name || 'no name'
      }

      getName () {
        return this.name
      }

      toString () {
        return `Jedi - ${this.getName()}`
      }
    }
    ```

  - [9.5](#9.5) <a name='9.5'></a> Classes have a default constructor if one is not specified. An empty constructor function or one that just delegates to a parent class is unnecessary. [`no-useless-constructor`](http://eslint.org/docs/rules/no-useless-constructor)

    ```javascript
    // bad
    class Jedi {
      constructor () {}

      getName () {
        return this.name
      }
    }

    // bad
    class Rey extends Jedi {
      constructor (...args) {
        super (...args)
      }
    }

    // good
    class Rey extends Jedi {
      constructor (...args) {
        super (...args)
        this.name = 'Rey'
      }
    }
    ```

## Modules

  - [10.1](#10.1) <a name='10.1'></a> Always use modules (`import`/`export`) over a non-standard module system. You can always transpile to your preferred module system.

    > Why? Modules are the future, let's start using the future now.

    ```javascript
    // bad
    const migmeStyleGuide = require('./migmeStyleGuide')
    module.exports = migmeStyleGuide.es6

    // ok
    import migmeStyleGuide from './migmeStyleGuide'
    export default migmeStyleGuide.es6;

    // best
    import { es6 } from './migmeStyleGuide'
    export default es6
    ```

  - [10.2](#10.2) <a name='10.2'></a> Do not use wildcard imports.

    > Why? This makes sure you have a single default export.

    ```javascript
    // bad
    import * as migmeStyleGuide from './migmeStyleGuide'

    // good
    import migmeStyleGuide from './migmeStyleGuide'
    ```

  - [10.3](#10.3) <a name='10.3'></a>And do not export directly from an import.

    > Why? Although the one-liner is concise, having one clear way to import and one clear way to export makes things consistent.

    ```javascript
    // bad
    // filename es6.js
    export { es6 as default } from './migmeStyleGuide'

    // good
    // filename es6.js
    import { es6 } from './migmeStyleGuide'
    export default es6
    ```

## Iterators and Generators

  - [11.1](#11.1) <a name='11.1'></a> Don't use iterators. Prefer JavaScript's higher-order functions like `map()` and `reduce()` instead of loops like `for-of`. eslint: [`no-iterator`](http://eslint.org/docs/rules/no-iterator.html)

    > Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.

    ```javascript
    const numbers = [1, 2, 3, 4, 5]

    // bad
    let sum = 0
    for (let num of numbers) {
      sum += num
    }

    sum === 15

    // good
    let sum = 0
    numbers.forEach(num => sum += num)
    sum === 15

    // best (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0)
    sum === 15
    ```

  - [11.2](#11.2) <a name='11.2'></a> Don't use generators for now.

    > Why? They don't transpile well to ES5.

## Properties

  - [12.1](#12.1) <a name='12.1'></a> Use dot notation when accessing properties. eslint: [`dot-notation`](http://eslint.org/docs/rules/dot-notation.html) jscs: [`requireDotNotation`](http://jscs.info/rule/requireDotNotation)

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    }

    // bad
    const isJedi = luke['jedi']

    // good
    const isJedi = luke.jedi
    ```

  - [12.2](#12.2) <a name='12.2'></a> Use subscript notation `[]` when accessing properties with a variable.

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    }

    function getProp (prop) {
      return luke[prop]
    }

    const isJedi = getProp('jedi')
    ```

## Variables

## Hoisting

## Comparison Operators & Equality

## Blocks

## Comments

## Whitespace

## Commas

## Semicolons

## Type Casting & Coercion

## Naming Conventions

## Accessors

## Events

## jQuery

## ECMAScript 5 Compatibility

## ECMAScript 6 Styles

## Testing

## Performance

## Resources

## License

(The MIT License)

Copyright (c) 2014-2016 Airbnb

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
