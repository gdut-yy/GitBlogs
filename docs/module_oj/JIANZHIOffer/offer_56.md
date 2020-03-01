## 面试题 56（一）：数组中只出现一次的两个数字
题目：一个整型数组里除了两个数字之外，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。

----

```cpp
#include <bits/stdc++.h>

using namespace std;

unsigned int FindFirstBitIs1(int num);

bool IsBit1(int num, unsigned int indexBit);

void FindNumsAppearOnce(int data[], int length, int *num1, int *num2) {
    if (data == nullptr || length < 2)
        return;

    int resultExclusiveOR = 0;
    for (int i = 0; i < length; ++i)
        resultExclusiveOR ^= data[i];

    unsigned int indexOf1 = FindFirstBitIs1(resultExclusiveOR);

    *num1 = *num2 = 0;
    for (int j = 0; j < length; ++j) {
        if (IsBit1(data[j], indexOf1))
            *num1 ^= data[j];
        else
            *num2 ^= data[j];
    }
}

// 找到num从右边数起第一个是1的位
unsigned int FindFirstBitIs1(int num) {
    int indexBit = 0;
    while (((num & 1) == 0) && (indexBit < 8 * sizeof(int))) {
        num = num >> 1;
        ++indexBit;
    }

    return indexBit;
}

// 判断数字num的第indexBit位是不是1
bool IsBit1(int num, unsigned int indexBit) {
    num = num >> indexBit;
    return (num & 1);
}

// ====================测试代码====================
void Test(const char *testName, int data[], int length, int expected1, int expected2) {
    if (testName != nullptr)
        printf("%s begins: ", testName);

    int result1, result2;
    FindNumsAppearOnce(data, length, &result1, &result2);

    if ((expected1 == result1 && expected2 == result2) ||
        (expected2 == result1 && expected1 == result2))
        printf("Passed.\n\n");
    else
        printf("Failed.\n\n");
}

void Test1() {
    int data[] = {2, 4, 3, 6, 3, 2, 5, 5};
    Test("Test1", data, sizeof(data) / sizeof(int), 4, 6);
}

void Test2() {
    int data[] = {4, 6};
    Test("Test2", data, sizeof(data) / sizeof(int), 4, 6);
}

void Test3() {
    int data[] = {4, 6, 1, 1, 1, 1};
    Test("Test3", data, sizeof(data) / sizeof(int), 4, 6);
}

int main(int argc, char *argv[]) {
    Test1();
    Test2();
    Test3();

    return 0;
}
```

---

## 面试题 56（二）：数组中唯一只出现一次的数字
题目：在一个数组中除了一个数字只出现一次之外，其他数字都出现了三次。请找出那个吃出现一次的数字。

---
