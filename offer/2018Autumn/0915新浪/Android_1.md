### [编程题-Android方向|15分] 变换单项链表顺序

## 题目描述
有一个单项链表：D(0)->D(1)->...->D(n-1)->D(n)

编写代码，把顺序改为：D(0)->D(n)->D(1)->D(n-1)->D(2)->D(n-2)->...

## 输入描述
字符串列表，以换行符（\n）进行分割
## 输出描述
node = 输入值1

node = 输入值4

node = 输入值2

node = 输入值3

## 示例1
### 输入
	1
	2
	3
	4

### 输出
	node = 1
	node = 4
	node = 2
	node = 3

----

本地IDE跑没问题，牛客网数组越界。。

	import java.util.ArrayList;
	import java.util.List;
	import java.util.Scanner;
	
	public class Main {
	
	    public static void main(String[] args) {
	        Scanner scanner = new Scanner(System.in);
	        List<Integer> list = new ArrayList<>();
	        do {
	            String string = scanner.nextLine();
	            if (string.equals("")) {
	                break;
	            }
	            list.add(Integer.valueOf(string));
	        } while (true);
	
	        if (list.size() % 2 == 0) {
	            for (int i = 0, j = list.size() - 1; i < list.size() && i < j; i++, j--) {
	                System.out.println("node = " + list.get(i));
	                System.out.println("node = " + list.get(j));
	            }
	        }else{
	            for (int i = 0, j = list.size() - 1; i < list.size() && i+1 < j; i++, j--) {
	                System.out.println("node = " + list.get(i));
	                System.out.println("node = " + list.get(j));
	            }
	            System.out.println("node = " + list.get(list.size()/2));
	        }
	        scanner.close();
	    }
	
	}