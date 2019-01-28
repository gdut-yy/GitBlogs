## 面试题 09：用两个栈实现队列

题目：用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead，分别完成在队列尾部插入节点和在队列头部删除节点的功能。

	template<typename T> class CQueue{
	public:
		CQueue(void);
		~CQueue(void);
		
		void appendTail(const T& node);
		T deleteHead();
	
	private:
		stack<T> stack1;
		stack<t> stack2;
	};

----

### 牛客网版本

	class Solution
	{
	public:
	    void push(int node) {
	        stack1.push(node);
	    }
	
	    int pop() {
	        if(stack2.empty())
	        {
	            while(!stack1.empty())
	            {
	                int val = stack1.top();
	                stack1.pop();
	                stack2.push(val);
	            }
	        }
	        int val = stack2.top();
	        stack2.pop();
	        return val;
	    }
	
	private:
	    stack<int> stack1;
	    stack<int> stack2;
	};

