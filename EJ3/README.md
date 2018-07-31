# Effecitive Java ( Third Edition ) 

![](EJ3.jpg)

## CHAPTER 2 : Creating and Destroying Objects 创建和销毁对象

### Item 1 : Consider static factory methods instead of constructors
第 1 条：考虑用静态工厂方法代替构造器

### Item 2 : Consider a builder when faced with many constructor parameters

### Item 3 : Enforce the singleton property with a private constructor or an enum type 

### Item 4 : Enforce noninstantiability with a private constructor

### Item 5 : Prefer dependency injection to hardwiring resources

### Item 6 : Avoid creating unnecessary objects

### Item 7 : Eliminate obsolete object references

### Item 8 : Avoid finalizers and cleaners

### Item 9 : 

## CHAPTER 3 : Methods Common to All Objects 

## CHAPTER 11 : Concurrency 并发

### Item 78 : Synchronize access to share mutable data
第 78 条：同步访问共享的可变数据

- 术语：atomic 原子。Java 语言规范中保证读或写一个（非 long 或 double）变量时是原子的。
- 术语：liveness failure : the program fails to make progress. 活性失败：程序无法前进。
- 术语：safety failure : the program computes the wrong results. 安全性失败：程序计算出错误的结果。

volatile 关键字。虽然 volatile 修饰符不执行互斥访问，但它可以保证任何一个线程在读取该域的时候都将看到最近刚刚被写入的值。

如果读和写操作没有都被同步，同步就不会起作用。

自增 AtomicLong 类型（java.util.concurrent.atomic）

### Item 79 : Avoid excessive synchronization
第 79 条：避免过度同步

- 不要从同步区域内调用外来方法
- 尽量减少同步区域内的工作量
- 在设计类时，有足够理由在内部同步类时，才在内部同步
### Item 80 : Prefer executors, tasks, and streams to threads
第 80 条：executors, tasks 优先于线程

- Executors.newCachedThreadPool 
- Executors.newFixedThreadPool
- fork-join 
### Item 81 : Prefer concurrency utilities to wait and notify
第 81 条：并发工具优先于 wait 和 notify

- System.nanoTime
- System.currentTimeMillis
### Item 82 : Document thread safety
第 82 条：线程安全化的文档化

常见线程安全性级别：

- Immutable 不可变的
- Unconditionally thread-safe 无条件的线程安全
- Conditionally thread-safe 有条件的线程安全
- No thread-safe 非线程安全
- Thread-hostile 线程对立
### Item 83 : Use lazy initialization
第 83 条：慎用延迟初始化


### Item 84 : Don't depend on the threadscheduler
第 84 条：不要依赖线程调度器

## CHAPTER 12 : Serialization

### Item 85 : 

### Item 86 : 
