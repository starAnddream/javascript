#web Worker 多线程编程---转移密集型任务
应用：编码解码大字符串<br>
      复杂数学运算（图像、视频处理）<br>
      大数组排序等<br>

* W3C 在 HTML5 的规范中提出了工作线程（Web Worker）的概念，工作线程允许开发人员编写能够长时间运行而不被用户所中断的后台程序， 去执行事务或者逻辑，并同时保证页面对用户的及时响应。本文深入 HTML5 多线程规范，讲述多线程实现原理、方法，同时以实例的形式讲解 HTML5 中多线程编程以及应用。
* Worker 的三大主要特征：能够长时间运行（响应），理想的启动性能以及理想的内存消耗。
* Web Worker 允许开发人员编写能够长时间运行而不被用户所中断的后台程序，去执行事务或者逻辑，并同时保证页面对用户的及时响应。本文深入 HTML5 多线程规范，讲述多线程实现原理、方法，同时以实例的形式讲解 HTML5 中多线程编程以及应用。
* 在 HTML5 中，工作线程的出现使得在 Web 页面中进行多线程编程成为可能。众所周知，传统页面中（HTML5 之前）的 JavaScript 的运行都是以单线程的方式工作的，虽然有多种方式实现了对多线程的模拟（例如：JavaScript 中的 setinterval 方法，setTimeout 方法等），但是在本质上程序的运行仍然是由 JavaScript 引擎以单线程调度的方式进行的。在 HTML5 中引入的工作线程使得浏览器端的 JavaScript 引擎可以并发地执行 JavaScript 代码，从而实现了对浏览器端多线程编程的良好支持。

* HTML5 中的 Web Worker 可以分为两种不同线程类型，一个是专用线程 Dedicated Worker，一个是共享线程 Shared Worker。两种类型的线程各有不同的用途。下面对这两种工作线程作了详细的说明和描述。
* 专用线程：Dedicated Worker

  * 专用线程（dedicated worker）的创建方式：

    在创建专用线程的时候，需要给 Worker 的构造函数提供一个指向 JavaScript 文件资源的 URL，这也是创建专用线程时 Worker 构造函数所需要的唯一参数。当这个构造函数被调用之后，一个工作线程的实例便会被创建出来。下面是创建专用线程代码示例：
    创建专用线程示例代码
```javascript
     var worker = new Worker('dedicated.js');
```
* 与一个专用线程通信：

专用线程在运行的过程中会在后台使用 MessagePort 对象，而 MessagePort 对象支持 HTML5 中多线程提供的所有功能，例如：可以发送和接受结构化数据（JSON 等），传输二进制数据，并且支持在不同端口中传输数据等。
为了在页面主程序接收从专用线程传递过来的消息，我们需要使用工作线程的 onmessage 事件处理器，定义 onmessage 的实例代码如下：
2. 接收来至工作线程示例代码
```javascript
     worker.onmessage = function (event) { ... };
```
另外，开发人员也可以选择使用 addEventListener 方法，它最终的实现方式和作用和 onmessage 相同。

就像前面讲述的，专用线程会使用隐式的 MessagePort 实例，当专用线程被创建的时候，MessagePort 的端口消息队列便被主动启用。因此，这也和工作线程接口中定义的 start 方法作用一致。

如果要想一个专用线程发送数据，那么我们需要使用线程中的 postMessage 方法。专用线程不仅仅支持传输二进制数据，也支持结构化的 JavaScript 数据格式。在这里有一点需要注意，为了高效地传输 ArrayBuffer 对象数据，需要在 postMessage 方法中的第二个参数中指定它。实例代码如下：
    清单 3. 高效的发送 ArrayBuffer 数据代码
```javascript
     worker.postMessage({ 
      operation: 'list_all_users', 
      //ArrayBuffer object 
      input: buffer, 
      threshold: 0.8, 
     }, [buffer]);
```
###共享线程 Shared Worker

共享线程

共享线程可以由两种方式来定义：一是通过指向 JavaScript 脚本资源的 URL 来创建，而是通过显式的名称。当由显式的名称来定义的时候，由创建这个共享线程的第一个页面中使用 URL 会被用来作为这个共享线程的 JavaScript 脚本资源 URL。通过这样一种方式，它允许同域中的多个应用程序使用同一个提供公共服务的共享线程，从而不需要所有的应用程序都去与这个提供公共服务的 URL 保持联系。

无论在什么情况下，共享线程的作用域或者是生效范围都是由创建它的域来定义的。因此，两个不同的站点（即域）使用相同的共享线程名称也不会冲突。
共享线程的创建

创建共享线程可以通过使用 SharedWorker() 构造函数来实现，这个构造函数使用 URL 作为第一个参数，即是指向 JavaScript 资源文件的 URL，同时，如果开发人员提供了第二个构造参数，那么这个参数将被用于作为这个共享线程的名称。创建共享线程的代码示例如下：
```javascript
    var worker = new SharedWorker('sharedworker.js', ’ mysharedworker ’ );
```
    与共享线程通信

共享线程的通信也是跟专用线程一样，是通过使用隐式的 MessagePort 对象实例来完成的。当使用 SharedWorker() 构造函数的时候，这个对象将通过一种引用的方式被返回回来。我们可以通过这个引用的 port 端口属性来与它进行通信。发送消息与接收消息的代码示例如下：
    清单 4. 发送消息与接收消息代码
```javascript
     // 从端口接收数据 , 包括文本数据以及结构化数据
     1. worker.port.onmessage = function (event) { define your logic here... }; 
     // 向端口发送普通文本数据
     2. worker.port.postMessage('put your message here … '); 
     // 向端口发送结构化数据
     3. worker.port.postMessage({ username: 'usertext'; live_city: 
     ['data-one', 'data-two', 'data-three','data-four']});
```
上面示例代码中，第一个我们使用 onmessage 事件处理器来接收消息，第二个使用 postMessage 来发送普通文本数据，第三个使用 postMessage 来发送结构化的数据，这里我们使用了 JSON 数据格式。

###工作线程事件处理模型

当工作线程被一个具有 URL 参数的构造函数创建的时候，它需要有一系列的处理流程来处理和记录它本身的数据和状态。下面我们给出了工作线程的处理模型如下（注：由于 W3C 中工作线程的规范依然在更新，您读到这篇文章的时候可能看到已不是最新的处理模型，建议参考 W3C 中的最新规范）：

1. 创建一个独立的并行处理环境，并且在这个环境里面异步的运行下面的步骤。

2. 如果它的全局作用域是 SharedWorkerGlobalScope 对象，那么把最合适的应用程序缓存和它联系在一起。

3. 尝试从它提供的 URL 里面使用 synchronous 标志和 force same-origin 标志获取脚本资源。

4. 新脚本创建的时候会按照下面的步骤：

    创建这个脚本的执行环境。
    使用脚本的执行环境解析脚本资源。
    设置脚本的全局变量为工作线程全局变量。
    设置脚本编码为 UTF-8 编码。

5. 启动线程监视器，关闭孤儿线程。

6. 对于挂起线程，启动线程监视器监视挂起线程的状态，即时在并行环境中更改它们的状态。

7. 跳入脚本初始点，并且启动运行。

8. 如果其全局变量为 DedicatedWorkerGlobalScope 对象，然后在线程的隐式端口中启用端口消息队列。

9. 对于事件循环，等待一直到事件循环列表中出现新的任务。

10. 首先运行事件循环列表中的最先进入的任务，但是用户代理可以选择运行任何一个任务。

11. 如果事件循环列表拥有存储 mutex 互斥信号量，那么释放它。

12. 当运行完一个任务后，从事件循环列表中删除它。

13. 如果事件循环列表中还有任务，那么继续前面的步骤执行这些任务。

14. 如果活动超时后，清空工作线程的全局作用域列表。

15. 释放工作线程的端口列表中的所有端口。
###工作线程应用范围和作用域

工作线程的全局作用域仅仅限于工作线程本身，即在线程的生命周期内有效。规范中 WorkerGlobalScope 接口代表了它的全局作用域，下面我们来看下这个接口的具体实施细节（WorkerGlobalScope 抽象接口）。
清单 5. WorkerGlobalScope 抽象接口代码
```javascript
 interface WorkerGlobalScope { 
  readonly attribute WorkerGlobalScope self; 
  readonly attribute WorkerLocation location; 

  void close(); 
           attribute Function onerror; 
 }; 
 WorkerGlobalScope implements WorkerUtils; 
 WorkerGlobalScope implements EventTarget;
 ```
我们可以使用 WorkerGlobalScope 的 self 属性来或者这个对象本身的引用。location 属性返回当线程被创建出来的时候与之关联的 WorkerLocation 对象，它表示用于初始化这个工作线程的脚步资源的绝对 URL，即使页面被多次重定向后，这个 URL 资源位置也不会改变。

当脚本调用 WorkerGlobalScope 上的 close()方法后，会自动的执行下面的两个步骤：

1. 删除这个工作线程事件队列中的所有任务。

2. 设置 WorkerGlobalScope 对象的 closing 状态为 true （这将阻止以后任何新的任务继续添加到事件队列中来）。
###工作线程生命周期

工作线程之间的通信必须依赖于浏览器的上下文环境，并且通过它们的 MessagePort 对象实例传递消息。每个工作线程的全局作用域都拥有这些线程的端口列表，这些列表包括了所有线程使用到的 MessagePort 对象。在专用线程的情况下，这个列表还会包含隐式的 MessagePort 对象。

每个工作线程的全局作用域对象 WorkerGlobalScope 还会有一个工作线程的线程列表，在初始化时这个列表为空。当工作线程被创建的时候或者拥有父工作线程的时候，它们就会被填充进来。

最后，每个工作线程的全局作用域对象 WorkerGlobalScope 还拥有这个线程的文档模型，在初始化时这个列表为空。当工作线程被创建的时候，文档对象就会被填充进来。无论何时当一个文档对象被丢弃的时候，它就要从这个文档对象列举里面删除出来。

在工作线程的生命周期中，定义了下面四种不同类型的线程名称，用以标识它们在线程的整个生命周期中的不同状态：

当一个工作线程的文档对象列举不为空的时候，这个工作线程会被称之为许可线程。（A worker is said to be a permissible worker if its list of the worker's Documents is not empty.）<br>
当一个工作线程是许可线程并且或者拥有数据库事务或者拥有网络连接或者它的工作线程列表不为空的时候，这个工作线程会被称之为受保护的线程。（A worker is said to be a protected worker if it is a permissible worker and either it has outstanding timers, database transactions, or network connections, or its list of the worker's ports is not empty）<br>
当一个工作线程的文档对象列表中的任何一个对象都是处于完全活动状态的时候，这个工作线程会被称之为需要激活线程。（A worker is said to be an active needed worker if any of the Document objects in the worker's Documents are fully active.）<br>
当一个工作线程是一个非需要激活线程同时又是一个许可线程的时候，这个工作线程会被称之为挂起线程。（A worker is said to be a suspendable worker if it is not an active needed worker but it is a permissible worker.）<br>



