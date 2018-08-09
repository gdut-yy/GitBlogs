# Effecitive Java ( Third Edition ) 

![](EJ3.jpg)

## 书评

本书被誉为 Java四大名著 之一。鉴于第三版还没有出中文版，本着 “读新不读旧” 的原则，直接读起了 英文原版。

第三版 新增了 Java 7 ~ 9 的新特性。条目从 78条 增添到 90条。

本书主要内容是作者推荐的 Java 编程时候应该遵循的原则。采用 “观点 + 理由” 的结构。

此书是本人真正意义上的第一本 英文编程类书籍。

值得纪念。

## CHAPTER 1 : Introduction【简介】

## CHAPTER 2 : Creating and Destroying Objects【创建和销毁对象】

### Item 1 : Consider static factory methods instead of constructors【考虑用静态工厂方法代替构造器】

### Item 2 : Consider a builder when faced with many constructor parameters【遇到多个构造器时考虑 builder】

### Item 3 : Enforce the singleton property with a private constructor or an enum type【使用私有构造器或枚举类型实现单例模式】

单例模式是一个非常经典的模式

特别是涉及到 线程安全 和 反射攻击 的时候

作者认为单元素的枚举类型通常是实现单例的最佳方法，即：

	public enum Elvis{
		INSTANCE;
	
		public void leaveTheBuilding(){ ... }
	}

### Item 4 : Enforce noninstantiability with a private constructor【使用私有构造器实现不可实例化】

### Item 5 : Prefer dependency injection to hardwiring resources【DI（依赖注入）优于】

### Item 6 : Avoid creating unnecessary objects【避免创建不必要的对象】

### Item 7 : Eliminate obsolete object references

### Item 8 : Avoid finalizers and cleaners

### Item 9 : 

## CHAPTER 3 : Methods Common to All Objects 

## CHAPTER 5 : Generics【泛型】

### Item 26 : Don't use raw types【不要使用原生类型】

原生态类型是指 Java 5 之前未有泛型的年代的类型。

	Set<Object> 是个参数化类型，表示可以包含任何对象类型的一个集合。
	Set<?> 是一个通配符类型，表示只能包含某种未知对象的一个集合
	Set 则是个原生态类型。

### Item 27 : Eliminate unchecked warnings【消除非受检警告】

@SuppressWarnings("unchecked")

### Item 28 : Perfer lists to arrays【列表优先于数组】

类型转换问题

使用数组可能会在运行时出错，而使用 List 则会在编译时发现出错。

### Item 29 : Favor generic types【优先考虑泛型】

### Item 30 : Favor generic methods【优先考虑泛型方法】

### Item 31 : Use bounded withcards to increase API flexibility【利用有限制通配符来提升 API 的灵活性】

	public void pushAll(Iterable<? extends E> src){
        for(E e : src){
            push(e);
        }
    }
    
    public void popAll(Collection<? super E> dst){
        while (!isEmpty()){
            dst.add(pop());
        }
    }

> PECS stands for producer-extends, consumer-super.

> In other words, if a parameterized type represents a T producer, use <? extends T>;
if it represents a T consumer, use <? super T>. In our Stack example, pushAll’s
src parameter produces E instances for use by the Stack, so the appropriate type
for src is Iterable<? extends E>; popAll’s dst parameter consumes E instances
from the Stack, so the appropriate type for dst is Collection<? super E>. The
PECS mnemonic captures the fundamental principle that guides the use of wildcard
types. Naftalin and Wadler call it the Get and Put Principle [Naftalin07, 2.4].

PECS 表示 producer-extends, consumer-super.

换句话说，如果参数化类型表示一个 T 生产者，就使用 <? extends T>；如果它表示一个 T 消费者，就使用 <? super T>。

在我们的 Stack 示例中，pushAll 的 src 参数产生 E 实例供 Stack 使用，因此 src 相应的类型为 Iterable<? extends E>；

popAll 的 dst 参数通过 Stack 消费 E 实例，因此 dst 相应的类型为 Collection<? super E>。

### Item 32 : Combine generics and varargs judiciously【合并泛型和可变长参】

### Item 33 : Consider typesafe heterogeneous containers【优先考虑类型安全的异构类型】

## CHAPTER 6 : Enums and Annotations【枚举和注解】

Java 5 提供了 枚举类型 和 注解类型。

### Item 34 : Use enums instead of int constants【用 enum 代替 int 常量】

public static final int/String int常量/String常量

### Item 35 : Use instance fileds insteads of ordinals【用实例域代替序数】

ordinal() 方法

### Item 36 : Use EnumSet instead of bit fileds【用 EnumSet 代替位域】

### Item 37 : Use EnumMap instead of ordinal indexing【用 EnumMap 代替 序数索引】

### Item 38 : Emulate extensible enums with interfaces【用接口模拟可伸缩的枚举】

### Item 39 : Perfer annotations to naming patterns【注解优先于命名模式】

### Item 40 : Consistently use the Override annotation【坚持使用 Override 注解】

### Item 41 : Use market interfaces to define types【用标记接口定义类型】

## CHAPTER 7: Lambdas and Streams【Lambdas表达式 和 流】

Java 8 新特性

### Item 42 : Perfer lambdas to anonymous classes

### Item 43 : Perfer methods references to lambdas

### Item 44 : Favor the use of standard functional interfaces

### Item 45 : User streams judiciously

### Item 46 : Perfer side-effect-free functions in streams

### Item 47 : Perfer Collection to Stream as a return type

### Item 48 : Use caution when making streams parallel

## CHAPTER 8 : Methods【方法】

### Item 49 : Check parameters for validity【检查参数的有效性】

### Item 50 : Make defensive copies when needed【必要时进行保护性拷贝】

### Item 51 : Design method signatures carefully【谨慎设计方法签名】

### Item 52 : Use overloading judiciously【慎用重载】

### Item 53 : Use varargs judiciously【慎用可变参数】

### Item 54 : Return empty collections or arrays, not null【返回零长度的数组或集合，而不是 null】

### Item 55 : Return optionals judiciously【谨慎地返回 optionals】

Java 8 新特性

### Item 56 : Write doc comments for all exposed API elements【为所有导出的 API 元素写文档注释】

## CHAPTER 9 : 

## CHAPTER 11 : Concurrency 并发

### Item 78 : Synchronize access to share mutable data【同步访问共享的可变数据】

- 术语：atomic 原子。Java 语言规范中保证读或写一个（非 long 或 double）变量时是原子的。
- 术语：liveness failure : the program fails to make progress. 活性失败：程序无法前进。
- 术语：safety failure : the program computes the wrong results. 安全性失败：程序计算出错误的结果。

volatile 关键字。虽然 volatile 修饰符不执行互斥访问，但它可以保证任何一个线程在读取该域的时候都将看到最近刚刚被写入的值。

如果读和写操作没有都被同步，同步就不会起作用。

自增 AtomicLong 类型（java.util.concurrent.atomic）

### Item 79 : Avoid excessive synchronization【避免过度同步】

- 不要从同步区域内调用外来方法
- 尽量减少同步区域内的工作量
- 在设计类时，有足够理由在内部同步类时，才在内部同步
### Item 80 : Prefer executors, tasks, and streams to threads【executors, tasks 优先于线程】

- Executors.newCachedThreadPool 
- Executors.newFixedThreadPool
- fork-join 
### Item 81 : Prefer concurrency utilities to wait and notify【并发工具优先于 wait 和 notify】

- System.nanoTime
- System.currentTimeMillis
### Item 82 : Document thread safety【线程安全化的文档化】

常见线程安全性级别：

- Immutable 不可变的
- Unconditionally thread-safe 无条件的线程安全
- Conditionally thread-safe 有条件的线程安全
- No thread-safe 非线程安全
- Thread-hostile 线程对立

### Item 83 : Use lazy initialization【慎用延迟初始化】


### Item 84 : Don't depend on the threadscheduler【不要依赖线程调度器】

## CHAPTER 12 : Serialization

### Item 85 : 

### Item 86 : 
