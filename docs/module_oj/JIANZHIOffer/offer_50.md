## 面试题 50（一）：字符串中第一个只出现一次的字符
题目：在字符串中找出第一个只出现一次的字符。如输入"abaccdeff"，则输出'b'。

---

```cpp
#include <bits/stdc++.h>

using namespace std;

char FirstNotRepeatingChar(const char *pString) {
    if (pString == nullptr)
        return '\0';

    const int tableSize = 256;
    unsigned int hashTable[tableSize];
    for (unsigned int &i : hashTable)
        i = 0;

    const char *pHashKey = pString;
    while (*(pHashKey) != '\0')
        hashTable[*(pHashKey++)]++;

    pHashKey = pString;
    while (*pHashKey != '\0') {
        if (hashTable[*pHashKey] == 1)
            return *pHashKey;

        pHashKey++;
    }

    return '\0';
}

// ====================测试代码====================
void Test(const char *pString, char expected) {
    if (FirstNotRepeatingChar(pString) == expected)
        printf("Test passed.\n");
    else
        printf("Test failed.\n");
}

int main(int argc, char *argv[]) {
    // 常规输入测试，存在只出现一次的字符
    Test("google", 'l');

    // 常规输入测试，不存在只出现一次的字符
    Test("aabccdbd", '\0');

    // 常规输入测试，所有字符都只出现一次
    Test("abcdefg", 'a');

    // 鲁棒性测试，输入nullptr
    Test(nullptr, '\0');

    return 0;
}
```

---

## 面试题 50（二）：字符流中第一个只出现一次的字符
题目：请实现一个函数用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是'g'。当从该字符流中读出前六个字符"google"时，第一个只出现一次的字符是'l'。

---

```cpp
#include <bits/stdc++.h>

using namespace std;

class CharStatistics {
public:
    CharStatistics() : index(0) {
        for (int &i : occurrence)
            i = -1;
    }

    void Insert(char ch) {
        if (occurrence[ch] == -1)
            occurrence[ch] = index;
        else if (occurrence[ch] >= 0)
            occurrence[ch] = -2;

        index++;
    }

    char FirstAppearingOnce() {
        char ch = '\0';
        int minIndex = numeric_limits<int>::max();
        for (int i = 0; i < 256; ++i) {
            if (occurrence[i] >= 0 && occurrence[i] < minIndex) {
                ch = (char) i;
                minIndex = occurrence[i];
            }
        }

        return ch;
    }

private:
    // occurrence[i]: A character with ASCII value i;
    // occurrence[i] = -1: The character has not found;
    // occurrence[i] = -2: The character has been found for mutlple times
    // occurrence[i] >= 0: The character has been found only once
    int occurrence[256]{};
    int index;
};

// ====================测试代码====================
void Test(const char *testName, CharStatistics chars, char expected) {
    if (testName != nullptr)
        printf("%s begins: ", testName);

    if (chars.FirstAppearingOnce() == expected)
        printf("Passed.\n");
    else
        printf("FAILED.\n");
}

int main(int argc, char *argv[]) {
    CharStatistics chars;

    Test("Test1", chars, '\0');

    chars.Insert('g');
    Test("Test2", chars, 'g');

    chars.Insert('o');
    Test("Test3", chars, 'g');

    chars.Insert('o');
    Test("Test4", chars, 'g');

    chars.Insert('g');
    Test("Test5", chars, '\0');

    chars.Insert('l');
    Test("Test6", chars, 'l');

    chars.Insert('e');
    Test("Test7", chars, 'l');

    return 0;
}
```

