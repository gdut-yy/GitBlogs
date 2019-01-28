## 面试题 04：二维数组中的查找

题目：在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。


----

### 牛客网版本

	class Solution {
	public:
	    bool Find(int target, vector<vector<int> > array) {
	        bool found=false;
	        if (array.empty())
	            return found;
	        int rows, columns, row, column;
	        rows = array.size();
	        columns = array[0].size();
	        row = 0;
	        column = columns - 1;
	        while(row < rows && column >= 0)
	        {
	            if(array[row][column] == target)
	            {
	                found = true;
	                break;
	            }
	            else if (array[row][column] > target)
	                -- column;
	            else
	                ++ row;
	        }
	        return found;
	    }
	};