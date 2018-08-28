## 面试题 05：替换空格

题目：请实现一个函数，把字符串中的每个空格替换成“%20”。例如，输入“We are happy.”，则输出“We%20are%20happy.”。

----

从左遍历由于需要移位，O(n^2)

从右开始遍历，O(n)

----

### 牛客网版本

	class Solution {
	public:
		void replaceSpace(char *str,int length) {
	        if(str == nullptr || length <=0)
	            return;
	
	        int original_length = 0;
	        int number_of_space = 0;
	        int i = 0;
	        while(str[i] != '\0')
	        {
	            ++ original_length;
	            if(str[i] == ' ')
	                ++ number_of_space;
	            ++ i;
	        }
	
	        if (number_of_space <= 0)
	            return;
	
	        int new_length = original_length + 2*number_of_space;
	
	        int index_of_original = original_length;
	        int index_of_new = new_length;
	
	        while(index_of_original>=0 && index_of_new>=index_of_original)
	        {
	            if(str[index_of_original] == ' ')
	            {
	                str[index_of_new--] = '0';
	                str[index_of_new--] = '2';
	                str[index_of_new--] = '%';
	            }
	            else
	            {
	                str[index_of_new--] = str[index_of_original];
	            }
	            -- index_of_original;
	        }
	
		}
	};