## 面试题 11：旋转数组 中的最小数字

题目：把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个选择，输出旋转数组的最小元素。例如，数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。

----

首先 旋转 不是 动词，而是 旋转数组 是名词！

部分有序，所以可用二分 O(logn)

----

### 牛客网版本
```cpp
class Solution {
public:
	int minNumberInRotateArray(vector<int> rotateArray) {
		if(rotateArray.size() == 0)
			return -1;
		//前部分数据旋转
		for(int i = 0; i < rotateArray.size() - 1; i++)
		{
			if (rotateArray[i] > rotateArray[i + 1])
				return rotateArray[i + 1];
		}
		//全部数据旋转，相当于没有旋转，最小数即为第一个数
		return rotateArray[0];
	}
};
```