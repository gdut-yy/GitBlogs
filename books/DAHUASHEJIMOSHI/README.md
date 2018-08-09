# 《大话设计模式》 程杰 著

![](DAHUASHEJIMOSHI.jpg)

## 书评
一本非常浅显易懂的书。

书中例子是用 C# 写的，虽然 C# 与 Java 相似，但毕竟是两门语言，此处试图使用 Java 实现。

## 目录

| 第 n 章 | 原则 n | 模式 n |
| - | :-: | :-: |
| 第 1 章 代码无错就是优？——简单工厂模式 | - | [简单工厂模式](#a1) |
| 第 2 章 商场促销——策略模式 | - | [策略模式](#1.1) |
| 第 3 章 拍摄 UFO——单一职责原则 | [单一职责原则]() | - |
| 第 4 章 考研求职两不误——开放-封闭原则 | [开放-封闭原则]() | - |
| 第 5 章 会修电脑不会修收音机？——依赖倒转原则 | [依赖倒转原则]() | - |
| 第 6 章 穿什么有这么重要？——装饰模式 | - | [装饰模式]() |
| 第 7 章 为别人做嫁衣——代理模式 | - | [代理模式]() |
| 第 8 章 雷锋依然在人间——工厂方法模式 | - | [工厂方法模式]() |
| 第 9 章 简历复印——原型模式 | - | [原型模式]() |
| 第 10 章 考题抄错会做也白搭——模板方法模式 | - | [模板方法模式]() |
| 第 11 章 无熟人难办事？——迪米特法则 | [迪米特法则]() | - |
| 第 12 章 牛市股票还会亏钱？——外观模式 | - | [外观模式]() |
| 第 13 章 好菜每回味不同——建造者模式 | - | [建造者模式]() |
| 第 14 章 老板回来，我不知道——观察者模式 | - | [观察者模式]() |
| 第 15 章 就不能不换 DB 吗？——抽象工厂模式 | - | [抽象工厂模式]() |
| 第 16 章 无尽加班何时休——状态模式 | - | [状态模式]() |
| 第 17 章 在 NBA 我需要翻译——适配器模式 | - | [适配器模式]() |
| 第 18 章 如果再回到从前——备忘录模式 | - | [备忘录模式]() |
| 第 19 章 分公司=一部门——组合模式 | - | [组合模式]() |
| 第 20 章 想走？可以！先买票——迭代器模式 | - | [迭代器模式]() |
| 第 21 章 有些类也需计划生育——单例模式 | - | [单例模式]() |
| 第 22 章 手机软件何时统一——桥接模式 | - | [桥接模式]() |
| 第 23 章 烤羊肉串引来的思考——命令模式 | - | [命令模式]() |
| 第 24 章 加薪非要老总批？——职责链模式 | - | [职责链模式]() |
| 第 25 章 世界需要和平——中介者模式 | - | [中介者模式]() |
| 第 26 章 项目多也别傻做——享元模式 | - | [享元模式]() |
| 第 27 章 其实你不懂老板的心——解释器模式 | - | [解释器模式]() |
| 第 28 章 男人和女人——访问者模式 | - | [访问者模式]() |
| 第 29 章 OOTV 杯超级模式大赛——模式总结 | - | - |
| 附录 A 培训实习生——面向对象基础 | - | - |
| 附录 B 参考文献 | - | - |


<h1 id="a1">1. 简单工厂模式</h1>

书本的开始，借小菜的口说了一道面试题。

“请用 C++、Java、C# 或 VB.NET 任意一种面向对象语言实现一个计算器控制台程序，要求输入两个数和运算符号，得到结果。”

小菜的回答如下：

# 1.1

	import java.util.Scanner;
	
	public class Program {
		public static void main(String[] args) {
			Scanner scanner = new Scanner(System.in);
			System.out.println("请输入数字A：");
			String A = scanner.nextLine();
			System.out.println("请选择运算符号（+、-、*、/）：");
			String B = scanner.nextLine();
			System.out.println("请输入数字B：");
			String C = scanner.nextLine();
			String D = "";
			scanner.close();
	
			if (B.equals("+")) {
				D = String.valueOf((Double.parseDouble(A) + Double.parseDouble(C)));
			}
			if (B.equals("-")) {
				D = String.valueOf((Double.parseDouble(A) - Double.parseDouble(C)));
			}
			if (B.equals("*")) {
				D = String.valueOf((Double.parseDouble(A) * Double.parseDouble(C)));
			}
			if (B.equals("/")) {
				D = String.valueOf((Double.parseDouble(A) / Double.parseDouble(C)));
			}
	
			System.out.println("结果是：" + D);
		}
	}

大鸟告诉小菜该程序存在三点问题：1.变量的命名不规范；2.判断分支存在缺陷；3.当除数为 0 时会出 bug。

于是小菜稍作改进如下：

### 1.2

	import java.util.Scanner;
	
	public class Program {
		public static void main(String[] args) {
			try {
				Scanner scanner = new Scanner(System.in);
				System.out.println("请输入数字A：");
				String strNumberA = scanner.nextLine();
				System.out.println("请选择运算符号（+、-、*、/）：");
				String strOperate = scanner.nextLine();
				System.out.println("请输入数字B：");
				String strNumberB = scanner.nextLine();
				String strResult = "";
				scanner.close();
				switch (strOperate) {
				case "+":
					strResult = String.valueOf((Double.parseDouble(strNumberA) + Double.parseDouble(strNumberB)));
					break;
				case "-":
					strResult = String.valueOf((Double.parseDouble(strNumberA) - Double.parseDouble(strNumberB)));
					break;
				case "*":
					strResult = String.valueOf((Double.parseDouble(strNumberA) * Double.parseDouble(strNumberB)));
					break;
				case "/":
					strResult = String.valueOf((Double.parseDouble(strNumberA) / Double.parseDouble(strNumberB)));
					break;
				}
				System.out.println("结果是：" + strResult);
			} catch (Exception e) {
				System.out.println("您的输入有错：" + e.getMessage());
			}
		}
	}

该版本其实功能上没啥大问题了，但本书的真正的内容才刚刚开始，作者提问到 “代码无错就是优？”

显然未必，这样没有做到界面逻辑和业务逻辑的分离。

于是乎：

## 1.3

	public class Operation {
		public static double GetResult(double numberA, double numberB, String operate) {
			double result = 0d;
			switch (operate) {
			case "+":
				result = numberA + numberB;
				break;
			case "-":
				result = numberA - numberB;
				break;
			case "*":
				result = numberA * numberB;
				break;
			case "/":
				result = numberA / numberB;
				break;
			}
			return result;
		}
	}

---

	import java.util.Scanner;
	
	public class Program {
		public static void main(String[] args) {
			try {
				Scanner scanner = new Scanner(System.in);
				System.out.println("请输入数字A：");
				String strNumberA = scanner.nextLine();
				System.out.println("请选择运算符号（+、-、*、/）：");
				String strOperate = scanner.nextLine();
				System.out.println("请输入数字B：");
				String strNumberB = scanner.nextLine();
				String strResult = "";
				scanner.close();			
				strResult=Operation.GetResult(Double.parseDouble(strNumberA), Double.parseDouble(strNumberB), strOperate)+"";
				System.out.println("结果是：" + strResult);
			} catch (Exception e) {
				System.out.println("您的输入有错：" + e.getMessage());
			}
		}
	}

这里仅仅用到面向对象三大属性之一的封装。大鸟指出应该把加减乘除等运算分离。

### 1.4

	public class Operation {
	
		private double _numberA = 0;
		private double _numberB = 0;
	
		public double get_numberA() {
			return _numberA;
		}
	
		public void set_numberA(double _numberA) {
			this._numberA = _numberA;
		}
	
		public double get_numberB() {
			return _numberB;
		}
	
		public void set_numberB(double _numberB) {
			this._numberB = _numberB;
		}
	
		public double GetResult() {
			double result = 0;
			return result;
		}
	}
	
	class OperationAdd extends Operation {
		@Override
		public double GetResult() {
			double result = 0;
			result = get_numberA() + get_numberB();
			return result;
		}
	}
	
	class OperationSub extends Operation {
		@Override
		public double GetResult() {
			double result = 0;
			result = get_numberA() - get_numberB();
			return result;
		}
	}
	
	class OperationMul extends Operation {
		@Override
		public double GetResult() {
			double result = 0;
			result = get_numberA() * get_numberB();
			return result;
		}
	}
	
	class OperationDiv extends Operation {
		@Override
		public double GetResult() {
			double result = 0;
			if (get_numberB() == 0) {
				try {
					throw new Exception("除数不能为0。");
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			result = get_numberA() / get_numberB();
			return result;
		}
	}

---

	public class OperationFactory {
		public static Operation createOperate(String operate) {
			Operation oper = null;
			switch (operate) {
			case "+":
				oper = new OperationAdd();
				break;
			case "-":
				oper = new OperationSub();
				break;
			case "*":
				oper = new OperationMul();
				break;
			case "/":
				oper = new OperationDiv();
				break;
			}
			return oper;
		}
	}

---

	public class Program {
		public static void main(String[] args) {		
			Operation oper;
			oper = OperationFactory.createOperate("/");
			oper.set_numberA(1);
			oper.set_numberB(0);
			double result = oper.GetResult();
			System.out.println(result);
		}
	}

用一个单独的类来做创造实例的过程，就是工厂。

日后如需增加运算，只需增加相应的子类和在工厂类中增加 switch 分支就可以了。

## 2. 策略模式

书中借商场促销这个例子进行讲解，简单工厂模式虽然可以做到业务逻辑与界面逻辑的分离，但工厂中包含了所有的收费方式。而商场可能经常更改促销方案，维护和扩展的时候需要改动工厂，重新编译部署，并不是最好的办法。

于是提出了策略模式，简言之就是封装了不同的算法：

	public abstract class Strategy {
		public abstract void AlgorithmInterface();
	}
	
	class ConcreteStrategyA extends Strategy {
		@Override
		public void AlgorithmInterface() {
			System.out.println("算法A实现");
		}
	}
	
	class ConcreteStrategyB extends Strategy {
		@Override
		public void AlgorithmInterface() {
			System.out.println("算法B实现");
		}
	}
	
	class ConcreteStrategyC extends Strategy {
		@Override
		public void AlgorithmInterface() {
			System.out.println("算法C实现");
		}
	}
	
---
	
	public class Context {
		Strategy strategy;
	
		public Context(Strategy strategy) {
			this.strategy = strategy;
		}
	
		public void ContextInterface() {
			strategy.AlgorithmInterface();
		}
	}
	
---
	
	public class Program {
		public static void main(String[] args) {
			Context context;
	
			context = new Context(new ConcreteStrategyA());
			context.ContextInterface();
	
			context = new Context(new ConcreteStrategyB());
			context.ContextInterface();
	
			context = new Context(new ConcreteStrategyC());
			context.ContextInterface();
		}
	}

---

	Output:
	算法A实现
	算法B实现
	算法C实现



## 3. 装饰模式

书中用小菜穿衣的例子来进行讲述，装饰模式比生成子类更为灵活。

装饰模式是为已有功能动态地添加更多功能的一种方式。

	public abstract class Component {
		public abstract void Operation();
	}

---
	
	public class ConcreteComponent extends Component {
		@Override
		public void Operation() {
			System.out.println("具体对象的操作");
		}
	}

---
	
	public class Decorator extends Component {
	
		protected Component component;
	
		public void setComponent(Component component) {
			this.component = component;
		}
	
		@Override
		public void Operation() {
			if (component != null) {
				component.Operation();
			}
		}
	}
	
	class ConcreteDecoratorA extends Decorator {
	
		private String addedState;
	
		@Override
		public void Operation() {
			super.Operation();
			addedState = "New State";
			System.out.println("具体装饰对象A的操作");
		}
	}
	
	class ConcreteDecoratorB extends Decorator {
	
		@Override
		public void Operation() {
			super.Operation();
			AddedBehavior();
			System.out.println("具体装饰对象B的操作");
		}
	
		private void AddedBehavior() {
		}
	}
	
---

	public class Main {
		public static void main(String[] args) {
			ConcreteComponent c = new ConcreteComponent();
			ConcreteDecoratorA d1 = new ConcreteDecoratorA();
			ConcreteDecoratorB d2 = new ConcreteDecoratorB();
	
			d1.setComponent(c);
			d2.setComponent(d1);
			d2.Operation();		// 若不调用，无输出
		}
	}

---

	Output：
	具体对象的操作
	具体装饰对象A的操作
	具体装饰对象B的操作

## 4. 代理模式

代理模式，主要目的是为其他对象提供一种代理以控制对这个对象的访问。

书中举了“为别人做嫁衣”的例子，个人觉得比较模糊。

Proxy 类保存一个引用是的代理可以访问实体。

代理模式的四种应用场合：

1. 远程代理，也就是为一个对象在不同的地址空间提供局部代表。这样可以隐藏一个对象存在于不同地址空间的事实。
2. 虚拟代理，是根据需要创建开销很大的对象。通过它来存放实例化需要很长时间的真实对象。
3. 安全代理，用来控制真实对象访问时的权限。
4. 智能指引，是指当调用真实的对象时，代理处理另外一些事。

---

	public abstract class Subject {
		public abstract void Request();
	}
	
---

	public class RealSubject extends Subject {
		@Override
		public void Request() {
			System.out.println("真实的请求");
		}
	}

---
	
	public class Proxy extends Subject {
		RealSubject realSubject;
	
		@Override
		public void Request() {
			if (realSubject == null) {
				realSubject = new RealSubject();
			}
			realSubject.Request();
		}
	}

---
	
	public class Main {
		public static void main(String[] args) {
			Proxy proxy = new Proxy();
			proxy.Request();
		}
	}

---
	
	Output:
	真实的请求


## 5. 工厂方法模式

简单工厂的升级版，工厂方法模式是简单工厂模式的进一步抽象和推广。

在简单工厂中，增加修改功能需要通过修改工厂类实现，这样违背了“开放-封闭原则”。

工厂方法模式，定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法是一个类的实例化延迟到其子类。

	public interface IFactory {
		Operation CreateOperation();
	}
	
	class AddFactory implements IFactory{
		@Override
		public Operation CreateOperation() {
			return new OperationAdd();
		}	
	}
	
	class SubFactory implements IFactory{
		@Override
		public Operation CreateOperation() {
			return new OperationSub();
		}	
	}
	
	class MulFactory implements IFactory{
		@Override
		public Operation CreateOperation() {
			return new OperationMul();
		}	
	}
	
	class DivFactory implements IFactory{
		@Override
		public Operation CreateOperation() {
			return new OperationDiv();
		}	
	}

---
	
	public class Main {
	
		public static void main(String[] args) {
			IFactory operFactory = new AddFactory();
			Operation oper = operFactory.CreateOperation();
			oper.set_numberA(1);
			oper.set_numberB(2);
			double result = oper.GetResult();
			System.out.println(result);
		}
	}

---

	OUTPUT:
	3.0

## 6. 原型模式

原型模式主要是用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。

而拷贝又分为 浅复制 和 深复制 两种。

Java 中提供了 Cloneable 接口写法。可通过继承该接口重写 clone() 方法 实现 浅复制 和 深复制。

### 6.1 浅复制

	public class WorkExperience {
	
		private String workDate;
		private String company;
	
		public String getWorkDate() {
			return workDate;
		}
	
		public void setWorkDate(String workDate) {
			this.workDate = workDate;
		}
	
		public String getCompany() {
			return company;
		}
	
		public void setCompany(String company) {
			this.company = company;
		}
	}

---
	
	public class Resume implements Cloneable {
	
		private String name;
		private String sex;
		private String age;
	
		private WorkExperience work;
	
		public Resume(String name) {
			this.name = name;
			work = new WorkExperience();
		}
	
		public void setPersonalInfo(String sex, String age) {
			this.sex = sex;
			this.age = age;
		}
	
		public void setWorkExperience(String workDate, String company) {
			work.setWorkDate(workDate);
			work.setCompany(company);
		}
	
		public void display() {
			System.out.println(name + " " + sex + " " + age);
			System.out.println("工作经历：" + work.getWorkDate() + " " + work.getCompany());
		}
	
		@Override
		protected Object clone() throws CloneNotSupportedException {
			Object obj = super.clone();
			return obj;
		}
	}

---
	
	public class Main {
	
		public static void main(String[] args) throws CloneNotSupportedException {
			Resume a = new Resume("大鸟");
			a.setPersonalInfo("男", "29");
			a.setWorkExperience("1998-2000", "XX 公司");
	
			Resume b = (Resume) a.clone();
			b.setWorkExperience("1998-2006", "YY 企业");
	
			Resume c = (Resume) a.clone();
			c.setPersonalInfo("男", "24");
			c.setWorkExperience("1998-2003", "ZZ 企业");
	
			a.display();
			b.display();
			c.display();
		}
	}

---

	Output:
	大鸟 男 29
	工作经历：1998-2003 ZZ 企业
	大鸟 男 29
	工作经历：1998-2003 ZZ 企业
	大鸟 男 24
	工作经历：1998-2003 ZZ 企业


### 6.2 深复制

	public class WorkExperience implements Cloneable {
	
		private String workDate;
		private String company;
	
		public String getWorkDate() {
			return workDate;
		}
	
		public void setWorkDate(String workDate) {
			this.workDate = workDate;
		}
	
		public String getCompany() {
			return company;
		}
	
		public void setCompany(String company) {
			this.company = company;
		}
	
		@Override
		protected Object clone() throws CloneNotSupportedException {
			// TODO Auto-generated method stub
			return super.clone();
		}
	
	}

---
	
	public class Resume implements Cloneable {
	
		private String name;
		private String sex;
		private String age;
	
		private WorkExperience work;
	
		public Resume(String name) {
			this.name = name;
			work = new WorkExperience();
		}
	
		public void setPersonalInfo(String sex, String age) {
			this.sex = sex;
			this.age = age;
		}
	
		public void setWorkExperience(String workDate, String company) {
			work.setWorkDate(workDate);
			work.setCompany(company);
		}
	
		public void display() {
			System.out.println(name + " " + sex + " " + age);
			System.out.println("工作经历：" + work.getWorkDate() + " " + work.getCompany());
		}
	
		@Override
		protected Object clone() throws CloneNotSupportedException {
			Object obj = super.clone();
	
			// 深复制
			Resume r = (Resume) obj;
			r.work = (WorkExperience) work.clone();
	
			return obj;
		}
	}

---
	
	public class Main {
	
		public static void main(String[] args) throws CloneNotSupportedException {
			Resume a = new Resume("大鸟");
			a.setPersonalInfo("男", "29");
			a.setWorkExperience("1998-2000", "XX 公司");
	
			Resume b = (Resume) a.clone();
			b.setWorkExperience("1998-2006", "YY 企业");
	
			Resume c = (Resume) a.clone();
			c.setPersonalInfo("男", "24");
			c.setWorkExperience("1998-2003", "ZZ 企业");
	
			a.display();
			b.display();
			c.display();
		}
	}

---

	Output:
	大鸟 男 29
	工作经历：1998-2000 XX 公司
	大鸟 男 29
	工作经历：1998-2006 YY 企业
	大鸟 男 24
	工作经历：1998-2003 ZZ 企业


## 7. 模板方法模式

模板方法模式，定义一个操作中的算法的框架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重新定义该算法的某些特定步骤。

简言之，就是最常见的 abstract 类 和 继承它的子类。

（代码略）

## 8. 外观模式

外观模式，为子系统中的一组接口提供一个一致的界面，此模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。

（代码略）

## 9. 建造者模式

建造者模式，将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

（代码略）

## 10. 观察者模式 与 事件委托

观察者模式又叫做发布-订阅（Publish / Subscribe）模式。

观察者模式定义了一种多对多的依赖关系，让多个观察者对象同时监听某一个主题对象。这个主题对象在状态发生变化时，会通知所有观察者对象，使它们能够自动更新自己。

### 10.1 观察者模式 （通过继承接口实现）

	public abstract class Observer {
		public abstract void update();
	}

---	
	
	public abstract class Subject {
		private List<Observer> observers = new ArrayList<>();
		
		public void attach(Observer observer) {
			observers.add(observer);
		}
		
		public void detach(Observer observer) {
			observers.remove(observer);
		}
		
		public void Notify() {
			for (Observer o : observers) {
				o.update();
			}
		}
	}

---	
	
	public class ConcreteObserver extends Observer {
		private String name;
		private String observerState;
		private ConcreteSubject subject;
	
		public ConcreteObserver(ConcreteSubject subject, String name) {
			this.subject = subject;
			this.name = name;
		}
	
		@Override
		public void update() {
			observerState = subject.getSubjectState();
			System.out.println("观察者" + name + "的新状态是" + observerState);
		}
	
		public ConcreteSubject getSubject() {
			return subject;
		}
	
		public void setSubject(ConcreteSubject subject) {
			this.subject = subject;
		}
	}

---	
	
	public class ConcreteSubject extends Subject {
		private String subjectState;
	
		public String getSubjectState() {
			return subjectState;
		}
	
		public void setSubjectState(String subjectState) {
			this.subjectState = subjectState;
		}
	}

---	
	
	public class Main {
		public static void main(String[] args) {
			ConcreteSubject s = new ConcreteSubject();
			s.attach(new ConcreteObserver(s, "X"));
			s.attach(new ConcreteObserver(s, "Y"));
			s.attach(new ConcreteObserver(s, "Z"));
			
			s.setSubjectState("ABC");
			s.Notify();
		}
	}

---

Output:
观察者X的新状态是ABC
观察者Y的新状态是ABC
观察者Z的新状态是ABC

### 10.2 Java 自带的观察者模式

Java 中有自带的观察者模式：

- 被观察者类，继承 java.util.Observable 类（extends Observable）

- 观察者类，实现 java.util.Observer 接口（implements Observer）

---

	import java.util.Observable;
	
	public class ConcreteSubject extends Observable {
		private String subjectState;
	
		public String getSubjectState() {
			return subjectState;
		}
	
		public void setSubjectState(String subjectState) {
			this.subjectState = subjectState;
			setChanged();
			notifyObservers();
		}	
	}

---
	
	import java.util.Observable;
	import java.util.Observer;
	
	public class ConcreteObserver implements Observer {	
		private String name;
	
		public ConcreteObserver(String name) {
			this.name = name;
		}
	
		@Override
		public void update(Observable o, Object arg) {
			System.out.println("观察者" + name + "的新状态是" + ((ConcreteSubject)o).getSubjectState());
		}	
	}

---
	
	public class Main {
		public static void main(String[] args) {
			ConcreteSubject s = new ConcreteSubject();
			s.addObserver(new ConcreteObserver("a"));
			s.addObserver(new ConcreteObserver("b"));
			s.addObserver(new ConcreteObserver("c"));
			
			s.setSubjectState("ABC");
			s.setSubjectState("CCC");
		}
	}

---

	Output：
	观察者c的新状态是ABC
	观察者b的新状态是ABC
	观察者a的新状态是ABC
	观察者c的新状态是CCC
	观察者b的新状态是CCC
	观察者a的新状态是CCC


### 10.3 事件委托

较难（待研究）

## 11. 抽象工厂模式

## 12. 状态模式

## 13. 适配器模式

**适配器模式（Adapter）**，将一个类的接口转换成客户希望的另外一个接口。Adapter 模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

在双方都不太容易修改的时候再使用适配器模式适配。

## 14. 备忘录模式

使用同一个 bean 去保存变量值时，是可以实现的。但同时对上层应用开放了接口。

可使用一个封装类（Memonto 类），隐藏原有的实现细节。

## 15. 组合模式

**组合模式（Composite）**，将对象组合成树形结构以表示‘部分-整体’的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。

## 16. 迭代器模式

## 17. 单例模式

**单例模式（Singleton）**，保证一个类仅有一个实例，并提供一个访问它的全局访问点。

## 18. 桥接模式

## 19. 命令模式

## 20. 职责链模式


## 21. 中介者模式

## 22. 享元模式

## 23. 解释器模式


