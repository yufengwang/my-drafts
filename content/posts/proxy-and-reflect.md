+++
title = "Js Proxy"
author = ["wenhu"]
date = 2022-08-09T22:36:00+08:00
categories = ["js"]
draft = false
+++

## Proxy [^fn:1] {#proxy}

proxy 是一个特殊的对象，(a transparent wrapper around target)

用于拦截对已有对象的访问和操作


### internal method {#internal-method}

引擎层面的实现，仅在 specification 中使用，无法在 js 中直接调用


### proxy trap {#proxy-trap}

拦截引擎 (e.g. v8) 层面对 internal method 的调用


### 示例 {#示例}

| internal method         | handler        | triggers when          |
|-------------------------|----------------|------------------------|
| [ [Set] ]               | get            | 读属性                 |
| [ [DefineOwnProperty] ] | defineProperty | Object.defineProperty  |
| [ [OwnPropertyKeys ] ]  | ownKeys        | for..in, Object.keys 等 |

```js
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  /**
   * target  被代理的对象
   * prop  被访问的属性
   * receiver 仅在访问 getter 属性时候用到
   */
  get(target, prop, receiver?) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // default value
    }
  }
});

console.log( numbers[1] ); // 1
console.log( numbers[123] ); // 0 (no such item)

```


## Reflect {#reflect}

minimal wrappers around internal methods

每一个被 proxy 代理的内部方法，都有一个对应的 Reflect 方法，跟 proxy trap 一样的名字和参数

用于简化转发操作，简化 proxy handler 的写法，跟 Proxy 配合使用


### example {#example}

| Operation         | Reflect Call                  | internal method |
|-------------------|-------------------------------|-----------------|
| obj[prop]         | Reflect.get(obj, prop)        | [ [Get] ]       |
| obj[prop] = value | Reflect.set(obj, prop, value) | [ [Set] ]       |

```js
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
    return Reflect.get(target, prop, receiver); // (*)
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

console.log(admin.name); // Admin
```


## 限制 {#限制}

Proxy 不能代理其没有的 slot，例如 Map 的 [ [ MapData ] ], private class fields, \\(===\\) 操作符等

e.g.

```js
let map = new Map();

let proxy = new Proxy(map, {});

proxy.set('test', 1); // Error
```

Fix:

```js
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (works!)

```

Array has no internal slots, for historical reasons

[^fn:1]: [proxy](https://javascript.info/proxy)