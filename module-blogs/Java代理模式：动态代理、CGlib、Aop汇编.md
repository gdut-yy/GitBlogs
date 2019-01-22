    作者：几米憧憬
    原文：https://note.youdao.com/share/?id=1b50d57ce1f7544da238d2051046ccc6&type=note#/

# Java 代理模式实现方式，主流如下五种方法

- 静态代理，工程师编辑代理类代码，实现代理模式；在编译期就生成了代理类。

- 基于 JDK 实现动态代理，通过jdk提供的工具方法Proxy.newProxyInstance动态构建全新的代理类(继承Proxy类，并持有InvocationHandler接口引用 )字节码文件并实例化对象返回。(jdk动态代理是由java内部的反射机制来实例化代理对象，并代理的调用委托类方法)

- 基于CGlib 动态代理模式 基于继承被代理类生成代理子类，不用实现接口。只需要被代理类是非final 类即可。(cglib动态代理底层是借助asm字节码技术

- 基于 Aspectj 实现动态代理（修改目标类的字节，织入代理的字节，在程序编译的时候 插入动态代理的字节码，不会生成全新的Class   ） 

- 基于 instrumentation 实现动态代理（修改目标类的字节码、类装载的时候动态拦截去修改，基于javaagent） `-javaagent:spring-instrument-4.3.8.RELEASE.jar` （类装载的时候 插入动态代理的字节码，不会生成全新的Class   ）



## Notes
- 委托类 即指的是代理模式中的被代理对象
- 代理类 指的是生成的代表委托类的一个角色

## 静态代理实现
**静态代理是代理类在编译期间就创建好了，不是编译器生成的代理类，而是手动创建的类。在编译时就已经将接口，被代理类，代理类等确定下来。**，软件设计中所指的代理一般是指静态代理，也就是在代码中显式指定的代理。
### 实现步骤
- 委托类和代理类之间的约束接口Cat
- 约束接口实现类 Lion，实现 Cat 接口，委托角色
- 代理类实现 FeederProxy，实现Cat 接口，并含有一个 Cat接口引用属性。 代理角色，代理 cat接口属性引用实例的行为并可以新增公共逻辑
#### Cat接口
```java
package org.vincent.proxy.staticproxy;

/**
 * @author PengRong
 * @package org.vincent.proxy.staticproxy
 * @date 2018/12/15 - 17:12
 * @ProjectName JavaAopLearning
 * @Description: 静态代理类接口, 委托类和代理类都需要实现的接口规范。
 * 定义了一个猫科动物的两个行为接口，吃东西，奔跑。
 * 作为代理类 和委托类之间的约束接口
 */
public interface Cat {
    public String eatFood(String foodName);

    public boolean running();
}

```
#### 委托类 Lion
```java
package org.vincent.proxy.staticproxy;


/**
 * @author PengRong
 * @package org.vincent.proxy.staticproxy
 * @date 2018/12/15 - 17:15
 * @ProjectName JavaAopLearning
 * @Description: 狮子 实现了猫科动物接口Cat， 并实现了具体的行为。作为委托类实现
 */
public class Lion implements Cat {
    private String name;
    private int runningSpeed;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRunningSpeed() {
        return runningSpeed;
    }

    public void setRunningSpeed(int runningSpeed) {
        this.runningSpeed = runningSpeed;
    }

    public Lion() {
    }

    @Override
    public String eatFood(String foodName) {
        String eat = this.name + " Lion eat food. foodName = " + foodName;
        System.out.println(eat);
        return eat;
    }

    @Override
    public boolean running() {
        System.out.println(this.name + " Lion is running . Speed :" + this.runningSpeed);
        return false;
    }
}

```
#### 代理类角色(FeederProxy)
```java
package org.vincent.proxy.staticproxy;

/**
 * @author PengRong
 * @package org.vincent.proxy.staticproxy
 * @date 2018/12/15 - 17:19
 * @ProjectName JavaAopLearning
 * @Description: 饲养员 实现Cat接口，作为静态代理类实现。代理狮子的行为。
 * 代理类中可以新增一些其他行为，在实践中主要做的是参数校验的功能。
 */
public class FeederProxy implements Cat {
    private Cat cat;

    public FeederProxy(){}
    public FeederProxy(Cat cat) {
        if (cat instanceof Cat) {
            this.cat = cat;
        }
    }

    public void setCat(Cat cat) {
        if (cat instanceof Cat) {
            this.cat = cat;
        }
    }

    @Override
    public String eatFood(String foodName) {
        System.out.println("proxy Lion exec eatFood ");
        return cat.eatFood(foodName);
    }

    @Override
    public boolean running() {
        System.out.println("proxy Lion exec running.");
        return cat.running();
    }
}


```

#### 静态代理类测试
```java
package org.vincent.proxy;

import org.vincent.proxy.staticproxy.Cat;
import org.vincent.proxy.staticproxy.FeederProxy;
import org.vincent.proxy.staticproxy.Lion;

/**
 * @author PengRong
 * @package org.vincent.proxy
 * @date 2018/12/15 - 18:31
 * @ProjectName JavaAopLearning
 * @Description: 静态代理类测试
 */
public class staticProxyTest {
    public static void main(String[] args) {
        Lion lion = new Lion();
        lion.setName("狮子 小王");
        lion.setRunningSpeed(100);
        /**
         * new 静态代理类，静态代理类在编译前已经创建好了，和动态代理的最大区别点
         */
        Cat proxy = new FeederProxy(lion);

        System.out.println(Thread.currentThread().getName()+" -- " + proxy.eatFood("水牛"));
        proxy.running();
    }
}


```

静态代理很好的诠释了代理设计模式，代理模式最主要的就是有一个公共接口（Cat），一个委托类（Lion），一个代理类（FeederProxy）,代理类持有委托类的实例，代为执行具体类实例方法。
上面说到，代理模式就是在访问实际对象时引入一定程度的间接性，因为这种间接性，可以附加多种用途。这里的间接性就是指客户端不直接调用实际对象的方法，客户端依赖公共接口并使用代理类。
那么我们在代理过程中就可以加上一些其他用途。 就这个例子来说在 eatFood方法调用中，代理类在调用具体实现类之前添加` System.out.println("proxy Lion exec eatFood ");`语句
就是添加间接性带来的收益。代理类存在的意义是为了增加一些公共的逻辑代码。

## 动态代理类(基于接口实现)
静态代理是代理类在代码运行前已经创建好，并生成class文件；动态代理类 是代理类在程序运行时创建的代理模式。 

动态代理类的代理类并不是在Java代码中定义的，而是在运行时根据我们在Java代码中的“指示”动态生成的。相比于静态代理， 动态代理的优势在于可以很方便的对代理类的函数进行统一的处理，而不用修改每个代理类中的方法。
想想你有100个静态代理类，现在有一个需求，每个代理类都需要新增一个处理逻辑，你需要打开100个代理类在每个代理方法里面新增处理逻辑吗？ 有或者代理类有5个方法，每个方法都需要新增一个处理逻辑，
你需要在每个方法都手动新增处理逻辑吗？ 想想就挺无趣的。动态代理类帮你一键搞定。

### 动态代理类涉及角色
- 委托类和代理类实现的公共接口(Person.java)
- 实现公共接口的具体委托类(SoftwareEngineer.java)
- InvocationHandler接口被Proxy类回调处理，一般实现 InvocationHandler 接口的类具有委托类引用，接口方法 invoke 中添加公共代码并调用委托类的接口方法。(PersonInvocationHandler.java)
- JDK提供生成动态代理类的核心类Proxy ( JDK 提供的Proxy.java)

### 基于JDK技术 动态代理类技术核心 Proxy类和一个 InvocationHandler 接口
java的java.lang.reflect包下提供了Proxy类和一个 InvocationHandler 接口，这个类Proxy定义了生成JDK动态代理类的方法  `getProxyClass(ClassLoader loader,Class<?>... interfaces)`生成动态代理类,返回class实例代表一个class文件。可以保存该 class 文件查看jdk生成的代理类文件长什么样

该生成的动态代理类继承Proxy类，(重要特性) ，并实现公共接口。

InvocationHandler这个接口 是被动态代理类回调的接口，我们所有需要增加的针对委托类的统一处理逻辑都增加到invoke 方法里面在调用委托类接口方法之前或之后 结束战斗。


#### 案例
##### 公共接口
```java
package org.vincent.proxy.dynamicproxy;

/**
 * Created by PengRong on 2018/12/25.
 * 创建Person 接口 用于定义 委托类和代理类之间的约束行为
 */
public interface Person
{
    /**
     *
     * @param name 人名
     * @param dst 工作目的地
     */
    void goWorking(String name, String dst);

    /**
     * 获取名称
     * @return
     */
    String getName( );

    /**
     * 设置名称
     * @param name
     */
    void  setName(String name);
}

```
##### 具体实现类，等下被委托，被代理的类 SoftwareEngineer.java
```java
package org.vincent.proxy.dynamicproxy;

/**
 * Created by PengRong on 2018/12/25.
 * 动态代理委托类实现， 实现接口 Person。 被动态生成的代理类代理
 */
public class SoftwareEngineer implements Person{
    public  SoftwareEngineer(){}
    public  SoftwareEngineer(String name){
        this.name=name;
    }
    private  String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public void goWorking(String name, String dst) {
        System.out.println("name ="+name+" ， 去 "+dst +" 工作");
    }
}

```
##### InvocationHandler 接口实现 PersonInvocationHandler.java
```java
package org.vincent.proxy.dynamicproxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * Created by PengRong on 2018/12/25.
 * PersonInvocationHandler 类 实现InvocationHandler接口，这个类中持有一个被代理对象(委托类)的实例target。该类别JDK Proxy类回调
 * InvocationHandler 接口中有一个invoke方法，当一个代理实例的方法被调用时，代理方法将被编码并分发到 InvocationHandler接口的invoke方法执行。
 */
public class PersonInvocationHandler<T> implements InvocationHandler {
    /**
     * 被代理对象引用，invoke 方法里面method 需要使用这个 被代理对象
     */
    T target;

    public PersonInvocationHandler(T target) {
        this.target = target;
    }


    /**
     * 在
     * @param proxy  代表动态生成的 动态代理 对象实例
     * @param method 代表被调用委托类的接口方法，和生成的代理类实例调用的接口方法是一致的，它对应的Method 实例
     * @param args   代表调用接口方法对应的Object参数数组，如果接口是无参，则为null； 对于原始数据类型返回的他的包装类型。
     * @return
     * @throws Throwable
     */
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        /**
         * 在转调具体目标对象之前，可以执行一些功能处理
         */
        System.out.println("被动态代理类回调执行, 代理类 proxyClass ="+proxy.getClass()+" 方法名: " + method.getName() + "方法. 方法返回类型："+method.getReturnType()
        +" 接口方法入参数组: "+(args ==null ? "null" : Arrays.toString(args)));
        /**
         * 代理过程中插入监测方法,计算该方法耗时
         */
        MonitorUtil.start();
        Thread.sleep(1);
        /** 调用呗代理对象的真实方法，*/
        Object result = method.invoke(target, args);
        MonitorUtil.finish(method.getName());
        return result;
    }
}

```
##### PersonInvocationHandler invoke 方法中添加的公共代码，这里简单以统计方法执行时间为逻辑

```java
package org.vincent.proxy.dynamicproxy;

/**
 * Created by PengRong on 2018/12/25.
 * 方法用时监控类
 */
public class MonitorUtil {
    private static ThreadLocal<Long> tl = new ThreadLocal<>();

    public static void start() {
        tl.set(System.currentTimeMillis());
    }

    /**
     * 结束时打印耗时
     * @param methodName 方法名
     */
    public static void finish(String methodName) {
        long finishTime = System.currentTimeMillis();
        System.out.println(methodName + "方法执行耗时" + (finishTime - tl.get()) + "ms");
    }
}

```

##### 最后的是 怎么创建代理类 

```java
package org.vincent.proxy.jdkdynamicProxy;

import org.vincent.proxy.dynamicproxy.Person;
import org.vincent.proxy.dynamicproxy.PersonInvocationHandler;
import org.vincent.proxy.dynamicproxy.SoftwareEngineer;
import sun.misc.ProxyGenerator;

import java.io.FileOutputStream;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Properties;

/**
 * 动态代理类测试
 * Created by PengRong on 2018/12/25.
 */
public class JdkDynamicProxyTest {
    public static void main(String[] args) throws Exception {
        // 打开保存JDK动态代理生成的类文件
        saveGeneratedJdkProxyFiles();


        /**
         * 第一种方法: 通过 Proxy.newProxyInstance 方法 获取代理对象
         */
        System.out.println("-------------------第一种创建代理类方法--------------");
        //创建一个实例对象，这个对象是被代理的对象，委托类
        Person person = new SoftwareEngineer("Vincent");
        //创建一个与代理类相关联的InvocationHandler,每一个代理类都有一个关联的 InvocationHandler，并将代理类引用传递进去
        InvocationHandler Handler = new PersonInvocationHandler<>(person);
        //创建一个 代理对象 personProxy 来代理 person，创建的代理对象的每个执行方法都会被替换执行Invocation接口中的invoke方法
        Person personProxy = (Person) Proxy.newProxyInstance(Person.class.getClassLoader(), new Class<?>[]{Person.class}, Handler);
        /** 代理类信息 */
        System.out.println("package = " + personProxy.getClass().getPackage() + " SimpleName = " + personProxy.getClass().getSimpleName() + " name =" + personProxy.getClass().getName() + " CanonicalName = " +
                "" + personProxy.getClass().getCanonicalName() + " 实现的接口 Interfaces = " + Arrays.toString(personProxy.getClass().getInterfaces()) +
                " superClass = " + personProxy.getClass().getSuperclass() + " methods =" + Arrays.toString(personProxy.getClass().getMethods()));
        // 通过 代理类 执行 委托类的代码逻辑
        personProxy.goWorking(personProxy.getName(), "深圳");

        System.out.println("-------------------第二种创建代理类方法--------------");
        /**
         *  动态代理对象步骤
         *      1、 创建一个与代理对象相关联的 InvocationHandler，以及真实的委托类实例
         *      2、Proxy类的getProxyClass静态方法生成一个动态代理类stuProxyClass，该类继承Proxy类，实现 Person.java接口；JDK动态代理的特点是代理类必须继承Proxy类
         *      3、通过代理类 proxyClass 获得他的带InvocationHandler 接口的构造函数 ProxyConstructor
         *      4、通过 构造函数实例 ProxyConstructor 实例化一个代理对象，并将  InvocationHandler 接口实例传递给代理类。
         */
        // 1、创建 InvocationHandler 实例并设置代理的目标类对象
        Person persontwo = new SoftwareEngineer("Vincent");
        InvocationHandler Handlertwo = new PersonInvocationHandler<>(persontwo);
        // 2 创建代理类,是一个字节码文件, 把 proxyClass 保存起来就能看到 他继承Proxy 类，实现Person接口
        Class<?> proxyClass = Proxy.getProxyClass(Person.class.getClassLoader(), new Class<?>[]{Person.class});
        /** 代理类信息 */
        System.out.println("package = " + proxyClass.getPackage() + " SimpleName = " + proxyClass.getSimpleName() + " name =" + proxyClass.getName() + " CanonicalName = " +
                "" + proxyClass.getCanonicalName() + " 实现的接口 Interfaces = " + Arrays.toString(proxyClass.getInterfaces()) +
                " superClass = " + proxyClass.getSuperclass() + " methods =" + Arrays.toString(proxyClass.getMethods()));

        // 3、  通过 proxyClass 获得 一个带有InvocationHandler参数的构造器constructor
        Constructor<?> ProxyConstructor = proxyClass.getConstructor(InvocationHandler.class);
        // 4、通过构造器创建一个  动态代理类 实例
        Person stuProxy = (Person) ProxyConstructor.newInstance(Handlertwo);
        /** 检测生成的类是否是代理类 */
        System.out.println("stuProxy isProxy "+Proxy.isProxyClass(stuProxy.getClass()));
        /** 获取 代理类关联的 InvocationHandler 是哪个*/
        InvocationHandler handlerObject = Proxy.getInvocationHandler(stuProxy);
        System.out.println(handlerObject.getClass().getName());
        stuProxy.goWorking(stuProxy.getName(), "广州");
        // 保存代理類
        saveClass("$PersonProxy0", proxyClass.getInterfaces(), "D:/123/");
    }

    /**
     * 生成代理类 class 并保持到文件中
     *
     * @param className  生成的代理类名称
     * @param interfaces 代理类需要实现的接口
     * @param pathdir    代理类保存的目录路径,以目录分隔符结尾
     */
    public static void saveClass(String className, Class<?>[] interfaces, String pathdir) {
        /**
         * 第一个参数是 代理类 名 。
         * 第二个参数是 代理类需要实现的接口
         */
        byte[] classFile = ProxyGenerator.generateProxyClass(className, interfaces);
        /**
         * 如果目录不存在就新建所有子目录
         */
        Path path1 = Paths.get(pathdir);
        if (!path1.toFile().exists()){
            path1.toFile().mkdirs();
        }
        String path = pathdir + className + ".class";
        try (FileOutputStream fos = new FileOutputStream(path)) {
            fos.write(classFile);
            fos.flush();
            System.out.println("代理类class文件写入成功");
        } catch (Exception e) {
            System.out.println("写文件错误");
        }
    }

    /**
     * 设置保存Java动态代理生成的类文件。
     *
     * @throws Exception
     */
    public static void saveGeneratedJdkProxyFiles() throws Exception {
        Field field = System.class.getDeclaredField("props");
        field.setAccessible(true);
        Properties props = (Properties) field.get(null);
        props.put("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");
    }

}

```
#### 解析JDK生成的动态代理类
**saveGeneratedJdkProxyFiles方法 打开了存储jdk生成的动态代理类** 
以 接口方法 goWorking 为例讲解
```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.sun.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.lang.reflect.UndeclaredThrowableException;
import org.vincent.proxy.dynamicproxy.Person;

public final class $Proxy0 extends Proxy implements Person {
    private static Method m1;
    private static Method m4;
    private static Method m3;
    private static Method m2;
    private static Method m5;
    private static Method m0;

    public $Proxy0(InvocationHandler var1) throws  {
        super(var1);
    }

    public final boolean equals(Object var1) throws  {
        try {
            return ((Boolean)super.h.invoke(this, m1, new Object[]{var1})).booleanValue();
        } catch (RuntimeException | Error var3) {
            throw var3;
        } catch (Throwable var4) {
            throw new UndeclaredThrowableException(var4);
        }
    }

    public final void setName(String var1) throws  {
        try {
            super.h.invoke(this, m4, new Object[]{var1});
        } catch (RuntimeException | Error var3) {
            throw var3;
        } catch (Throwable var4) {
            throw new UndeclaredThrowableException(var4);
        }
    }

    public final String getName() throws  {
        try {
            return (String)super.h.invoke(this, m3, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }

    public final String toString() throws  {
        try {
            return (String)super.h.invoke(this, m2, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }

    /**
    * 对接口  goWorking 的调用 转变成   super.h.invoke(this, m5, new Object[]{var1, var2}); 调用。
    * h 就是Proxy.java类的一个 InvocationHandler 接口 属性，
    * 我们在创建 动态代理类实例时候都必须 传一个 InvocationHandler 接口的实例过去。 这里就是刚才我们定义的 PersonInvocationHandler 。
    * 回到过后是不是就回到了 PersonInvocationHandler.invoke方法里面，所以 PersonInvocationHandler 是我们生成的动态代理类的拦截器，拦截所有方法调用。
    */
    public final void goWorking(String var1, String var2) throws  {
        try {
            super.h.invoke(this, m5, new Object[]{var1, var2});
        } catch (RuntimeException | Error var4) {
            throw var4;
        } catch (Throwable var5) {
            throw new UndeclaredThrowableException(var5);
        }
    }

    public final int hashCode() throws  {
        try {
            return ((Integer)super.h.invoke(this, m0, (Object[])null)).intValue();
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }
/**
* 静态代码块，根据动态代理实现的公共接口类接口方法 获取到所有接口方法 的 Method 实例
*/
    static {
        try {
            m1 = Class.forName("java.lang.Object").getMethod("equals", new Class[]{Class.forName("java.lang.Object")});
            m4 = Class.forName("org.vincent.proxy.dynamicproxy.Person").getMethod("setName", new Class[]{Class.forName("java.lang.String")});
            m3 = Class.forName("org.vincent.proxy.dynamicproxy.Person").getMethod("getName", new Class[0]);
            m2 = Class.forName("java.lang.Object").getMethod("toString", new Class[0]);
            m5 = Class.forName("org.vincent.proxy.dynamicproxy.Person").getMethod("goWorking", new Class[]{Class.forName("java.lang.String"), Class.forName("java.lang.String")});
            m0 = Class.forName("java.lang.Object").getMethod("hashCode", new Class[0]);
        } catch (NoSuchMethodException var2) {
            throw new NoSuchMethodError(var2.getMessage());
        } catch (ClassNotFoundException var3) {
            throw new NoClassDefFoundError(var3.getMessage());
        }
    }
}

```

Jdk为我们的生成了一个叫$Proxy0（这个名字后面的0是编号，有多个代理类会一次递增）的代理类，这个类文件时默认不会保存在文件，放在内存中的，我们在创建代理对象时，就是通过反射获得这个类的构造方法，然后创建代理对象实例。通过对这个生成的代理类源码的查看，我们很容易能看出，动态代理实现的具体过程。

我们可以对 InvocationHandler 看做一个中介类，中介类持有一个被代理对象，被Proxy类回调。在invoke方法中调用了被代理对象的相应方法。通过聚合方式持有被代理对象的引用，把客户端对invoke的调用最终都转为对被代理对象的调用。

客户端代码通过代理类引用调用接口方法时，通过代理类关联的中介类对象引用来调用中介类对象的invoke方法，从而达到代理执行被代理对象的方法。也就是说，动态代理Proxy类提供了模板实现，对外提供扩展点，外部通过实现InvocationHandler接口将被代理类纳入JDK代理类Proxy。

#### 一个典型的基于JDK动态代理创建对象过程可分为以下四个步骤：
1、通过实现InvocationHandler接口创建自己的调用处理器 IvocationHandler handler = new InvocationHandlerImpl(...);

2、通过为Proxy类指定ClassLoader对象和一组interface代理类需要实现的接口，创建动态代理类类文件，默认JDK并不会保存这个文件到文件中；可以保存起来观察生成的代理类结构
`Class clazz = Proxy.getProxyClass(classLoader,new Class[]{...});`

3、通过上面新建的代理clazz的反射机制获取动态代理类的一个构造函数，其构造函数入参类型是调用处理器接口(`IvocationHandler`)类型
`Constructor constructor = clazz.getConstructor(new Class[]{InvocationHandler.class});`

4、通过构造函数实例创建代理类实例，此时需将调用处理器对象作为参数被传入
Interface Proxy = (Interface)constructor.newInstance(new Object[] (handler));
为了简化对象创建过程，Proxy类中的newInstance工具方法封装了2~4，只需两步即可完成代理对象的创建。

#### JDK动态代理特点总结
- 生成的代理类：$Proxy0 extends Proxy implements Person，我们看到代理类继承了Proxy类，Java的继承机制决定了JDK动态代理类们无法实现对 类 的动态代理。所以也就决定了java动态代理只能对接口进行代理，
- 每个生成的动态代理实例都会关联一个调用处理器对象，可以通过 Proxy 提供的静态方法 getInvocationHandler 去获得代理类实例的调用处理器对象。在代理类实例上调用其代理的接口中所声明的方法时，这些方法最终都会由调用处理器的 invoke 方法执行
- 代理类的根类 java.lang.Object 中有三个方法也同样会被分派到调用处理器的 invoke 方法执行，它们是 hashCode，equals 和 toString，可能的原因有：一是因为这些方法为 public 且非 final 类型，能够被代理类覆盖；
    二是因为这些方法往往呈现出一个类的某种特征属性，具有一定的区分度，所以为了保证代理类与委托类对外的一致性，这三个方法也应该被调用处理器分派到委托类执行。
#### 动态代理不足
JDK动态代理的代理类字节码在创建时，需要实现业务实现类所实现的接口作为参数。如果业务实现类是没有实现接口而是直接定义业务方法的话，就无法使用JDK动态代理了。(JDK动态代理重要特点是代理接口)
并且，如果业务实现类中新增了接口中没有的方法，这些方法是无法被代理的（因为无法被调用）。

**动态代理只能对接口产生代理，不能对类产生代理**

#### JDK动态代理类可以生成实现多个接口的代理类
##### Jdk动态代理委托类多接口定义
第一个接口
```java
package org.vincent.proxy.dynamicproxy;

/**
 * Created by PengRong on 2018/12/25.
 * 创建Person 接口 用于定义 委托类和代理类之间的约束行为
 */
public interface Person
{
    /**
     *
     * @param name 人名
     * @param dst 工作目的地
     */
    void goWorking(String name, String dst);


    /**
     * 获取名称
     * @return
     */
    String getName( );

    /**
     * 设置名称
     * @param name
     */
    void  setName(String name);
}
```
第二个接口
```java

package org.vincent.proxy.dynamicproxy;

/**
 * @author PengRong
 * @package org.vincent.proxy.dynamicproxy
 * @date 2019/1/8 - 8:07
 * @ProjectName JavaAopLearning
 * @Description: 动态代理类实现多个接口 第二个接口定义
 */
public interface Company {
    public  String setCompanyName(String companyName);
}

```
##### 委托类实现多个接口
```java
package org.vincent.proxy.dynamicproxy;

/**
 * Created by PengRong on 2018/12/25.
 * 动态代理委托类实现， 实现接口 Person,Company 实现多个接口。 被动态生成的代理类代理
 */
public class SoftwareEngineer implements Person, Company{
    public  SoftwareEngineer(){}
    public  SoftwareEngineer(String name){
        this.name=name;
    }
    private  String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "SoftwareEngineer "+getName();
    }

    @Override
    public void goWorking(String name, String dst) {
        System.out.println("name ="+name+" ， 去 "+dst +" 工作");
    }

    @Override
    public String setCompanyName(String companyName) {
        return "companyName: "+ companyName;
    }
}

```
##### 切面类 MonitorUtil ，PersonInvocationHandler 代理类调用处理器 都没变 还是上面JDK案例里面对应的类
##### 测试类
```java
package org.vincent.proxy.jdkdynamicProxy;

import org.vincent.proxy.dynamicproxy.Company;
import org.vincent.proxy.dynamicproxy.Person;
import org.vincent.proxy.dynamicproxy.PersonInvocationHandler;
import org.vincent.proxy.dynamicproxy.SoftwareEngineer;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;
import java.util.Properties;

/**
 * @author PengRong
 * @package org.vincent.proxy.jdkdynamicProxy
 * @date 2019/1/8 - 8:17
 * @ProjectName JavaAopLearning
 * @Description: JDK多 委托类多接口测试
 */
public class JdkMutiInterfacesTest {
    /**
     * 设置保存Java动态代理生成的类文件。
     *
     * @throws Exception
     */
    public static void saveGeneratedJdkProxyFiles() throws Exception {
        Field field = System.class.getDeclaredField("props");
        field.setAccessible(true);
        Properties props = (Properties) field.get(null);
        props.put("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");
    }
    public static  void  main(String[] args) throws Exception {
        {
            saveGeneratedJdkProxyFiles();

            //创建一个实例对象，这个对象是被代理的对象，委托类
            SoftwareEngineer person = new SoftwareEngineer("Vincent");
            //创建一个与代理类相关联的InvocationHandler,每一个代理类都有一个关联的 InvocationHandler，并将代理类引用传递进去
            InvocationHandler Handler = new PersonInvocationHandler<>(person);
            //创建一个 代理对象 personProxy 来代理 person，创建的代理对象的每个执行方法都会被替换执行Invocation接口中的invoke方法，多接口代理测试，SoftwareEngineer 实现多个接口
            Person personProxy = (Person) Proxy.newProxyInstance(person.getClass().getClassLoader(), person.getClass().getInterfaces(), Handler);
            System.out.println(personProxy.getName());
            personProxy.setName("aaaaaaaBB");
            personProxy.goWorking("大A", "shenzhen");
            /** 生成的动态代理类实现两个接口 ，可以强制到另外一个接口*/
            Company company = (Company) personProxy;
            company.setCompanyName("CCCCCCCCC");
        }
    }

}

```

##### 测试类保存由JDK生成的动态代理类 实现 Person, Company 接口， 继承 Proxy 类
上面测试类 在生成 代理类类时候直接 将代理类在两个接口引用之间强转也是没问题的。
```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.sun.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.lang.reflect.UndeclaredThrowableException;
import org.vincent.proxy.dynamicproxy.Company;
import org.vincent.proxy.dynamicproxy.Person;

public final class $Proxy0 extends Proxy implements Person, Company {
    private static Method m1;
    private static Method m4;
    private static Method m3;
    private static Method m2;
    private static Method m6;
    private static Method m5;
    private static Method m0;

    public $Proxy0(InvocationHandler var1) throws  {
        super(var1);
    }

    public final boolean equals(Object var1) throws  {
        try {
            return (Boolean)super.h.invoke(this, m1, new Object[]{var1});
        } catch (RuntimeException | Error var3) {
            throw var3;
        } catch (Throwable var4) {
            throw new UndeclaredThrowableException(var4);
        }
    }

    public final void setName(String var1) throws  {
        try {
            super.h.invoke(this, m4, new Object[]{var1});
        } catch (RuntimeException | Error var3) {
            throw var3;
        } catch (Throwable var4) {
            throw new UndeclaredThrowableException(var4);
        }
    }

    public final String getName() throws  {
        try {
            return (String)super.h.invoke(this, m3, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }

    public final String toString() throws  {
        try {
            return (String)super.h.invoke(this, m2, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }

    public final String setCompanyName(String var1) throws  {
        try {
            return (String)super.h.invoke(this, m6, new Object[]{var1});
        } catch (RuntimeException | Error var3) {
            throw var3;
        } catch (Throwable var4) {
            throw new UndeclaredThrowableException(var4);
        }
    }

    public final void goWorking(String var1, String var2) throws  {
        try {
            super.h.invoke(this, m5, new Object[]{var1, var2});
        } catch (RuntimeException | Error var4) {
            throw var4;
        } catch (Throwable var5) {
            throw new UndeclaredThrowableException(var5);
        }
    }

    public final int hashCode() throws  {
        try {
            return (Integer)super.h.invoke(this, m0, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }

    static {
        try {
            m1 = Class.forName("java.lang.Object").getMethod("equals", Class.forName("java.lang.Object"));
            m4 = Class.forName("org.vincent.proxy.dynamicproxy.Person").getMethod("setName", Class.forName("java.lang.String"));
            m3 = Class.forName("org.vincent.proxy.dynamicproxy.Person").getMethod("getName");
            m2 = Class.forName("java.lang.Object").getMethod("toString");
            m6 = Class.forName("org.vincent.proxy.dynamicproxy.Company").getMethod("setCompanyName", Class.forName("java.lang.String"));
            m5 = Class.forName("org.vincent.proxy.dynamicproxy.Person").getMethod("goWorking", Class.forName("java.lang.String"), Class.forName("java.lang.String"));
            m0 = Class.forName("java.lang.Object").getMethod("hashCode");
        } catch (NoSuchMethodException var2) {
            throw new NoSuchMethodError(var2.getMessage());
        } catch (ClassNotFoundException var3) {
            throw new NoClassDefFoundError(var3.getMessage());
        }
    }
}

```

### 基于CGlib 技术动态代理代理类实现 (基于继承)

**Cglib是针对类来实现代理的，他的原理是对代理的目标类生成一个子类，并覆盖其中方法实现增强，因为底层是基于创建被代理类的一个子类，所以它避免了JDK动态代理类的缺陷。**

但因为采用的是继承，所以不能对final修饰的类进行代理。final修饰的类不可继承。
#### 导入maven 依赖
**cglib 是基于asm 字节修改技术。导入 cglib 会间接导入 asm, ant, ant-launcher 三个jar 包。**
```xml
<!-- cglib 动态代理依赖 begin -->
  <dependency>
    <groupId>cglib</groupId>
    <artifactId>cglib</artifactId>
    <version>3.2.5</version>
</dependency>
<!-- cglib 动态代理依赖 stop -->
```


#### 业务类实现
cglib是针对类来实现代理的，原理是对指定的业务类生成他的一个子类，并覆盖其中的业务方法来实现代理。因为采用的是继承，所以不能对final修饰的类进行代理。
```java
package org.vincent.proxy.cglibproxy;

/**
 * @Package: org.vincent.proxy.cglibproxy <br/>
 * @Description： Cglib 代理模式中 被代理的委托类 <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26-17:55 <br/>
 */
public class Dog {
    public String  call() {
        System.out.println("wang wang wang");
        return "Dog ..";
    }
}

```
#### 方法拦截器 实现 MethodInterceptor 接口
```java
 package org.vincent.proxy.cglibproxy;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

/**
 * @Package: org.vincent.proxy.cglibproxy <br/>
 * @Description： Cglib 方法拦截器,不用依赖被代理业务类的引用。  <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26-17:56 <br/>
 */
public class CglibMethodInterceptor implements MethodInterceptor {
    /**
     * 用于生成 Cglib 动态代理类工具方法
     * @param target 代表需要 被代理的 委托类的 Class 对象
     * @return
     */
    public Object CglibProxyGeneratory(Class target) {
        /** 创建cglib 代理类 start */
        // 创建加强器，用来创建动态代理类
        Enhancer enhancer = new Enhancer();
        // 为代理类指定需要代理的类，也即是父类
        enhancer.setSuperclass(target);
        // 设置方法拦截器回调引用，对于代理类上所有方法的调用，都会调用CallBack，而Callback则需要实现intercept() 方法进行拦截
        enhancer.setCallback(this);
        // 获取动态代理类对象并返回
        return enhancer.create();
        /** 创建cglib 代理类 end */
    }

    /**
     *  切点方法 intercept
     * 功能主要是在调用业务类方法之前 之后添加统计时间的方法逻辑.
     * intercept 因为  具有 MethodProxy proxy 参数的原因 不再需要代理类的引用对象了。
     * 当然 也可以通过 method 引用实例 通过   Object result = method.invoke(target, args); 形式反射调用被代理类方法，
     * target 实例代表被代理类对象引用, 初始化 CglibMethodInterceptor 时候被赋值 。但是Cglib不推荐使用这种方式
     * @param obj    代表生成的动态代理类 对象
     * @param method 代理类中被拦截的接口方法
     * @param args   接口方法参数
     * @param proxy  用于调用父类真正的业务类方法。
     * @return
     * @throws Throwable
     */
    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("before");
        MonitorUtil.start();
        Object result = proxy.invokeSuper(obj, args);
        //Object result = method.invoke(target, args);
        System.out.println("after");
        MonitorUtil.finish(method.getName());
        return result;
    }
}


```
#### 一个切面，用于在方法拦截器中intercept 方法中调用真正业务方法之前 之后处理逻辑
```java
package org.vincent.proxy.cglibproxy;

/**
 * Created by PengRong on 2018/12/25.
 * 方法用时监控类,作为一个切面 ，具有两个方法
 */
public class MonitorUtil {
    private static ThreadLocal<Long> tl = new ThreadLocal<>();

    public static void start() {
        tl.set(System.currentTimeMillis());
    }

    /**
     * 结束时打印耗时
     * @param methodName 方法名
     */
    public static void finish(String methodName) {
        long finishTime = System.currentTimeMillis();
        System.out.println(methodName + "方法执行耗时" + (finishTime - tl.get()) + "ms");
    }
}

```
#### Cglib测试类
```java
package org.vincent.proxy.cglibproxy;

import net.sf.cglib.core.DebuggingClassWriter;
import net.sf.cglib.proxy.Enhancer;
import org.junit.Test;

import java.lang.reflect.Field;
import java.util.Properties;

/**
 * @Package: org.vincent.proxy.cglibproxy <br/>
 * @Description： TODO <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26-18:05 <br/>
 */
public class CglibTest {
    @Test
    public void testCglib() throws Exception {

        System.out.println(System.getProperty("user.dir"));
        /** 开启 保存cglib生成的动态代理类类文件*/
        saveGeneratedCGlibProxyFiles(System.getProperty("user.dir"));
        /** 第一种方法: 创建cglib 代理类 start */
        // 创建加强器，用来创建动态代理类
        Enhancer enhancer = new Enhancer();
        // 为代理类指定需要代理的类，也即是父类
        enhancer.setSuperclass(Dog.class);
        // new 一个新的方法拦截器
        CglibMethodInterceptor cglibMethodInterceptor = new CglibMethodInterceptor();
        // 设置方法拦截器回调引用，对于代理类上所有方法的调用，都会调用CallBack，而Callback则需要实现intercept() 方法进行拦截
        enhancer.setCallback(cglibMethodInterceptor);
        // 获取动态代理类对象并返回
        Dog dog = (Dog) enhancer.create();
        /** 创建cglib 代理类 end */
        System.out.println(dog.call());

        // 对于上面这几步，可以新增一个工具方法 放置在 CglibMethodInterceptor 里面；也就有了第二种方法
        // new 一个新的方法拦截器，该拦截器还顺带一个用于创建代理类的工具方法。看起来简单很多
        cglibMethodInterceptor = new CglibMethodInterceptor();
        dog = (Dog) cglibMethodInterceptor.CglibProxyGeneratory(Dog.class);
        System.out.println(dog.call());

    }

    /**
     * 设置保存Cglib代理生成的类文件。
     *
     * @throws Exception
     */
    public void saveGeneratedCGlibProxyFiles(String dir) throws Exception {
        Field field = System.class.getDeclaredField("props");
        field.setAccessible(true);
        Properties props = (Properties) field.get(null);
        System.setProperty(DebuggingClassWriter.DEBUG_LOCATION_PROPERTY, dir);//dir为保存文件路径
        props.put("net.sf.cglib.core.DebuggingClassWriter.traceEnabled", "true");
    }
}

```
### Cglib 总结

- CGlib可以传入接口也可以传入普通的类，接口使用实现的方式,普通类使用会使用继承的方式生成代理类.
- 由于是继承方式,如果是 static方法,private方法,final方法等描述的方法是不能被代理的
- 做了方法访问优化，对生成的代理类方法建立方法索引的方式避免了传统Method 反射调用的开销.
- 提供callback 和filter设计，可以灵活地给不同的方法绑定不同的callback。编码更方便灵活。
- CGLIB会默认代理Object中 equals,toString,hashCode,clone等方法。比JDK代理多了clone。

## 静态代理 基于JDK动态代理 基于Cglib 动态代理

静态代理是通过在代码中显式编码定义一个业务实现类的代理类，在代理类中对同名的业务方法进行包装，用户通过代理类调用被包装过的业务方法；

JDK动态代理是通过接口中的方法名，在动态生成的代理类中调用业务实现类的同名方法实现功能增强；

CGlib动态代理是通过继承业务类，生成的动态代理类是业务类的子类，通过重写委托类业务方法进行功能增强。


静态代理在编译时产生class字节码文件，可以直接使用，效率高。动态代理必须实现InvocationHandler接口，在invoke方法里面通过反射方式调用被委托类接口方法，比较消耗系统性能，但可以减少代理类的数量，使用更灵活。
cglib代理无需实现接口，通过生成类字节码实现代理，比反射稍快，不存在性能问题，但cglib会继承目标对象，需要重写方法，所以目标对象不能为final类。

## AOP(面向切面编程) 实现案例
面向切面编程是继面向对象后，又一种重要的思维方式。面向对象比较重要的是通过继承达到代码重用。
面向切面编程，则注重将不同的功能点分开，实现功能点最大程度的解耦，比如我们现在有业务逻辑层和埋点逻辑，如果不分开，那么在每个业务逻辑方法中除了要实现业务外还要加上埋点逻辑代码，
如果某一天我不需要埋点逻辑了，那改动的工作量是可想而知的。有没有一种方法让我们只写一次埋点逻辑代码，而把他应用在需要写埋点逻辑的方法前面，当不需要的时候直接删除呢？面向切面编程给我们提供了办法。

Spring AOP的源码中用到了两种动态代理来实现拦截切入功能：jdk动态代理和cglib动态代理。两种方法同时存在，各有优劣。jdk动态代理是由java内部的反射机制来实现的，Cglib动态代理底层则是借助asm来实现的。
JDK动态代理的反射机制在生成类的过程中比较高效，执行时候通过反射调用委托类接口方法比较慢；而asm在生成类之后的相关代理类执行过程中比较高效（可以通过将asm生成的类进行缓存，这样解决asm生成类过程低效问题）。
还有一点必须注意：jdk动态代理的应用前提，必须是委托类基于统一的接口。如果没有上述前提，jdk动态代理不能应用。由此可以看出，jdk动态代理有一定的局限性，cglib这种第三方类库实现的动态代理应用更加广泛，且在执行效率上更有优势。

**实现AOP关键特点是定义好两个角色 切点 和 切面 。**  代理模式中被代理类 委托类处于切点角色(方法 实现功能切入点)，其类方法或者接口需要添加其他比如 校验逻辑，事务，审计逻辑 属于非功能实现逻辑通过 切面类定义的方法插入进去。

- 切点(pointcut) 是现有的业务逻辑实现类。接口方法是功能增强切入点 (在之前 或 之后 增强)。
    - 切点接口方法之前或之后的功能增强切入点叫 连接点(jointpoint)。 
- 切面(aspect) 一般是类似于埋点代码 属于公共非功能代码逻辑。可以定义多个切面组成拦截器链
    - 切面里面定义的每个方法叫通知(advice) , 实现切面功能，增强切点功能；每个通知(advice)关联一个 切入点表达式关联,切入点表达式定义了在哪个连接点上执行这个通知，切入点表达式如何和连接点匹配时AOP的核心：Spring缺省使用 AspectJ 切入点语法。    

### JDK动态代理 AOP 实现方式
#### 定义切面接口，完成将通用公共方法注入到被代理类接口调用处理中

```java
package org.vincent.aop.dynamicproxy;

/**
 * @Package: org.vincent.aop.dynamicproxy <br/>
 * @Description： 定义切面接口，切面接口定义了两个切面方法，分别在切点接口方法执行前和执行后执行 <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26 <br/>
 */
public interface IAspect {
    /**
     * 在切点接口方法执行之前执行
     * @param args 切点参数列表
     * @return
     */
    boolean startTransaction(Object... args);

    /**
     * 在切点接口方法执行之后执行
     */
    void endTrasaction();
}

```

#### 定义切面实现类
```java
package org.vincent.aop.dynamicproxy;

import java.util.Objects;

/**
 * @Package: org.vincent.aop.dynamicproxy <br/>
 * @Description： 改类作为AOP 模型中切面角色类， 实现切面接口，切面接口定义了两个切面方法，分别在切点接口方法执行前和执行后执行 。 <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26 <br/>
 */
public class CustomAspect implements IAspect {


    /**
     * 对参数 做判空处理
     * @param args 切点参数列表
     * @return
     */
    @Override
    public boolean startTransaction(Object... args) {
        Objects.nonNull(args);
        boolean result = true;
        for (Object temp :args) {
            if (Objects.isNull(temp)){
                 result =false;
                 break;
            }
        }
        return result;
    }

    public void endTrasaction() {
        System.out.println("I get datasource here and end transaction");
    }
}

```

#### 定义切点角色接口 因为是基于JDK实现的Aop ，所以委托类需要基于接口实现。
```java

package org.vincent.aop.dynamicproxy;

/**
 * @Package: org.vincent.aop.dynamicproxy <br/>
 * @Description： AOP基于动态代理 实现  <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26 <br/>
 */
public interface IUserService {
    void saveUser(String username, String password) throws Exception;
}


```

#### 委托类实现
```java
package org.vincent.aop.dynamicproxy;

/**
 * @Package: org.vincent.aop.dynamicproxy <br/>
 * @Description： UserService接口实现类UserServiceImpl 该类 作为AOP中切点角色，切面定义的方法插入到切点的接口方法 执行前和执行后执行。 <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26 <br/>
 */
public class UserServiceImpl implements IUserService{

    @Override
    public void saveUser(String username, String password) throws Exception {
        System.out.println("save user[username=" + username + ",password=" + password + "]");
    }
}


```

#### JDK动态代理生成器工具类 
可以看到 generatorJDKProxy 方法入参只有两个参数 一个切点接口引用，一个切面接口引用；在InvocationHandler 内部类中可以完整看到切面类方法是怎么影响切点代码执行逻辑的。
```java
package org.vincent.aop.dynamicproxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Arrays;

/**
 * @Package: org.vincent.aop.dynamicproxy <br/>
 * @Description： JDK动态代理类生成器 <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26-16:48 <br/>
 */
public class JDKDynamicProxyGenerator {
    /**
     * @param targetPoint 需要被代理的委托类对象
     * @param aspect 切面对象,该对象方法将在切点方法之前或之后执行
     * @return
     */
    public static Object generatorJDKProxy(IUserService targetPoint, final IAspect aspect) {

        return Proxy.newProxyInstance(
                /**
                 *   委托类使用的类加载器
                 */
                targetPoint.getClass().getClassLoader(),
                /**
                 * 委托类实现的接口
                 */
                targetPoint.getClass().getInterfaces(),
                /**
                 * 生成的动态代理类关联的 执行处理器，代理我们的业务逻辑被生成的动态代理类回调
                 * 具体逻辑代码执行,返回值为方法执行结果, 在aop模型中，委托类的接口方法称为切点。
                 */
                new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        // 执行切面方法,对入参进行校验
                       boolean prepareAction = aspect.startTransaction(args);
                       if (prepareAction){
                           // 具体逻辑代码执行,返回值为方法执行结果
                           Object result = method.invoke(targetPoint, args);
                           aspect.endTrasaction();
                           return result;
                       }else {
                           throw  new RuntimeException("args: "+ Arrays.toString(args)+"不能为null ");
                       }
                    }
                });
    }
}

```

#### 测试类 
```java

package org.vincent.aop;

import org.junit.Test;
import org.vincent.aop.dynamicproxy.CustomAspect;
import org.vincent.aop.dynamicproxy.IUserService;
import org.vincent.aop.dynamicproxy.JDKDynamicProxyGenerator;
import org.vincent.aop.dynamicproxy.UserServiceImpl;

/**
 * @Package: org.vincent <br/>
 * @Description： 基于动态代理类AOP测试案例 <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26-16:56 <br/>
 */
public class testAopJDKProxy {
    @Test
    public void testJDKProxy() throws Exception {
        System.out.println("无代理前 调用方法 userService.saveUser 输出......");
        IUserService userService = new UserServiceImpl();
        userService.saveUser("zby", "1234567890");

        System.out.println("有代理后AOP 是怎么样的？ Proxy......");
        IUserService proxyUserService = (IUserService) JDKDynamicProxyGenerator.generatorJDKProxy(userService, new CustomAspect());
        proxyUserService.saveUser("zby", "1234567890");

        /** 制造异常,两个入参都是null   */
        proxyUserService.saveUser(null, null);
    }
}

```
### Cglib aop 实现方式
#### 定义切面接口
```java

package org.vincent.aop.cglib;

/**
 * @Package: org.vincent.aop.dynamicproxy <br/>
 * @Description： 定义切面接口，切面接口定义了两个切面方法，分别在切点接口方法执行前和执行后执行 <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26 <br/>
 */
public interface IAspect {
    /**
     * 在切点接口方法执行之前执行
     */
    void startTransaction();

    /**
     * 在切点接口方法执行之后执行
     */
    void endTrasaction();
}

```
#### 切面实现
```java
package org.vincent.aop.cglib;

/**
 * @Package: org.vincent.aop.dynamicproxy <br/>
 * @Description： 改类作为AOP 模型中切面角色类， 实现切面接口，切面接口定义了两个切面方法，分别在切点接口方法执行前和执行后执行 。 <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26 <br/>
 */
public class CustomAspect implements IAspect {
    @Override
    public void startTransaction() {
        System.out.println("cglib. I get datasource here and start transaction");
    }



    public void endTrasaction() {
        System.out.println("cglib I get datasource here and end transaction");
    }
}

```

#### Cglib 是基于类实现的动态代理即业务类只需要实现类即可，不用强制必须实现某个接口为了突出这个优点这里没有实现接口
```java
package org.vincent.aop.cglib;

/**
 * @Package: org.vincent.aop.dynamicproxy <br/>
 * @Description： 业务实现类UserServiceImpl 该类 作为AOP中切点角色，切面定义的方法插入到切点的接口方法 执行前和执行后执行。 <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26 <br/>
 */
public class UserServiceImpl {
    public void saveUser(String username, String password) {
        System.out.println("cglib save user[username=" + username + ",password=" + password + "]");
    }
}

```
#### Cglib 动态代理生成器工具类
```java

package org.vincent.aop.cglib;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

/**
 * @Package: org.vincent.aop.cglib <br/>
 * @Description： 基于Cglib代理类生成器工具类 <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26-17:04 <br/>
 */
public class CglibProxyGenerator {
    /**
     * @param target 需要被代理的委托类对象，Cglib需要继承该类生成子类
     * @param aspect 切面对象,改对象方法将在切点方法之前或之后执行
     * @return
     */
    public static  Object generatorCglibProxy(final Object target, final IAspect aspect){
        //3.1 new Enhancer
        Enhancer enhancer = new Enhancer();
        //3.2 设置需要代理的父类
        enhancer.setSuperclass(target.getClass());
        //3.3 设置回调
        enhancer.setCallback(new MethodInterceptor() {

            @Override
            public Object intercept(Object proxy, Method method, Object[] args, MethodProxy methodProxy)
                    throws Throwable {
                // 执行切面方法
                aspect.startTransaction();
                // 具体逻辑代码执行,返回值为方法执行结果
                Object result = methodProxy.invokeSuper(proxy, args);
                // 执行切面方法
                aspect.endTrasaction();
                // 返回方法执行结果
                return result;
            }
        });
        // 3.4 创建代理对象
        return enhancer.create();
    }

}
```
#### 测试类
```java

package org.vincent.aop;

import org.junit.Test;
import org.vincent.aop.cglib.CglibProxyGenerator;
import org.vincent.aop.cglib.CustomAspect;
import org.vincent.aop.cglib.UserServiceImpl;

/**
 * @Package: org.vincent <br/>
 * @Description： 基于动态代理类AOP测试案例 <br/>
 * @author: lenovo <br/>
 * @Company: PLCC <br/>
 * @Copyright: Copyright (c) 2019 <br/>
 * @Version: 1.0 <br/>
 * @Modified By: <br/>
 * @Created by lenovo on 2018/12/26-16:56 <br/>
 */
public class testAopCglibKProxy {
    @Test
    public void testCglibProxy() {
        System.out.println("before Proxy......");
        UserServiceImpl userService = new UserServiceImpl();
        userService.saveUser("zby", "1234567890");
        System.out.println("引入Cglib  Proxy代理库 后......");
        UserServiceImpl proxyUserService = (UserServiceImpl) CglibProxyGenerator.generatorCglibProxy(userService, new CustomAspect());
        proxyUserService.saveUser("zby", "1234567890");
    }
}

```

### 基于Cglib 实现Aop 拦截器链
#### 拦截器切面链基接口
```java
package org.vincent.aop.interceptor;

import org.vincent.aop.interceptor.exception.InterceptorException;

/**
 * @author PengRong
 * @package org.vincent.aop.interceptor
 * @date 2019/1/10 - 22:17
 * @ProjectName JavaAopLearning
 * @Description: 定义切面链 抽象接口，作为一个拦截器栈的基础接口
 */
public interface Interceptor {
    /**
     * 拦截器 之前实现用于代码逻辑
     * @param args 委托类参数
     */
    public void beforeIntercept(Object... args) throws InterceptorException;

    /**
     * 拦截器 之后 实现对计算结果实现公共逻辑
     * @param result
     */
    public void afterIntercept(Object  result)throws InterceptorException;
}

```
#### 定义三个 拦截器 实例
```java
package org.vincent.aop.interceptor;

import org.vincent.aop.interceptor.exception.InterceptorException;

/**
 * @author PengRong
 * @package org.vincent.aop.interceptor
 * @date 2019/1/10 - 22:28
 * @ProjectName JavaAopLearning
 * @Description: FirstInterceptor 第一个切面类
 */
public class FirstInterceptor implements Interceptor {


    @Override
    public void beforeIntercept(Object... args) throws InterceptorException {
        System.out.println("ClassName: "+this.getClass().getSimpleName()+" methodName ="+new Exception().getStackTrace()[0].getMethodName());
    }

    @Override
    public void afterIntercept(Object result) throws InterceptorException {
        System.out.println("ClassName: "+this.getClass().getSimpleName()+" methodName ="+new Exception().getStackTrace()[0].getMethodName());
    }
}

```

---

```java
package org.vincent.aop.interceptor;

import org.vincent.aop.interceptor.exception.InterceptorException;

import java.util.Arrays;

/**
 * @author PengRong
 * @package org.vincent.aop.interceptor
 * @date 2019/1/10 - 22:28
 * @ProjectName JavaAopLearning
 * @Description: SecInterceptor 第二个 切面类
 */
public class SecInterceptor implements Interceptor {


    @Override
    public void beforeIntercept(Object... args) throws InterceptorException {
        System.out.println("ClassName: "+this.getClass().getSimpleName()+" methodName ="+new Exception().getStackTrace()[0].getMethodName()+" "+ Arrays.toString(args));
    }

    @Override
    public void afterIntercept(Object result) throws InterceptorException {
        System.out.println("ClassName: "+this.getClass().getSimpleName()+" methodName ="+new Exception().getStackTrace()[0].getMethodName());
    }
}

```

---

```java
package org.vincent.aop.interceptor;

import org.vincent.aop.interceptor.exception.InterceptorException;

/**
 * @author PengRong
 * @package org.vincent.aop.interceptor
 * @date 2019/1/10 - 22:29
 * @ProjectName JavaAopLearning
 * @Description: ThirInterceptor 第三个 切面类
 */
public class ThirInterceptor implements Interceptor {


    @Override
    public void beforeIntercept(Object... args) throws InterceptorException {
        System.out.println("ClassName: "+this.getClass().getSimpleName()+" methodName ="+new Exception().getStackTrace()[0].getMethodName());
    }

    @Override
    public void afterIntercept(Object result) throws InterceptorException {
        System.out.println("ClassName: "+this.getClass().getSimpleName()+" methodName ="+new Exception().getStackTrace()[0].getMethodName());
    }
}

```
#### Exception 定义
```java
package org.vincent.aop.interceptor.exception;

/**
 * @author PengRong
 * @package org.vincent.aop.interceptor.exception
 * @date 2019/1/10 - 22:50
 * @ProjectName JavaAopLearning
 * @Description: InterceptorException 异常类
 */
public class InterceptorException extends   Exception{
    public InterceptorException(){
        this("msg...",null);

    }
    public InterceptorException(String msg){
        this(msg,null);
    }
    public InterceptorException(String msg,Throwable e){
        super(msg,e);
    }
}

```
#### 基于Cglib 实现切点通知逻辑
```java
package org.vincent.aop.interceptor;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import org.vincent.aop.interceptor.exception.InterceptorException;

import java.util.List;
import java.util.Objects;

/**
 * @author PengRong
 * @package org.vincent.aop.interceptor
 * @date 2019/1/10 - 22:59
 * @ProjectName JavaAopLearning
 * @Description: 基于Cglib 实现动态代理类，并实现在业务方法之前 之后插入 切面 通知逻辑
 */
public class InterceptorStackProxyGenerator {
    /**
     * @param targetClass  需要被代理的委托类对象的Class实例，Cglib需要继承该类生成子类
     * @param interceptors 切面对象列表栈 ，每个元素都是一个切面, 该对象方法将在切点方法之前或之后执行
     * @return 返回 targetClass 创建的代理类
     */
    public static Object generatorCglibProxy(final Class targetClass, final List<Interceptor> interceptors) {
        //3.1 new Enhancer
        Enhancer enhancer = new Enhancer();
        //3.2 设置需要代理的父类
        enhancer.setSuperclass(targetClass);
        //3.3 设置回调
        enhancer.setCallback((MethodInterceptor) (proxy, method, args, methodProxy) -> {
            if (Objects.isNull(interceptors)){
                throw  new  InterceptorException("interceptors is not null");
            }
            // 执行切面方法
            interceptors.forEach((Interceptor item) -> {
                try {
                    item.beforeIntercept(args);
                } catch (InterceptorException e) {
                    e.printStackTrace();
                }
            });
            // 具体逻辑代码执行,返回值为方法执行结果
            Object result = methodProxy.invokeSuper(proxy, args);
            // 执行切面方法
            interceptors.forEach((Interceptor item) -> {
                try {
                    item.afterIntercept(result);
                } catch (InterceptorException e) {
                    e.printStackTrace();
                }
            });
            // 返回方法执行结果
            return result;
        });
        // 3.4 创建代理对象
        return enhancer.create();
    }
}

```

####  基于Cglib 拦截器链 测试
```java
package org.vincent.aop.intercepter;

import org.junit.Test;
import org.vincent.aop.interceptor.AccountServiceImpl;
import org.vincent.aop.interceptor.FirstInterceptor;
import org.vincent.aop.interceptor.Interceptor;
import org.vincent.aop.interceptor.InterceptorStackProxyGenerator;
import org.vincent.aop.interceptor.SecInterceptor;
import org.vincent.aop.interceptor.ThirInterceptor;

import java.util.ArrayList;
import java.util.List;

/**
 * @author PengRong
 * @package org.vincent.aop.intercepter
 * @date 2019/1/10 - 22:30
 * @ProjectName JavaAopLearning
 * @Description: 拦截器栈测试
 */
public class IntercepterTest {
    @Test
    public void intercepterTest() {
        /**
         * 构建拦截器栈, 每个切面add 到List的属性影响 拦截器 栈执行先后顺序
         */
        Interceptor interceptor1 = new FirstInterceptor();
        Interceptor interceptor2 = new SecInterceptor();
        Interceptor interceptor3 = new ThirInterceptor();
        List<Interceptor> interceptors = new ArrayList<>();
        interceptors.add(interceptor3);
        interceptors.add(interceptor1);
        interceptors.add(interceptor2);

        /**
         * 代理类构造工具方法
         */
        AccountServiceImpl generator = (AccountServiceImpl) InterceptorStackProxyGenerator.generatorCglibProxy(AccountServiceImpl.class, interceptors);
        /**
         * 调用业务方法
         */
        System.out.println(generator.login("asfdas", "12121212"));

    }
}

```

### AspectJ  实现 AOP 效果

AOP 实现的关键就在于 AOP 框架自动创建的 AOP 代理，AOP 代理则可分为静态代理和动态代理两大类:
- 静态代理是指使用 AOP 框架提供的命令进行编译，从而在编译阶段通过AOP框架指令生成 AOP 代理类，因此也称为编译时增强；还有一种静态代理是编写代码实现不用工具；这种方式一般是代理模式会使用。
- 动态代理则在运行时借助于 JDK 动态代理、CGLIB 等在内存中“临时”生成 AOP 动态代理类，因此也被称为运行时增强。
#### 基于 AspectJ 的编译时增强进行 AOP POM 依赖
原生 AspectJ 不依赖Spring案例, 基于 AspectJ 的编译时增强进行 AOP 它是在编译期修改字节码，增强功能；并不会生成新的代理类字节码。

```xml

<!-- AspectJ begin-->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjrt</artifactId>
    <version>1.9.2</version>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.2</version>
</dependency>
<!-- AspectJ stop-->

```
 
## 动态代理 使用场景
- 日志集中打印
- 事务
- 权限管理
- AOP

## 参考

---
[java动态代理实现与原理详细分析](http://www.cnblogs.com/gonjan-blog/p/6685611.html)

[保存Java代理框架生成的类文件](https://blog.csdn.net/iteye_6889/article/details/82552672)

[java的动态代理机制详解](http://www.cnblogs.com/xiaoluo501395377/p/3383130.html)

[彻底理解JAVA动态代理](https://www.cnblogs.com/flyoung2008/archive/2013/08/11/3251148.html)

[转-Java中的静态代理、JDK动态代理、cglib动态代理](http://wuwenliang.net/2018/11/25/%E8%BD%AC-Java%E4%B8%AD%E7%9A%84%E9%9D%99%E6%80%81%E4%BB%A3%E7%90%86%E3%80%81JDK%E5%8A%A8%E6%80%81%E4%BB%A3%E7%90%86%E3%80%81cglib%E5%8A%A8%E6%80%81%E4%BB%A3%E7%90%86/)


[Java动态代理的两种实现方法](https://blog.csdn.net/heyutao007/article/details/49738887)

[Java三种代理模式：静态代理、动态代理和cglib代理](https://segmentfault.com/a/1190000011291179)

[java动态代理实现与原理详细分析](https://www.cnblogs.com/zyy1688/p/10110148.html)

[IBM - Java 动态代理机制分析及扩展，第 1 部分](https://www.ibm.com/developerworks/cn/java/j-lo-proxy1/)

[Java代理(jdk静态代理、动态代理和cglib动态代理)](http://www.cnblogs.com/fillPv/p/5939277.html)

[基于Class字节码透视动态代理本质](https://shimo.im/doc/ONEwKqaiY6cxz1f4)

[JAVA反射与注解](https://www.daidingkang.cc/2017/07/18/java-reflection-annotations/)

-- 待看

[Spring AOP 实现原理----AspectJ与CGLIB介绍](https://blog.csdn.net/wenbingoon/article/details/8988553)

[Java之代理（jdk静态代理，jdk动态代理，cglib动态代理，aop，aspectj）](https://blog.csdn.net/centre10/article/details/6847828)

[Java JDK代理、CGLIB、AspectJ代理分析比较](https://blog.csdn.net/a837199685/article/details/68930987)

[cglib源码分析（四）：cglib 动态代理原理分析](https://www.cnblogs.com/cruze/p/3865180.html#lable1)

[Cglib源码分析 invoke和invokeSuper的差别](https://blog.csdn.net/makecontral/article/details/79593732)

## 源码
[github-欢迎star交流](https://github.com/JKAK47/JavaAopLearning)

