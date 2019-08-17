## 面试题 06：从尾到头打印链表

题目：输入一个链表的头节点，从尾到头反过来打印出每个结点的值。链表节点定义如下：
```cpp
struct ListNode{
	int m_nKey;
	ListNode* m_pNext;
}
```
----

利用栈 先进后出 的特性来实现。

----

### 牛客网版本
```cpp
/**
*  struct ListNode {
*        int val;
*        struct ListNode *next;
*        ListNode(int x) :
*              val(x), next(NULL) {
*        }
*  };
*/
class Solution {
public:
	vector<int> printListFromTailToHead(ListNode* head) {
		vector<int> reverse_list;
		stack<int> nodes;

		ListNode *p_node = head;
		while(p_node != nullptr)
		{
			nodes.push(p_node->val);
			p_node = p_node->next;
		}

		int tempVal;
		while(!nodes.empty())
		{
			tempVal = nodes.top();
			reverse_list.push_back(tempVal);
			nodes.pop();
		}
		return reverse_list;
	}
};
```