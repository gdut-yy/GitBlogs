## 面试题 01：赋值运算符函数

题目：如下为类型 CMyString 的声明，请为该类型添加赋值运算符函数。

	class CMyString{
	public:
		CMyString(char* pData = nullptr);
		CMyString(const CMyString& str);
		~CMyString(void);
	
	private:
		char* m_pData;
	}

----