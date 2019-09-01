## 面试题 10：斐波那契数列

题目一：求斐波那契数列的第n项。

写一个函数，输入n，求斐波那契（Fibonacci）数列的第n项。斐波那契数列的定义如下：
```
f(n)=0 				n=0
f(n)=1 				n=1
f(n)=f(n-1)+f(n-2) 	n>1
```
题目二：青蛙跳台阶问题

一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个n级的台阶总共有多少种跳法。

题目三：变态跳台阶（来自牛客网）

一只青蛙一次可以跳上1级台阶，也可以跳上2级······它也可以跳上n级，此时该青蛙跳上一个n级的台阶总共有多少种跳法？


----

### 斐波那契数列 O(n) 版本

即牛客网版本

### 斐波那契数列 O(logn) 版本（但不够实用）

----

### 牛客网版本
```cpp
class Solution {
public:
	int Fibonacci(int n) {
		if(n<=0)
			return 0;
		if(n==1)
			return 1;
		int fib1=1;
		int fib2=0;
		int fibn;
		for(int i=2; i<=n; i++) {
			fibn = fib1+fib2;

			fib2 = fib1;
			fib1 = fibn;
		}
		return fibn;
	}
};
```
----
```cpp
class Solution {
public:
	int jumpFloorII(int number) {
		int jump_number = 1;
		for(int i=0; i<number-1; i++)
			jump_number = jump_number * 2;
		return jump_number;
	}
};
```