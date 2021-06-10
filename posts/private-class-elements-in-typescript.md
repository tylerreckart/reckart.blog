---
date: "June 9, 2021"
title: "Private Class Elements in TypeScript 4.3"
description: "Among the many additions to TypeScript in its 4.3 release is the ability to define which elements in a class can be given private property names, making them truly private at run-time. Properties, methods and accessors can all be given private names."
---

Among the [many additions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html) to TypeScript in its 4.3 release is the ability to define which elements in a class can be given private property names, making them truly private at run-time. Properties, methods and accessors can all be given private names.

```js
class Thing {
  #name = "";

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }

  #someMethod() {
    this.#name = this.#name.toUpperCase();
  }

  publicMethod() {
    // Private-named properties and methods can
    // be accessed inside the class.
    this.#someMethod();
    return this.#name;
  }
}

new Thing().#someMethod();
//          ~~~~~~~~~~~
// error!
// Property '#someMethod' is not accessible
// outside class 'Thing' because it has a private identifier.

const myThing = new Thing();
myThing.name = "Ted Lasso";
const jazzyName = myThing.publicMethod(); // "TED LASSO"
myThing.#name;
//          ~~~~~
// error!
// Property '#name' is not accessible
// outside class 'Thing' because it has a private identifier.
```

To make methods, getters/setters or fields private, all you have to do is prefix the name with `#`.

It's worth noting that private fields and methods exist only as declared up front. They cannot be created later, ad-hoc, or through assignment. You also can't declare private fields or methods in object literals. If you implement your class by adding individual methods to the prototype, or using a class framework, private methods and fields can't be used.
