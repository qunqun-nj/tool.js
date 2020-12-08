Symbol + Generator函数 + Promise
======================

## 一：Symbol

### 1.1 基本使用

简单的说，Symbol就是一个绝对唯一的key值，类似之前obj['key']='value'这种操作的字符串'key'，好处是绝对不会重复，避免覆盖之前的值。

Symbol是一个方法，会返回一个唯一的symbol，可以带参数，比如：var sy=Symbol('sy-name')，不过这只是为了方便查看，加不加目前没有区别。

```js
var sy1=Symbol(),sy2=Symbol();

console.log(sy1===sy2);//false

var obj={[sy1]:'这是数据一'};

obj[sy2]='这是数据二';

console.log(obj);//{Symbol(): "这是数据一", Symbol(): "这是数据二"}
```

### 1.2 有用的方法

- Symbol.for():接受一个字符串作为参数，然后在全局搜索有没有以改字符串作为名称的Symbol值，如果有就返回，没有就新建一个返回。
注意：只有该方法建立的Symbol会登记在全局，Symbol()方法建立的不会登记在全局

```js
var sy1 = Symbol.for(),sy2 = Symbol.for();

console.log(sy1 === sy2);//true

var sy3 = Symbol.for('info1'),sy4 = Symbol.for('info1');

console.log(sy3 === sy4);//true

var sy5=Symbol('info2'),sy6 = Symbol.for('info2');

console.log(sy3 === sy6);//false

console.log(sy5 === sy6);//false
```

- Symbol.keyFor()

该方法是配合上面的方法来使用的，接受一个Symbol作为参数，会在全局搜索该Symbol对象，返回该对象名称，如果没有就返回undefined。

## 二：Generator函数

### 2.1 基本使用

定义函数名称时带一个*的函数就是Generator函数，内部的yield语句是特色，该函数的使用可以用下面的几条概括一下：

- 调用Generator函数并不会立刻return结果，而是在遇到第一个yield语句前停止下来，返回一个指针（姑且这样称呼）；
- 以后每次调用yield时候（具体看下面例子，直到遇到yield或return时停止继续执行），会返回yield数据，有点类似return；
- 返回的数据格式从下面的例子应该就明白了，没有yield或return语句会发生什么应该也明白了。

```js
function *firstYieldFun(){

    yield '你好';

    yield '2007';

    return 'name:';

}

var fun=firstYieldFun();

console.log(fun.next());//{value: "你好", done: false}

console.log(fun.next());//{value: "2007", done: false}

console.log(fun.next());//{value: "name:", done: true}

console.log(fun.next());//{value: undefined, done: true}

console.log(fun.next());//{value: undefined, done: true}
```

简单的说，Generator函数就是一个分段执行的函数，走走停停，yield用来切割代码成一段段的，next()方法用来启动执行下一段这个行为。

forEach方法的参数是一个普通函数，Generator函数不可以作为参数。

### 2.2 重要的说明

- yield特殊使用

除了上面的例子yield单独成为一个语句，其还可以用于表达式，函数参数和赋值表达式的右边等。

需要注意的是，yield要明确归属，用小括号包裹，小括号不是必须的，是在归属关系不明确的时候才是必须的，例如：```console.log('My name is : '+(yield '你好2007'))```；

- next()方法带参数时

yield本身不会返回值，或者说是undefined，不过next()方法如果带参数情况就不一样了，此时就会返回yield带的参数，如下例子说明：

```js
function* secondYieldFun() {

    console.log(yield '你好2007');

}

var fun = secondYieldFun();

console.log(fun.next()); //{value: "你好2007", done: false}

//这是参数
console.log(fun.next('这是参数')); //{value: undefined, done: true}
```

## 三：Promise

### 3.1 基本使用

Promise就是一个对象，有点类似注册事件的感觉，不过又不一样，你提前注册好成功和失败以后应该走的路径，然后你自己根据实际情况决定是失败还是成功，其实和回调没有本质的区别，就是写起来好像好看了些，下面的例子很明了。

```js
var promise1 = new Promise(function(resolve, reject) {

    setTimeout(function() {

        if (false) {

            //Pending --> Resolved
            resolve('成功了');

        } else {

            //Pending --> Rejected
            reject('失败了');

        }

    }, 5000);
});

promise1.then(function(value) {

    console.log('成功：' + value);

}, function(error) {

    console.log('失败：' + error);

});
```

需要说明一下的是，Promise对象保证着三种状态：pending、Resolved和Rejected，就是进行中、成功和失败的意思。

### 3.2 Promise.race()和Promise.all()

将多个Promise实例，包装成一个新的Promise实例。
下面介绍的二个方法的参数如果不是对象的实例，就会先调用Promise.resolve方法变成对象的实例再传递进去。

```js
let pro=Promise.race(Promise对象的实例1, Promise对象的实例2 [,Promise对象的实例N])
```

只要promise对象的实例中有一个率先改变，率先改变的那个的返回状态就会作为pro的状态返回，余下的会继续执行完毕但不会改变状态了。

```js
let pro=Promise.all(Promise对象的实例1, Promise对象的实例2 [,Promise对象的实例N])
```

结果只有二种情况：

- 全部成功时，会等待全部执行结束，返回成功；

- 存在至少一个失败时，会在遇见第一个失败时候返回失败，余下的会继续执行完毕但不会改变状态了。

```js
var pro1 = new Promise((resolve, reject) => setTimeout(() => resolve('第一条'), 3000));

var pro2 = new Promise((resolve, reject) => setTimeout(() => resolve('第二条'), 1000));

var proAll = Promise.all([pro1, pro2]);

proAll.then(val => console.log(val)); // ["第一条", "第二条"]
```

[<< 返回首页](../README.md)
