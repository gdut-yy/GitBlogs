## 面试题 15：二进制中的 1 的个数

题目：请实现一个函数，输入一个整数，输出该数二进制表示中 1 的个数。

例如，把9表示成二进制是1001，有2位是1.因此，如果输入9，则该函数输出2。

----

### 常规解法（二进制n位 运行n次）
```cpp
int NumberOf1(int n){
	int cnt = 0;
	unsigned int flag = 1;
	while(flag){
		if(n&flag){
			cnt++;
		}
		flag=flag << 1;
	}
	return cnt;
}
```
### 惊喜解法（二进制n个1 运行n次）
```
int NumberOf1(int n){
	int cnt = 0;
	while(n){
		++cnt;
		n=(n-1)&n;
	}
	return cnt;
}
```