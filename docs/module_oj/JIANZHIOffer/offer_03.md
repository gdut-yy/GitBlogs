## 面试题 03：数组中重复的数字

题目一：找出数组中重复的数字。

在一个长度为n的数组里的所有数字都在0~n-1的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是重复的数字2或者3。

题目二：不修改数组找出重复的数字。

在一个长度为n+1的数组里的所有数字都在1~n的范围内。所以数组中至少有一个数字是重复的。请找出数组中任意一个重复的数字，但不能修改输入的数组。例如，如果输入长度为8的数组{2,3,5,4,3,2,6,7}，那么对应的输出是重复的数字2或者3。

----

```cpp
#include <bits/stdc++.h>

using namespace std;

int countRange(const int *numbers, int length, int start, int end);

// 参数:
//        numbers:     一个整数数组
//        length:      数组的长度
// 返回值:
//        正数  - 输入有效，并且数组中存在重复的数字，返回值为重复的数字
//        负数  - 输入无效，或者数组中没有重复的数字
int getDuplication(const int *numbers, int length) {
    if (numbers == nullptr || length <= 0)
        return -1;

    int start = 1;
    int end = length - 1;
    while (end >= start) {
        int middle = ((end - start) / 2) + start;
        int count = countRange(numbers, length, start, middle);
        if (end == start) {
            if (count > 1)
                return start;
            else
                break;
        }

        if (count > (middle - start + 1))
            end = middle;
        else
            start = middle + 1;
    }
    return -1;
}

int countRange(const int *numbers, int length, int start, int end) {
    if (numbers == nullptr)
        return 0;

    int count = 0;
    for (int i = 0; i < length; i++)
        if (numbers[i] >= start && numbers[i] <= end)
            ++count;
    return count;
}

// ====================测试代码====================
void test(const char *testName, int *numbers, int length, const int *duplications, int dupLength) {
    int result = getDuplication(numbers, length);
    for (int i = 0; i < dupLength; ++i) {
        if (result == duplications[i]) {
            std::cout << testName << " passed." << std::endl;
            return;
        }
    }
    std::cout << testName << " FAILED." << std::endl;
}

// 多个重复的数字
void test1() {
    int numbers[] = {2, 3, 5, 4, 3, 2, 6, 7};
    int duplications[] = {2, 3};
    test("test1", numbers, sizeof(numbers) / sizeof(int), duplications, sizeof(duplications) / sizeof(int));
}

// 一个重复的数字
void test2() {
    int numbers[] = {3, 2, 1, 4, 4, 5, 6, 7};
    int duplications[] = {4};
    test("test2", numbers, sizeof(numbers) / sizeof(int), duplications, sizeof(duplications) / sizeof(int));
}

// 重复的数字是数组中最小的数字
void test3() {
    int numbers[] = {1, 2, 3, 4, 5, 6, 7, 1, 8};
    int duplications[] = {1};
    test("test3", numbers, sizeof(numbers) / sizeof(int), duplications, sizeof(duplications) / sizeof(int));
}

// 重复的数字是数组中最大的数字
void test4() {
    int numbers[] = {1, 7, 3, 4, 5, 6, 8, 2, 8};
    int duplications[] = {8};
    test("test4", numbers, sizeof(numbers) / sizeof(int), duplications, sizeof(duplications) / sizeof(int));
}

// 数组中只有两个数字
void test5() {
    int numbers[] = {1, 1};
    int duplications[] = {1};
    test("test5", numbers, sizeof(numbers) / sizeof(int), duplications, sizeof(duplications) / sizeof(int));
}

// 重复的数字位于数组当中
void test6() {
    int numbers[] = {3, 2, 1, 3, 4, 5, 6, 7};
    int duplications[] = {3};
    test("test6", numbers, sizeof(numbers) / sizeof(int), duplications, sizeof(duplications) / sizeof(int));
}

// 多个重复的数字
void test7() {
    int numbers[] = {1, 2, 2, 6, 4, 5, 6};
    int duplications[] = {2, 6};
    test("test7", numbers, sizeof(numbers) / sizeof(int), duplications, sizeof(duplications) / sizeof(int));
}

// 一个数字重复三次
void test8() {
    int numbers[] = {1, 2, 2, 6, 4, 5, 2};
    int duplications[] = {2};
    test("test8", numbers, sizeof(numbers) / sizeof(int), duplications, sizeof(duplications) / sizeof(int));
}

// 没有重复的数字
void test9() {
    int numbers[] = {1, 2, 6, 4, 5, 3};
    int duplications[] = {-1};
    test("test9", numbers, sizeof(numbers) / sizeof(int), duplications, sizeof(duplications) / sizeof(int));
}

// 无效的输入
void test10() {
    int *numbers = nullptr;
    int duplications[] = {-1};
    test("test10", numbers, 0, duplications, sizeof(duplications) / sizeof(int));
}

int main() {
    test1();
    test2();
    test3();
    test4();
    test5();
    test6();
    test7();
    test8();
    test9();
    test10();

    return 0;
}
```
