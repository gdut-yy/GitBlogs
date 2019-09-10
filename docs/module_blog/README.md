# minipack 源码学习

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