### [编程题-iOS方向|15分] 什么事大端序？什么是小端序？请编写代码判断本地是大端序，还是小端序？

## 题目描述
请编写代码判断本地是大端序，还是小端序？大端序用1表示，小端序用0表示。
## 输入描述
无输入
## 输出描述
0或1

----

AC代码：

	#include<iostream>
	#include<vector>
	#include<cstring>
	#include<string.h>
	#include<algorithm>
	#include<cmath>
	#include<iomanip>
	
	using namespace std;
	typedef long long ll;
	
	
	union p{
	    int a;
	    char b;
	};
	int fun(){
	    p p1;
	    p1.a = 1;
	    return p1.a==p1.b;
	}
	int main(){
	 
	    
	    if(fun()){
	        cout<<"0"<<endl;
	    }else{
	        cout<<"1"<<endl;
	    }
	    return 0;
	}

