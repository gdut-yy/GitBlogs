# java开发笔试题


## 一、不定项选择题

### 1.选项中哪一行代码可以替换题目中//add code here而不产生编译错误？（）
	public abstract class MyClass {
		public int constInt = 5;
		//add code here
		public void method() {
		}
	}

	A public abstract void method(int a);
	B constInt = constInt + 5;
	C public int method();
	D public abstract void anotherMethod() {}

### 2.下列说法正确的有（）
	A． class中的constructor不可省略
	B． constructor必须与class同名，但方法不能与class同名
	C． constructor在一个对象被new时执行
	D．一个class只能定义一个constructor

### 3.Switch(expr)语句，其中expr可以为哪些（）类型
	A byte       B short       C char       D long       E double       F String 


### 4.以下哪些容器继承了Collection接口（）
	A List       B Map       C Set       D HashTable       E HashMap       F Vector

### 5.JVM内存配置参数：-Xmx10240m -Xms10240m -Xmn5120m -XXSurvivorRatio=3其最小内存值和Survivor区总大小分别是（）

	A: 5120m，1024m B: 5120m，2048m C: 10240m， 01024m D: 10240m，2048m

## 二、代码题（请注意代码逻辑性、语法和编程规范）


### 1.请用Java代码写一个单例类，并且保证该类实例的唯一性。




## 三、问答题


### 1.下面程序的运行结果是什么？


	class HelloA {
		public HelloA() {
			System.out.println("HelloA");
		}
		{ 	System.out.println("I'm A class"); }
		static { System.out.println("static A"); }
	}

	public class HelloB extends HelloA {
		public HelloB() {
			System.out.println("HelloB");
		}
		{ System.out.println("I'm B class"); }
		static { System.out.println("static B"); }
		public static void main(String[] args) { 
	　　		new HelloB(); 
		}
	}

### 2.请说说你对Spring框架的认识，使用Spring框架有什么好处？




### 3.请详细说说Web浏览器访问淘宝首页www.taobao.com，背后经历了怎样的过程？




### 4.请按题目要求写出对应的SQL



有班级表、学生表、课程表和成绩表如下：


| 班级表tb_class | 学生表tb_student | 课程表tb_course | 成绩表tb_score |
|-|-|-|-|
| class_id | student_id | course _id | score_id |
| classs_name | student_name | course _name | student_id |
|  | class_id | | course _id |
|  |  |  | scroe |

#### 4.1 插入一条数据到班级表(class_id为001, classs_name为 hudan)


#### 4.2 请写出SQL语句计算每个学生的平均成绩（各门功课成绩的平均值）