# 源码学习
## minipack 源码学习

源码地址：[https://github.com/ronami/minipack](https://github.com/ronami/minipack)

```js
/**
 * Module bundlers compile small pieces of code into something larger and more
 * complex that can run in a web browser. These small pieces are just JavaScript
 * files, and dependencies between them are expressed by a module system
 * (https://webpack.js.org/concepts/modules).
 *
 * 模块捆绑器将小段代码编译成可以在web浏览器中运行的更大更复杂的代码。
 * 这些小块只是JavaScript文件，它们之间的依赖关系由模块系统表示
 * (https://webpack.js.org/concepts/modules)。
 *
 * Module bundlers have this concept of an entry file. Instead of adding a few
 * script tags in the browser and letting them run, we let the bundler know
 * which file is the main file of our application. This is the file that should
 * bootstrap our entire application.
 *
 * 模块绑定器有一个条目文件的概念。我们没有在浏览器中添加一些脚本标记并让它们运行，
 * 而是让bundler知道哪个文件是应用程序的主文件。这是应该引导整个应用程序的文件。
 *
 * Our bundler will start from that entry file, and it will try to understand
 * which files it depends on. Then, it will try to understand which files its
 * dependencies depend on. It will keep doing that until it figures out about
 * every module in our application, and how they depend on one another.
 *
 * 我们的bundler将从该条目文件开始，它将尝试理解它所依赖的文件。然后，它将尝试理解依赖关系
 * 所依赖的文件。它会一直这样做，直到它弄清楚应用程序中的每个模块，以及它们之间是如何相互依赖的。
 *
 * This understanding of a project is called the dependency graph.
 *
 * 对项目的这种理解称为依赖关系图。
 *
 * In this example, we will create a dependency graph and use it to package
 * all of its modules in one bundle.
 *
 * 在本例中，我们将创建一个依赖关系图，并使用它将所有模块打包到一个包中。
 *
 * Let's begin :)
 *
 * 让我们开始吧 :)
 *
 * Please note: This is a very simplified example. Handling cases such as
 * circular dependencies, caching module exports, parsing each module just once
 * and others are skipped to make this example as simple as possible.
 *
 * 请注意:这是一个非常简单的例子。处理循环依赖关系、缓存模块导出、只解析每个模块一次等情况，
 * 并跳过其他内容，以使这个示例尽可能简单。
 */

const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')

let ID = 0

// We start by creating a function that will accept a path to a file, read
// its contents, and extract its dependencies.
//
// 我们首先创建一个函数，该函数将接受文件的路径、读取其内容并提取其依赖项。
function createAsset(filename) {
  // Read the content of the file as a string.
  //
  // 将文件的内容作为字符串读取。
  const content = fs.readFileSync(filename, 'utf-8')

  // Now we try to figure out which files this file depends on. We can do that
  // by looking at its content for import strings. However, this is a pretty
  // clunky approach, so instead, we will use a JavaScript parser.
  //
  // 现在我们试着找出这个文件所依赖的文件。我们可以通过查看导入字符串的内容来做到这一点。
  // 然而，这是一种非常笨拙的方法，因此我们将使用JavaScript解析器。
  //
  // JavaScript parsers are tools that can read and understand JavaScript code.
  // They generate a more abstract model called an AST (abstract syntax tree).
  //
  // JavaScript解析器是能够读取和理解JavaScript代码的工具。
  // 它们生成一个更抽象的模型，称为AST(抽象语法树)。
  //
  // I strongly suggest that you look at AST Explorer (https://astexplorer.net)
  // to see how an AST looks like.
  //
  // 我强烈建议您查看一下AST Explorer (https://astexplorer.net)，看看AST是什么样子的。
  //
  // The AST contains a lot of information about our code. We can query it to
  // understand what our code is trying to do.
  //
  // AST包含了很多关于我们代码的信息。我们可以查询它来理解我们的代码试图做什么。
  const ast = babylon.parse(content, {
    sourceType: 'module'
  })

  // This array will hold the relative paths of modules this module depends on.
  //
  // 此数组将保存此模块所依赖的模块的相对路径。
  const dependencies = []

  // We traverse the AST to try and understand which modules this module depends
  // on. To do that, we check every import declaration in the AST.
  //
  // 我们遍历AST，试图理解此模块依赖于哪些模块。为此，我们检查AST中的每个导入声明。
  traverse(ast, {
    // EcmaScript modules are fairly easy because they are static. This means
    // that you can't import a variable, or conditionally import another module.
    // Every time we see an import statement we can just count its value as a
    // dependency.
    //
    // EcmaScript模块非常简单，因为它们是静态的。这意味着您不能导入变量，
    // 也不能有条件地导入另一个模块。每次看到import语句时，我们都可以将它的值作为依赖项来计算。
    ImportDeclaration: ({ node }) => {
      // We push the value that we import into the dependencies array.
      //
      // 我们将导入的值推入dependencies数组。
      dependencies.push(node.source.value)
    }
  })

  // We also assign a unique identifier to this module by incrementing a simple
  // counter.
  //
  // 我们还通过递增一个简单计数器为这个模块分配一个唯一标识符。
  const id = ID++

  // We use EcmaScript modules and other JavaScript features that may not be
  // supported on all browsers. To make sure our bundle runs in all browsers we
  // will transpile it with Babel (see https://babeljs.io).
  //
  // 我们使用EcmaScript模块和其他JavaScript特性，这些特性可能不是所有浏览器都支持的。
  // 为了确保我们的包在所有浏览器中运行，我们将用Babel替换它(参见https://babeljs.io)。
  //
  // The `presets` option is a set of rules that tell Babel how to transpile
  // our code. We use `babel-preset-env` to transpile our code to something
  // that most browsers can run.
  //
  // “presets”选项是一组告诉Babel如何转换代码的规则。我们使用“babel-preset-env”
  // 将代码转换为大多数浏览器都能运行的代码。
  const { code } = transformFromAst(ast, null, {
    presets: ['env']
  })

  // Return all information about this module.
  //
  // 返回关于此模块的所有信息。
  return {
    id,
    filename,
    dependencies,
    code
  }
}

// Now that we can extract the dependencies of a single module, we are going to
// start by extracting the dependencies of the entry file.
//
// 现在我们可以提取单个模块的依赖关系，我们将从提取条目文件的依赖关系开始。
//
// Then, we are going to extract the dependencies of every one of its
// dependencies. We will keep that going until we figure out about every module
// in the application and how they depend on one another. This understanding of
// a project is called the dependency graph.
//
// 然后，我们将提取每个依赖项的依赖项。我们将继续这样做，直到我们弄清楚应用程序中的
// 每个模块以及它们之间是如何相互依赖的。对项目的这种理解称为依赖关系图。
function createGraph(entry) {
  // Start by parsing the entry file.
  //
  // 首先解析条目文件。
  const mainAsset = createAsset(entry)

  // We're going to use a queue to parse the dependencies of every asset. To do
  // that we are defining an array with just the entry asset.
  //
  // 我们将使用一个队列来解析每个资产的依赖关系。为此，我们定义了一个只有条目资产的数组。
  const queue = [mainAsset]

  // We use a `for ... of` loop to iterate over the queue. Initially the queue
  // only has one asset but as we iterate it we will push additional new assets
  // into the queue. This loop will terminate when the queue is empty.
  //
  // 我们用 `for ... of` 循环来遍历队列。最初队列只有一个资产，但是当我们迭代它时，
  // 我们将把额外的新资产推入队列。当队列为空时，此循环将终止。
  for (const asset of queue) {
    // Every one of our assets has a list of relative paths to the modules it
    // depends on. We are going to iterate over them, parse them with our
    // `createAsset()` function, and track the dependencies this module has in
    // this object.
    //
    // 我们的每个资产都有一个到它所依赖的模块的相对路径列表。我们将遍历它们，
    // 使用“createAsset()”函数解析它们，并跟踪这个模块在这个对象中的依赖关系。
    asset.mapping = {}

    // This is the directory this module is in.
    //
    // 这是这个模块所在的目录。
    const dirname = path.dirname(asset.filename)

    // We iterate over the list of relative paths to its dependencies.
    //
    // 我们遍历其依赖项的相对路径列表。
    asset.dependencies.forEach(relativePath => {
      // Our `createAsset()` function expects an absolute filename. The
      // dependencies array is an array of relative paths. These paths are
      // relative to the file that imported them. We can turn the relative path
      // into an absolute one by joining it with the path to the directory of
      // the parent asset.
      //
      // 函数的作用是:创建一个绝对文件名。依赖项数组是一个相对路径数组。这些路径相对于导入它们的
      // 文件。通过将相对路径与父资产目录的路径连接起来，我们可以将相对路径转换为绝对路径。
      const absolutePath = path.join(dirname, relativePath)

      // Parse the asset, read its content, and extract its dependencies.
      //
      // 解析资产，读取其内容，并提取其依赖项。
      const child = createAsset(absolutePath)

      // It's essential for us to know that `asset` depends on `child`. We
      // express that relationship by adding a new property to the `mapping`
      // object with the id of the child.
      //
      // 我们必须知道“资产”取决于“孩子”。我们通过使用子对象的id向“mapping”对象
      // 添加一个新属性来表达这种关系。
      asset.mapping[relativePath] = child.id

      // Finally, we push the child asset into the queue so its dependencies
      // will also be iterated over and parsed.
      //
      // 最后，我们将子资产推入队列，这样它的依赖关系也将被迭代和解析。
      queue.push(child)
    })
  }

  // At this point the queue is just an array with every module in the target
  // application: This is how we represent our graph.
  //
  // 此时，队列只是一个数组，包含目标应用程序中的每个模块:这就是我们表示图形的方式。
  return queue
}

// Next, we define a function that will use our graph and return a bundle that
// we can run in the browser.
//
// 接下来，我们定义一个函数，它将使用我们的图形并返回一个可以在浏览器中运行的包。
//
// Our bundle will have just one self-invoking function:
//
// 我们的包将只有一个自调用功能:
//
// (function() {})()
//
// That function will receive just one parameter: An object with information
// about every module in our graph.
//
// 该函数将只接收一个参数:一个对象，其中包含关于图中每个模块的信息。
function bundle(graph) {
  let modules = ''

  // Before we get to the body of that function, we'll construct the object that
  // we'll pass to it as a parameter. Please note that this string that we're
  // building gets wrapped by two curly braces ({}) so for every module, we add
  // a string of this format: `key: value,`.
  //
  // 在我们进入函数主体之前，我们先构造一个对象作为参数传递给它。请注意，我们正在构建的
  // 这个字符串被两个大括号({})包围，因此对于每个模块，我们添加一个这种格式的字符串:`key: value,`。
  graph.forEach(mod => {
    // Every module in the graph has an entry in this object. We use the
    // module's id as the key and an array for the value (we have 2 values for
    // every module).
    //
    // 图中的每个模块在这个对象中都有一个条目。我们使用模块的id作为键和值的数组(每个模块有两个值)。
    //
    // The first value is the code of each module wrapped with a function. This
    // is because modules should be scoped: Defining a variable in one module
    // shouldn't affect others or the global scope.
    //
    // 第一个值是用函数封装的每个模块的代码。这是因为模块应该有作用域:在一个模块中定义变量
    // 不应该影响其他模块或全局作用域。
    //
    // Our modules, after we transpiled them, use the CommonJS module system:
    // They expect a `require`, a `module` and an `exports` objects to be
    // available. Those are not normally available in the browser so we'll
    // implement them and inject them into our function wrappers.
    //
    // 我们的模块在转换之后，使用CommonJS模块系统:它们期望有一个“require”、一个“module”
    // 和一个“exports”对象可用。这些通常在浏览器中不可用，所以我们将实现它们并将它们注入到函数包装器中。
    //
    // For the second value, we stringify the mapping between a module and its
    // dependencies. This is an object that looks like this:
    //
    // 对于第二个值，我们将模块及其依赖项之间的映射字符串化。这个物体是这样的:
    //
    // { './relative/path': 1 }.
    //
    // This is because the transpiled code of our modules has calls to
    // `require()` with relative paths. When this function is called, we should
    // be able to know which module in the graph corresponds to that relative
    // path for this module.
    //
    // 这是因为我们模块的换位代码调用了‘require()’和相对路径。当调用这个函数时，我们应该能够
    // 知道图中的哪个模块对应于这个模块的相对路径。
    modules += `${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],`
  })

  // Finally, we implement the body of the self-invoking function.
  //
  // 最后，我们实现了自调用函数的主体。
  //
  // We start by creating a `require()` function: It accepts a module id and
  // looks for it in the `modules` object we constructed previously. We
  // destructure over the two-value array to get our function wrapper and the
  // mapping object.
  //
  // 我们首先创建一个' require() '函数:它接受一个模块id，并在前面构造的' modules '对象中查找它。
  // 我们对双值数组进行结构分解，以获得函数包装器和映射对象。
  //
  // The code of our modules has calls to `require()` with relative file paths
  // instead of module ids. Our require function expects module ids. Also, two
  // modules might `require()` the same relative path but mean two different
  // modules.
  //
  // 我们模块的代码使用相对的文件路径而不是模块id调用' require() '。我们的require函数需要
  // 模块id。此外，两个模块可能“需要()”相同的相对路径，但意味着两个不同的模块。
  //
  // To handle that, when a module is required we create a new, dedicated
  // `require` function for it to use. It will be specific to that module and
  // will know to turn its relative paths into ids by using the module's
  // mapping object. The mapping object is exactly that, a mapping between
  // relative paths and module ids for that specific module.
  //
  // 为了处理这个问题，当需要一个模块时，我们创建一个新的、专用的“require”函数供它使用。
  // 它将特定于该模块，并知道如何使用模块的映射对象将其相对路径转换为id。映射对象就是该
  // 特定模块的相对路径和模块id之间的映射。
  //
  // Lastly, with CommonJs, when a module is required, it can expose values by
  // mutating its `exports` object. The `exports` object, after it has been
  // changed by the module's code, is returned from the `require()` function.
  //
  // 最后，使用CommonJs，当需要模块时，它可以通过修改其 `exports` 对象来公开值。
  //  `exports` 对象在被模块代码更改之后，从 `require()` 函数返回。
  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];

        function localRequire(name) {
          return require(mapping[name]);
        }

        const module = { exports : {} };

        fn(localRequire, module, module.exports);

        return module.exports;
      }

      require(0);
    })({${modules}})
  `

  // We simply return the result, hurray! :)
  //
  // 我们只是返回结果，万岁! :)
  return result
}

const graph = createGraph('./example/entry.js')
const result = bundle(graph)

console.log(result)
```

## Vue.js 双向绑定源码

## JDK-8 Executors 类
```java
/*
 * Written by Doug Lea with assistance from members of JCP JSR-166
 * Expert Group and released to the public domain, as explained at
 * http://creativecommons.org/publicdomain/zero/1.0/
 */

package java.util.concurrent;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.security.AccessControlContext;
import java.security.AccessController;
import java.security.PrivilegedAction;
import java.security.PrivilegedExceptionAction;
import java.security.PrivilegedActionException;
import java.security.AccessControlException;
import sun.security.util.SecurityConstants;

/**
 * Factory and utility methods for {@link Executor}, {@link
 * ExecutorService}, {@link ScheduledExecutorService}, {@link
 * ThreadFactory}, and {@link Callable} classes defined in this
 * package. This class supports the following kinds of methods:
 *
 * <ul>
 *   <li> Methods that create and return an {@link ExecutorService}
 *        set up with commonly useful configuration settings.
 *   <li> Methods that create and return a {@link ScheduledExecutorService}
 *        set up with commonly useful configuration settings.
 *   <li> Methods that create and return a "wrapped" ExecutorService, that
 *        disables reconfiguration by making implementation-specific methods
 *        inaccessible.
 *   <li> Methods that create and return a {@link ThreadFactory}
 *        that sets newly created threads to a known state.
 *   <li> Methods that create and return a {@link Callable}
 *        out of other closure-like forms, so they can be used
 *        in execution methods requiring {@code Callable}.
 * </ul>
 *
 * @since 1.5
 * @author Doug Lea
 */
public class Executors {

    /**
     * Creates a thread pool that reuses a fixed number of threads
     * operating off a shared unbounded queue.  At any point, at most
     * {@code nThreads} threads will be active processing tasks.
     * If additional tasks are submitted when all threads are active,
     * they will wait in the queue until a thread is available.
     * If any thread terminates due to a failure during execution
     * prior to shutdown, a new one will take its place if needed to
     * execute subsequent tasks.  The threads in the pool will exist
     * until it is explicitly {@link ExecutorService#shutdown shutdown}.
     *
     * 创建一个线程池，该线程池重用在共享无界队列上运行的固定数量的线程。
     * 在任何时候，大多数{@code nThreads}线程都是活动的处理任务。
     * 如果在所有线程都处于活动状态时提交其他任务，它们将在队列中等待，直到线程可用为止。
     * 如果任何线程在关闭之前的执行过程中由于失败而终止，那么如果需要执行后续任务，则会替换一个新线程。
     * 池中的线程将一直存在，直到显式地变成{@link ExecutorService#shutdown shutdown}。
     *
     * @param nThreads the number of threads in the pool
     * @return the newly created thread pool
     * @throws IllegalArgumentException if {@code nThreads <= 0}
     */
    public static ExecutorService newFixedThreadPool(int nThreads) {
        return new ThreadPoolExecutor(nThreads, nThreads,
                                      0L, TimeUnit.MILLISECONDS,
                                      new LinkedBlockingQueue<Runnable>());
    }

    /**
     * Creates a thread pool that maintains enough threads to support
     * the given parallelism level, and may use multiple queues to
     * reduce contention. The parallelism level corresponds to the
     * maximum number of threads actively engaged in, or available to
     * engage in, task processing. The actual number of threads may
     * grow and shrink dynamically. A work-stealing pool makes no
     * guarantees about the order in which submitted tasks are
     * executed.
     *
     * 创建一个线程池，该线程池维护足够的线程以支持给定的并行度级别，并且可以使用多个队列来减少争用。
     * 并行度级别对应于ngage in任务处理中活动或可用的最大线程数。线程的实际数量可以动态地增长和收缩。
     * 工作窃取池不能保证所提交任务的执行顺序。
     *
     * @param parallelism the targeted parallelism level
     * @return the newly created thread pool
     * @throws IllegalArgumentException if {@code parallelism <= 0}
     * @since 1.8
     */
    public static ExecutorService newWorkStealingPool(int parallelism) {
        return new ForkJoinPool
            (parallelism,
             ForkJoinPool.defaultForkJoinWorkerThreadFactory,
             null, true);
    }

    /**
     * Creates a work-stealing thread pool using all
     * {@link Runtime#availableProcessors available processors}
     * as its target parallelism level.
     * @return the newly created thread pool
     * @see #newWorkStealingPool(int)
     * @since 1.8
     */
    public static ExecutorService newWorkStealingPool() {
        return new ForkJoinPool
            (Runtime.getRuntime().availableProcessors(),
             ForkJoinPool.defaultForkJoinWorkerThreadFactory,
             null, true);
    }

    /**
     * Creates a thread pool that reuses a fixed number of threads
     * operating off a shared unbounded queue, using the provided
     * ThreadFactory to create new threads when needed.  At any point,
     * at most {@code nThreads} threads will be active processing
     * tasks.  If additional tasks are submitted when all threads are
     * active, they will wait in the queue until a thread is
     * available.  If any thread terminates due to a failure during
     * execution prior to shutdown, a new one will take its place if
     * needed to execute subsequent tasks.  The threads in the pool will
     * exist until it is explicitly {@link ExecutorService#shutdown
     * shutdown}.
     *
     * @param nThreads the number of threads in the pool
     * @param threadFactory the factory to use when creating new threads
     * @return the newly created thread pool
     * @throws NullPointerException if threadFactory is null
     * @throws IllegalArgumentException if {@code nThreads <= 0}
     */
    public static ExecutorService newFixedThreadPool(int nThreads, ThreadFactory threadFactory) {
        return new ThreadPoolExecutor(nThreads, nThreads,
                                      0L, TimeUnit.MILLISECONDS,
                                      new LinkedBlockingQueue<Runnable>(),
                                      threadFactory);
    }

    /**
     * Creates an Executor that uses a single worker thread operating
     * off an unbounded queue. (Note however that if this single
     * thread terminates due to a failure during execution prior to
     * shutdown, a new one will take its place if needed to execute
     * subsequent tasks.)  Tasks are guaranteed to execute
     * sequentially, and no more than one task will be active at any
     * given time. Unlike the otherwise equivalent
     * {@code newFixedThreadPool(1)} the returned executor is
     * guaranteed not to be reconfigurable to use additional threads.
     *
     * @return the newly created single-threaded Executor
     */
    public static ExecutorService newSingleThreadExecutor() {
        return new FinalizableDelegatedExecutorService
            (new ThreadPoolExecutor(1, 1,
                                    0L, TimeUnit.MILLISECONDS,
                                    new LinkedBlockingQueue<Runnable>()));
    }

    /**
     * Creates an Executor that uses a single worker thread operating
     * off an unbounded queue, and uses the provided ThreadFactory to
     * create a new thread when needed. Unlike the otherwise
     * equivalent {@code newFixedThreadPool(1, threadFactory)} the
     * returned executor is guaranteed not to be reconfigurable to use
     * additional threads.
     *
     * @param threadFactory the factory to use when creating new
     * threads
     *
     * @return the newly created single-threaded Executor
     * @throws NullPointerException if threadFactory is null
     */
    public static ExecutorService newSingleThreadExecutor(ThreadFactory threadFactory) {
        return new FinalizableDelegatedExecutorService
            (new ThreadPoolExecutor(1, 1,
                                    0L, TimeUnit.MILLISECONDS,
                                    new LinkedBlockingQueue<Runnable>(),
                                    threadFactory));
    }

    /**
     * Creates a thread pool that creates new threads as needed, but
     * will reuse previously constructed threads when they are
     * available.  These pools will typically improve the performance
     * of programs that execute many short-lived asynchronous tasks.
     * Calls to {@code execute} will reuse previously constructed
     * threads if available. If no existing thread is available, a new
     * thread will be created and added to the pool. Threads that have
     * not been used for sixty seconds are terminated and removed from
     * the cache. Thus, a pool that remains idle for long enough will
     * not consume any resources. Note that pools with similar
     * properties but different details (for example, timeout parameters)
     * may be created using {@link ThreadPoolExecutor} constructors.
     *
     * @return the newly created thread pool
     */
    public static ExecutorService newCachedThreadPool() {
        return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                      60L, TimeUnit.SECONDS,
                                      new SynchronousQueue<Runnable>());
    }

    /**
     * Creates a thread pool that creates new threads as needed, but
     * will reuse previously constructed threads when they are
     * available, and uses the provided
     * ThreadFactory to create new threads when needed.
     * @param threadFactory the factory to use when creating new threads
     * @return the newly created thread pool
     * @throws NullPointerException if threadFactory is null
     */
    public static ExecutorService newCachedThreadPool(ThreadFactory threadFactory) {
        return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                      60L, TimeUnit.SECONDS,
                                      new SynchronousQueue<Runnable>(),
                                      threadFactory);
    }

    /**
     * Creates a single-threaded executor that can schedule commands
     * to run after a given delay, or to execute periodically.
     * (Note however that if this single
     * thread terminates due to a failure during execution prior to
     * shutdown, a new one will take its place if needed to execute
     * subsequent tasks.)  Tasks are guaranteed to execute
     * sequentially, and no more than one task will be active at any
     * given time. Unlike the otherwise equivalent
     * {@code newScheduledThreadPool(1)} the returned executor is
     * guaranteed not to be reconfigurable to use additional threads.
     * @return the newly created scheduled executor
     */
    public static ScheduledExecutorService newSingleThreadScheduledExecutor() {
        return new DelegatedScheduledExecutorService
            (new ScheduledThreadPoolExecutor(1));
    }

    /**
     * Creates a single-threaded executor that can schedule commands
     * to run after a given delay, or to execute periodically.  (Note
     * however that if this single thread terminates due to a failure
     * during execution prior to shutdown, a new one will take its
     * place if needed to execute subsequent tasks.)  Tasks are
     * guaranteed to execute sequentially, and no more than one task
     * will be active at any given time. Unlike the otherwise
     * equivalent {@code newScheduledThreadPool(1, threadFactory)}
     * the returned executor is guaranteed not to be reconfigurable to
     * use additional threads.
     * @param threadFactory the factory to use when creating new
     * threads
     * @return a newly created scheduled executor
     * @throws NullPointerException if threadFactory is null
     */
    public static ScheduledExecutorService newSingleThreadScheduledExecutor(ThreadFactory threadFactory) {
        return new DelegatedScheduledExecutorService
            (new ScheduledThreadPoolExecutor(1, threadFactory));
    }

    /**
     * Creates a thread pool that can schedule commands to run after a
     * given delay, or to execute periodically.
     * @param corePoolSize the number of threads to keep in the pool,
     * even if they are idle
     * @return a newly created scheduled thread pool
     * @throws IllegalArgumentException if {@code corePoolSize < 0}
     */
    public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
        return new ScheduledThreadPoolExecutor(corePoolSize);
    }

    /**
     * Creates a thread pool that can schedule commands to run after a
     * given delay, or to execute periodically.
     * @param corePoolSize the number of threads to keep in the pool,
     * even if they are idle
     * @param threadFactory the factory to use when the executor
     * creates a new thread
     * @return a newly created scheduled thread pool
     * @throws IllegalArgumentException if {@code corePoolSize < 0}
     * @throws NullPointerException if threadFactory is null
     */
    public static ScheduledExecutorService newScheduledThreadPool(
            int corePoolSize, ThreadFactory threadFactory) {
        return new ScheduledThreadPoolExecutor(corePoolSize, threadFactory);
    }

    /**
     * Returns an object that delegates all defined {@link
     * ExecutorService} methods to the given executor, but not any
     * other methods that might otherwise be accessible using
     * casts. This provides a way to safely "freeze" configuration and
     * disallow tuning of a given concrete implementation.
     * @param executor the underlying implementation
     * @return an {@code ExecutorService} instance
     * @throws NullPointerException if executor null
     */
    public static ExecutorService unconfigurableExecutorService(ExecutorService executor) {
        if (executor == null)
            throw new NullPointerException();
        return new DelegatedExecutorService(executor);
    }

    /**
     * Returns an object that delegates all defined {@link
     * ScheduledExecutorService} methods to the given executor, but
     * not any other methods that might otherwise be accessible using
     * casts. This provides a way to safely "freeze" configuration and
     * disallow tuning of a given concrete implementation.
     * @param executor the underlying implementation
     * @return a {@code ScheduledExecutorService} instance
     * @throws NullPointerException if executor null
     */
    public static ScheduledExecutorService unconfigurableScheduledExecutorService(ScheduledExecutorService executor) {
        if (executor == null)
            throw new NullPointerException();
        return new DelegatedScheduledExecutorService(executor);
    }

    /**
     * Returns a default thread factory used to create new threads.
     * This factory creates all new threads used by an Executor in the
     * same {@link ThreadGroup}. If there is a {@link
     * java.lang.SecurityManager}, it uses the group of {@link
     * System#getSecurityManager}, else the group of the thread
     * invoking this {@code defaultThreadFactory} method. Each new
     * thread is created as a non-daemon thread with priority set to
     * the smaller of {@code Thread.NORM_PRIORITY} and the maximum
     * priority permitted in the thread group.  New threads have names
     * accessible via {@link Thread#getName} of
     * <em>pool-N-thread-M</em>, where <em>N</em> is the sequence
     * number of this factory, and <em>M</em> is the sequence number
     * of the thread created by this factory.
     * @return a thread factory
     */
    public static ThreadFactory defaultThreadFactory() {
        return new DefaultThreadFactory();
    }

    /**
     * Returns a thread factory used to create new threads that
     * have the same permissions as the current thread.
     * This factory creates threads with the same settings as {@link
     * Executors#defaultThreadFactory}, additionally setting the
     * AccessControlContext and contextClassLoader of new threads to
     * be the same as the thread invoking this
     * {@code privilegedThreadFactory} method.  A new
     * {@code privilegedThreadFactory} can be created within an
     * {@link AccessController#doPrivileged AccessController.doPrivileged}
     * action setting the current thread's access control context to
     * create threads with the selected permission settings holding
     * within that action.
     *
     * <p>Note that while tasks running within such threads will have
     * the same access control and class loader settings as the
     * current thread, they need not have the same {@link
     * java.lang.ThreadLocal} or {@link
     * java.lang.InheritableThreadLocal} values. If necessary,
     * particular values of thread locals can be set or reset before
     * any task runs in {@link ThreadPoolExecutor} subclasses using
     * {@link ThreadPoolExecutor#beforeExecute(Thread, Runnable)}.
     * Also, if it is necessary to initialize worker threads to have
     * the same InheritableThreadLocal settings as some other
     * designated thread, you can create a custom ThreadFactory in
     * which that thread waits for and services requests to create
     * others that will inherit its values.
     *
     * @return a thread factory
     * @throws AccessControlException if the current access control
     * context does not have permission to both get and set context
     * class loader
     */
    public static ThreadFactory privilegedThreadFactory() {
        return new PrivilegedThreadFactory();
    }

    /**
     * Returns a {@link Callable} object that, when
     * called, runs the given task and returns the given result.  This
     * can be useful when applying methods requiring a
     * {@code Callable} to an otherwise resultless action.
     * @param task the task to run
     * @param result the result to return
     * @param <T> the type of the result
     * @return a callable object
     * @throws NullPointerException if task null
     */
    public static <T> Callable<T> callable(Runnable task, T result) {
        if (task == null)
            throw new NullPointerException();
        return new RunnableAdapter<T>(task, result);
    }

    /**
     * Returns a {@link Callable} object that, when
     * called, runs the given task and returns {@code null}.
     * @param task the task to run
     * @return a callable object
     * @throws NullPointerException if task null
     */
    public static Callable<Object> callable(Runnable task) {
        if (task == null)
            throw new NullPointerException();
        return new RunnableAdapter<Object>(task, null);
    }

    /**
     * Returns a {@link Callable} object that, when
     * called, runs the given privileged action and returns its result.
     * @param action the privileged action to run
     * @return a callable object
     * @throws NullPointerException if action null
     */
    public static Callable<Object> callable(final PrivilegedAction<?> action) {
        if (action == null)
            throw new NullPointerException();
        return new Callable<Object>() {
            public Object call() { return action.run(); }};
    }

    /**
     * Returns a {@link Callable} object that, when
     * called, runs the given privileged exception action and returns
     * its result.
     * @param action the privileged exception action to run
     * @return a callable object
     * @throws NullPointerException if action null
     */
    public static Callable<Object> callable(final PrivilegedExceptionAction<?> action) {
        if (action == null)
            throw new NullPointerException();
        return new Callable<Object>() {
            public Object call() throws Exception { return action.run(); }};
    }

    /**
     * Returns a {@link Callable} object that will, when called,
     * execute the given {@code callable} under the current access
     * control context. This method should normally be invoked within
     * an {@link AccessController#doPrivileged AccessController.doPrivileged}
     * action to create callables that will, if possible, execute
     * under the selected permission settings holding within that
     * action; or if not possible, throw an associated {@link
     * AccessControlException}.
     * @param callable the underlying task
     * @param <T> the type of the callable's result
     * @return a callable object
     * @throws NullPointerException if callable null
     */
    public static <T> Callable<T> privilegedCallable(Callable<T> callable) {
        if (callable == null)
            throw new NullPointerException();
        return new PrivilegedCallable<T>(callable);
    }

    /**
     * Returns a {@link Callable} object that will, when called,
     * execute the given {@code callable} under the current access
     * control context, with the current context class loader as the
     * context class loader. This method should normally be invoked
     * within an
     * {@link AccessController#doPrivileged AccessController.doPrivileged}
     * action to create callables that will, if possible, execute
     * under the selected permission settings holding within that
     * action; or if not possible, throw an associated {@link
     * AccessControlException}.
     *
     * @param callable the underlying task
     * @param <T> the type of the callable's result
     * @return a callable object
     * @throws NullPointerException if callable null
     * @throws AccessControlException if the current access control
     * context does not have permission to both set and get context
     * class loader
     */
    public static <T> Callable<T> privilegedCallableUsingCurrentClassLoader(Callable<T> callable) {
        if (callable == null)
            throw new NullPointerException();
        return new PrivilegedCallableUsingCurrentClassLoader<T>(callable);
    }

    // Non-public classes supporting the public methods

    /**
     * A callable that runs given task and returns given result
     */
    static final class RunnableAdapter<T> implements Callable<T> {
        final Runnable task;
        final T result;
        RunnableAdapter(Runnable task, T result) {
            this.task = task;
            this.result = result;
        }
        public T call() {
            task.run();
            return result;
        }
    }

    /**
     * A callable that runs under established access control settings
     */
    static final class PrivilegedCallable<T> implements Callable<T> {
        private final Callable<T> task;
        private final AccessControlContext acc;

        PrivilegedCallable(Callable<T> task) {
            this.task = task;
            this.acc = AccessController.getContext();
        }

        public T call() throws Exception {
            try {
                return AccessController.doPrivileged(
                    new PrivilegedExceptionAction<T>() {
                        public T run() throws Exception {
                            return task.call();
                        }
                    }, acc);
            } catch (PrivilegedActionException e) {
                throw e.getException();
            }
        }
    }

    /**
     * A callable that runs under established access control settings and
     * current ClassLoader
     */
    static final class PrivilegedCallableUsingCurrentClassLoader<T> implements Callable<T> {
        private final Callable<T> task;
        private final AccessControlContext acc;
        private final ClassLoader ccl;

        PrivilegedCallableUsingCurrentClassLoader(Callable<T> task) {
            SecurityManager sm = System.getSecurityManager();
            if (sm != null) {
                // Calls to getContextClassLoader from this class
                // never trigger a security check, but we check
                // whether our callers have this permission anyways.
                sm.checkPermission(SecurityConstants.GET_CLASSLOADER_PERMISSION);

                // Whether setContextClassLoader turns out to be necessary
                // or not, we fail fast if permission is not available.
                sm.checkPermission(new RuntimePermission("setContextClassLoader"));
            }
            this.task = task;
            this.acc = AccessController.getContext();
            this.ccl = Thread.currentThread().getContextClassLoader();
        }

        public T call() throws Exception {
            try {
                return AccessController.doPrivileged(
                    new PrivilegedExceptionAction<T>() {
                        public T run() throws Exception {
                            Thread t = Thread.currentThread();
                            ClassLoader cl = t.getContextClassLoader();
                            if (ccl == cl) {
                                return task.call();
                            } else {
                                t.setContextClassLoader(ccl);
                                try {
                                    return task.call();
                                } finally {
                                    t.setContextClassLoader(cl);
                                }
                            }
                        }
                    }, acc);
            } catch (PrivilegedActionException e) {
                throw e.getException();
            }
        }
    }

    /**
     * The default thread factory
     */
    static class DefaultThreadFactory implements ThreadFactory {
        private static final AtomicInteger poolNumber = new AtomicInteger(1);
        private final ThreadGroup group;
        private final AtomicInteger threadNumber = new AtomicInteger(1);
        private final String namePrefix;

        DefaultThreadFactory() {
            SecurityManager s = System.getSecurityManager();
            group = (s != null) ? s.getThreadGroup() :
                                  Thread.currentThread().getThreadGroup();
            namePrefix = "pool-" +
                          poolNumber.getAndIncrement() +
                         "-thread-";
        }

        public Thread newThread(Runnable r) {
            Thread t = new Thread(group, r,
                                  namePrefix + threadNumber.getAndIncrement(),
                                  0);
            if (t.isDaemon())
                t.setDaemon(false);
            if (t.getPriority() != Thread.NORM_PRIORITY)
                t.setPriority(Thread.NORM_PRIORITY);
            return t;
        }
    }

    /**
     * Thread factory capturing access control context and class loader
     */
    static class PrivilegedThreadFactory extends DefaultThreadFactory {
        private final AccessControlContext acc;
        private final ClassLoader ccl;

        PrivilegedThreadFactory() {
            super();
            SecurityManager sm = System.getSecurityManager();
            if (sm != null) {
                // Calls to getContextClassLoader from this class
                // never trigger a security check, but we check
                // whether our callers have this permission anyways.
                sm.checkPermission(SecurityConstants.GET_CLASSLOADER_PERMISSION);

                // Fail fast
                sm.checkPermission(new RuntimePermission("setContextClassLoader"));
            }
            this.acc = AccessController.getContext();
            this.ccl = Thread.currentThread().getContextClassLoader();
        }

        public Thread newThread(final Runnable r) {
            return super.newThread(new Runnable() {
                public void run() {
                    AccessController.doPrivileged(new PrivilegedAction<Void>() {
                        public Void run() {
                            Thread.currentThread().setContextClassLoader(ccl);
                            r.run();
                            return null;
                        }
                    }, acc);
                }
            });
        }
    }

    /**
     * A wrapper class that exposes only the ExecutorService methods
     * of an ExecutorService implementation.
     */
    static class DelegatedExecutorService extends AbstractExecutorService {
        private final ExecutorService e;
        DelegatedExecutorService(ExecutorService executor) { e = executor; }
        public void execute(Runnable command) { e.execute(command); }
        public void shutdown() { e.shutdown(); }
        public List<Runnable> shutdownNow() { return e.shutdownNow(); }
        public boolean isShutdown() { return e.isShutdown(); }
        public boolean isTerminated() { return e.isTerminated(); }
        public boolean awaitTermination(long timeout, TimeUnit unit)
            throws InterruptedException {
            return e.awaitTermination(timeout, unit);
        }
        public Future<?> submit(Runnable task) {
            return e.submit(task);
        }
        public <T> Future<T> submit(Callable<T> task) {
            return e.submit(task);
        }
        public <T> Future<T> submit(Runnable task, T result) {
            return e.submit(task, result);
        }
        public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks)
            throws InterruptedException {
            return e.invokeAll(tasks);
        }
        public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks,
                                             long timeout, TimeUnit unit)
            throws InterruptedException {
            return e.invokeAll(tasks, timeout, unit);
        }
        public <T> T invokeAny(Collection<? extends Callable<T>> tasks)
            throws InterruptedException, ExecutionException {
            return e.invokeAny(tasks);
        }
        public <T> T invokeAny(Collection<? extends Callable<T>> tasks,
                               long timeout, TimeUnit unit)
            throws InterruptedException, ExecutionException, TimeoutException {
            return e.invokeAny(tasks, timeout, unit);
        }
    }

    static class FinalizableDelegatedExecutorService
        extends DelegatedExecutorService {
        FinalizableDelegatedExecutorService(ExecutorService executor) {
            super(executor);
        }
        protected void finalize() {
            super.shutdown();
        }
    }

    /**
     * A wrapper class that exposes only the ScheduledExecutorService
     * methods of a ScheduledExecutorService implementation.
     */
    static class DelegatedScheduledExecutorService
            extends DelegatedExecutorService
            implements ScheduledExecutorService {
        private final ScheduledExecutorService e;
        DelegatedScheduledExecutorService(ScheduledExecutorService executor) {
            super(executor);
            e = executor;
        }
        public ScheduledFuture<?> schedule(Runnable command, long delay, TimeUnit unit) {
            return e.schedule(command, delay, unit);
        }
        public <V> ScheduledFuture<V> schedule(Callable<V> callable, long delay, TimeUnit unit) {
            return e.schedule(callable, delay, unit);
        }
        public ScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit) {
            return e.scheduleAtFixedRate(command, initialDelay, period, unit);
        }
        public ScheduledFuture<?> scheduleWithFixedDelay(Runnable command, long initialDelay, long delay, TimeUnit unit) {
            return e.scheduleWithFixedDelay(command, initialDelay, delay, unit);
        }
    }

    /** Cannot instantiate. */
    private Executors() {}
}
```

## JDK-8 `Object`
```java
package java.lang;
public class Object {

    private static native void registerNatives();
    static {
        registerNatives();
    }

    /**
     * Returns the runtime class of this {@code Object}. The returned
     * {@code Class} object is the object that is locked by {@code
     * static synchronized} methods of the represented class.
     *
     * <p><b>The actual result type is {@code Class<? extends |X|>}
     * where {@code |X|} is the erasure of the static type of the
     * expression on which {@code getClass} is called.</b> For
     * example, no cast is required in this code fragment:</p>
     *
     * <p>
     * {@code Number n = 0;                             }<br>
     * {@code Class<? extends Number> c = n.getClass(); }
     * </p>
     *
     * @return The {@code Class} object that represents the runtime
     *         class of this object.
     * @jls 15.8.2 Class Literals
     */
    public final native Class<?> getClass();
    
    public native int hashCode();
    
    public boolean equals(Object obj) {
        return (this == obj);
    }
    
    protected native Object clone() throws CloneNotSupportedException;
    
    public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }

    /**
     * 唤醒正在此对象监视器上等待的单个线程。如果有任何线程正在等待这个对象，则选择其中一个线程被唤醒。
     * 选择是任意的，由实现决定。线程通过调用{@code wait}方法之一来等待对象的监视器。
     * <p>
     * 被唤醒的线程将无法继续，直到当前线程释放该对象上的锁。被唤醒的线程将以通常的方式与任何其他线程竞争，
     * 这些线程可能正在积极地竞争同步该对象;例如，在成为下一个锁定此对象的线程时，被唤醒的线程没有可靠的特权或劣势。
     * <p>
     * This method should only be called by a thread that is the owner
     * of this object's monitor. A thread becomes the owner of the
     * object's monitor in one of three ways:
     * <ul>
     * <li>By executing a synchronized instance method of that object.
     * <li>By executing the body of a {@code synchronized} statement
     *     that synchronizes on the object.
     * <li>For objects of type {@code Class,} by executing a
     *     synchronized static method of that class.
     * </ul>
     * <p>
     * Only one thread at a time can own an object's monitor.
     *
     * @throws  IllegalMonitorStateException  if the current thread is not
     *               the owner of this object's monitor.
     * @see        java.lang.Object#notifyAll()
     * @see        java.lang.Object#wait()
     */
    public final native void notify();

    public final native void notifyAll();

    /**
     * Causes the current thread to wait until either another thread invokes the
     * {@link java.lang.Object#notify()} method or the
     * {@link java.lang.Object#notifyAll()} method for this object, or a
     * specified amount of time has elapsed.
     * <p>
     * The current thread must own this object's monitor.
     * <p>
     * This method causes the current thread (call it <var>T</var>) to
     * place itself in the wait set for this object and then to relinquish
     * any and all synchronization claims on this object. Thread <var>T</var>
     * becomes disabled for thread scheduling purposes and lies dormant
     * until one of four things happens:
     * <ul>
     * <li>Some other thread invokes the {@code notify} method for this
     * object and thread <var>T</var> happens to be arbitrarily chosen as
     * the thread to be awakened.
     * <li>Some other thread invokes the {@code notifyAll} method for this
     * object.
     * <li>Some other thread {@linkplain Thread#interrupt() interrupts}
     * thread <var>T</var>.
     * <li>The specified amount of real time has elapsed, more or less.  If
     * {@code timeout} is zero, however, then real time is not taken into
     * consideration and the thread simply waits until notified.
     * </ul>
     * The thread <var>T</var> is then removed from the wait set for this
     * object and re-enabled for thread scheduling. It then competes in the
     * usual manner with other threads for the right to synchronize on the
     * object; once it has gained control of the object, all its
     * synchronization claims on the object are restored to the status quo
     * ante - that is, to the situation as of the time that the {@code wait}
     * method was invoked. Thread <var>T</var> then returns from the
     * invocation of the {@code wait} method. Thus, on return from the
     * {@code wait} method, the synchronization state of the object and of
     * thread {@code T} is exactly as it was when the {@code wait} method
     * was invoked.
     * <p>
     * A thread can also wake up without being notified, interrupted, or
     * timing out, a so-called <i>spurious wakeup</i>.  While this will rarely
     * occur in practice, applications must guard against it by testing for
     * the condition that should have caused the thread to be awakened, and
     * continuing to wait if the condition is not satisfied.  In other words,
     * waits should always occur in loops, like this one:
     * <pre>
     *     synchronized (obj) {
     *         while (&lt;condition does not hold&gt;)
     *             obj.wait(timeout);
     *         ... // Perform action appropriate to condition
     *     }
     * </pre>
     * (For more information on this topic, see Section 3.2.3 in Doug Lea's
     * "Concurrent Programming in Java (Second Edition)" (Addison-Wesley,
     * 2000), or Item 50 in Joshua Bloch's "Effective Java Programming
     * Language Guide" (Addison-Wesley, 2001).
     *
     * <p>If the current thread is {@linkplain java.lang.Thread#interrupt()
     * interrupted} by any thread before or while it is waiting, then an
     * {@code InterruptedException} is thrown.  This exception is not
     * thrown until the lock status of this object has been restored as
     * described above.
     *
     * <p>
     * Note that the {@code wait} method, as it places the current thread
     * into the wait set for this object, unlocks only this object; any
     * other objects on which the current thread may be synchronized remain
     * locked while the thread waits.
     * <p>
     * This method should only be called by a thread that is the owner
     * of this object's monitor. See the {@code notify} method for a
     * description of the ways in which a thread can become the owner of
     * a monitor.
     *
     * @param      timeout   the maximum time to wait in milliseconds.
     * @throws  IllegalArgumentException      if the value of timeout is
     *               negative.
     * @throws  IllegalMonitorStateException  if the current thread is not
     *               the owner of the object's monitor.
     * @throws  InterruptedException if any thread interrupted the
     *             current thread before or while the current thread
     *             was waiting for a notification.  The <i>interrupted
     *             status</i> of the current thread is cleared when
     *             this exception is thrown.
     * @see        java.lang.Object#notify()
     * @see        java.lang.Object#notifyAll()
     */
    public final native void wait(long timeout) throws InterruptedException;

    /**
     * Causes the current thread to wait until another thread invokes the
     * {@link java.lang.Object#notify()} method or the
     * {@link java.lang.Object#notifyAll()} method for this object, or
     * some other thread interrupts the current thread, or a certain
     * amount of real time has elapsed.
     * <p>
     * This method is similar to the {@code wait} method of one
     * argument, but it allows finer control over the amount of time to
     * wait for a notification before giving up. The amount of real time,
     * measured in nanoseconds, is given by:
     * <blockquote>
     * <pre>
     * 1000000*timeout+nanos</pre></blockquote>
     * <p>
     * In all other respects, this method does the same thing as the
     * method {@link #wait(long)} of one argument. In particular,
     * {@code wait(0, 0)} means the same thing as {@code wait(0)}.
     * <p>
     * The current thread must own this object's monitor. The thread
     * releases ownership of this monitor and waits until either of the
     * following two conditions has occurred:
     * <ul>
     * <li>Another thread notifies threads waiting on this object's monitor
     *     to wake up either through a call to the {@code notify} method
     *     or the {@code notifyAll} method.
     * <li>The timeout period, specified by {@code timeout}
     *     milliseconds plus {@code nanos} nanoseconds arguments, has
     *     elapsed.
     * </ul>
     * <p>
     * The thread then waits until it can re-obtain ownership of the
     * monitor and resumes execution.
     * <p>
     * As in the one argument version, interrupts and spurious wakeups are
     * possible, and this method should always be used in a loop:
     * <pre>
     *     synchronized (obj) {
     *         while (&lt;condition does not hold&gt;)
     *             obj.wait(timeout, nanos);
     *         ... // Perform action appropriate to condition
     *     }
     * </pre>
     * This method should only be called by a thread that is the owner
     * of this object's monitor. See the {@code notify} method for a
     * description of the ways in which a thread can become the owner of
     * a monitor.
     *
     * @param      timeout   the maximum time to wait in milliseconds.
     * @param      nanos      additional time, in nanoseconds range
     *                       0-999999.
     * @throws  IllegalArgumentException      if the value of timeout is
     *                      negative or the value of nanos is
     *                      not in the range 0-999999.
     * @throws  IllegalMonitorStateException  if the current thread is not
     *               the owner of this object's monitor.
     * @throws  InterruptedException if any thread interrupted the
     *             current thread before or while the current thread
     *             was waiting for a notification.  The <i>interrupted
     *             status</i> of the current thread is cleared when
     *             this exception is thrown.
     */
    public final void wait(long timeout, int nanos) throws InterruptedException {
        if (timeout < 0) {
            throw new IllegalArgumentException("timeout value is negative");
        }

        if (nanos < 0 || nanos > 999999) {
            throw new IllegalArgumentException(
                                "nanosecond timeout value out of range");
        }

        if (nanos > 0) {
            timeout++;
        }

        wait(timeout);
    }

    
    public final void wait() throws InterruptedException {
        wait(0);
    }

    /**
     * 当垃圾收集确定不再引用对象时，由对象上的垃圾收集器调用。子类覆盖{@code finalize}方法来处理系统资源或执行其他清理。
     * <p>
     * The general contract of {@code finalize} is that it is invoked
     * if and when the Java&trade; virtual
     * machine has determined that there is no longer any
     * means by which this object can be accessed by any thread that has
     * not yet died, except as a result of an action taken by the
     * finalization of some other object or class which is ready to be
     * finalized. The {@code finalize} method may take any action, including
     * making this object available again to other threads; the usual purpose
     * of {@code finalize}, however, is to perform cleanup actions before
     * the object is irrevocably discarded. For example, the finalize method
     * for an object that represents an input/output connection might perform
     * explicit I/O transactions to break the connection before the object is
     * permanently discarded.
     * <p>
     * The {@code finalize} method of class {@code Object} performs no
     * special action; it simply returns normally. Subclasses of
     * {@code Object} may override this definition.
     * <p>
     * The Java programming language does not guarantee which thread will
     * invoke the {@code finalize} method for any given object. It is
     * guaranteed, however, that the thread that invokes finalize will not
     * be holding any user-visible synchronization locks when finalize is
     * invoked. If an uncaught exception is thrown by the finalize method,
     * the exception is ignored and finalization of that object terminates.
     * <p>
     * After the {@code finalize} method has been invoked for an object, no
     * further action is taken until the Java virtual machine has again
     * determined that there is no longer any means by which this object can
     * be accessed by any thread that has not yet died, including possible
     * actions by other objects or classes which are ready to be finalized,
     * at which point the object may be discarded.
     * <p>
     * The {@code finalize} method is never invoked more than once by a Java
     * virtual machine for any given object.
     * <p>
     * Any exception thrown by the {@code finalize} method causes
     * the finalization of this object to be halted, but is otherwise
     * ignored.
     *
     * @throws Throwable the {@code Exception} raised by this method
     * @see java.lang.ref.WeakReference
     * @see java.lang.ref.PhantomReference
     * @jls 12.6 Finalization of Class Instances
     */
    protected void finalize() throws Throwable { }
}

```