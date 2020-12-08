二进制数据（ArrayBuffer + TypedArray + DataView）
======================

简单的说，ArrayBuffer就代表了内存中的一段二进制数据，不可以直接读写，只可以通过在上面建立TypedArray视图或DataView视图来操作这段二进制数据，TypedArray视图主要用来操作简单类型的二进制数据，DataView用来操作复杂类型的二进制数据。

## 第一步：ArrayBuffer

```js
new ArrayBuffer(length) //length代表长度，单位是字节
```

建立一个ArrayBuffer就是这么简单，当然也可以有其它数据或对象转换而来，这里先不提，如此的一个对象，再借助下面将介绍的二个视图就可以好好利用了，不过再此之前，还是先列举一下几个会有用的方法和属性：

- ArrayBuffer实例对象上有一个属性byteLength，可以知道实例对象的长度；

- 实例对象上的slice(起点[,终点])方法会把原来实例对象上指定的这段数据复制新建一个新的实例对象返回；

- ArrayBuffer对象上有一个方法ArrayBuffer.isView(参数)，可以用来判断传递进去的参数ArrayBuffer的实例对象。

## 第二步：TypedArray

### 视图对象种类

TypedArray是用来操作简单类型的视图，一个视图对应一个确定的类型，并且是连续的，默认为0。

该视图支持的类型如下：

- Int8Array：8位有符号整数，长度1个字节。
- Uint8Array：8位无符号整数，长度1个字节。
- Uint8ClampedArray：8位无符号整数，长度1个字节，溢出处理不同。
- Int16Array：16位有符号整数，长度2个字节。
- Uint16Array：16位无符号整数，长度2个字节。
- Int32Array：32位有符号整数，长度4个字节。
- Uint32Array：32位无符号整数，长度4个字节。
- Float32Array：32位浮点数，长度4个字节。
- Float64Array：64位浮点数，长度8个字节。

### 建立视图对象

每种类型都有一个构造函数，用来生成对应的视图，因此其实TypedArray其实是这些视图为了方便的一个统一称呼。

上面提到的每个构造函数传递的参数有很多中，下面列举常用的四种：

- TypedArray(ArrayBuffer实例对象, byteOffset=0, length?)
- TypedArray(length)
- TypedArray(typedArray)
- TypedArray(普通的数组)

### 视图对象操作数据

除了个别例外（比如concat方法），视图对象的操作和普通数组的操作基本差不多，这里给出一个例子：

```js
var arrayBuffer = new ArrayBuffer(6);//申请6个字节的内存空间
var int8Array = new Int8Array(arrayBuffer, 0, 2);//使用了2字节的空间
var int16Array = new Int16Array(arrayBuffer, 2, 2);//使用了4字节的空间
int8Array[0] = 1;
int16Array[0] = 2;
int16Array[1] = 3;
console.log(int8Array); //Int8Array(2) [1, 0]
console.log(int16Array); //Int16Array(2) [2, 3]
```

### 有用的说明

- TypedArray实例对象的buffer属性会返回对应的ArrayBuffer对象，只读；
- TypedArray实例对象的byteLength属性返回对象占据的内存字节数（注意这里和length属性不一样，后者是成员个数），只读；
- TypedArray实例对象的byteOffset属性返回对象从对应的ArrayBuffer对象的那个字节开始建立的，只读。

## 第三步：DataView

```js
new DataView(ArrayBuffer实例对象[,字节起始位置[,长度]])
```

和TypedArray有很大区别的是，这里我们在使用的时候可能要去关注一下大端还是小端保存或读取数据。

### 视图数据操作

如果说的简单点，其实DataView就是一个非常非常厉害视图，提供了很多方法，不像TypedArray视图需要建立对应视图然后读取，你可以调用DataView的实例对象上的方法就可以实现TypedArray哪些各种视图的功能，因此，你可能会涉及到这些方法：

读数据的方法包括：getInt8、getUint8、getInt16、getUint16、getInt32、getUint32、getFloat32、getFloat64。

带二个参数，第一个参数表示读取的开始位置，第二个参数表示是大端读取(false)还是小端读取（true）。

写数据的方法包括：setInt8、setUint8、setInt16、setUint16、setInt32、setUint32、setFloat32、setFloat64。

带三个参数，第一个参数表示写入的开始位置，第二个参数表示写入的数据，第三个参数表示是大端写入(false)还是小端写入（true）。

### 有用的说明

- DataView实例对象的buffer属性会返回对应的ArrayBuffer对象，只读；
- DataView实例对象的byteLength属性返回对象占据的内存字节数（注意这里和length属性不一样，后者是成员个数），只读；
- DataView实例对象的byteOffset属性返回对象从对应的ArrayBuffer对象的那个字节开始建立的，只读。

[<< 返回首页](../README.md)
