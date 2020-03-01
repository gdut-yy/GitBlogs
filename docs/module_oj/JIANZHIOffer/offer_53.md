## 面试题 53（一）：数字在排序数组中出现的次数
题目：统计一个数字在排序数组中出现的次数。例如输入排序数组{1, 2, 3, 3, 3, 3, 4, 5}和数字3，由于3在这个数组中出现了4次，因此输出4。

---

```cpp
#include <bits/stdc++.h>

using namespace std;

int GetFirstK(const int *data, int length, int k, int start, int end);

int GetLastK(const int *data, int length, int k, int start, int end);

int GetNumberOfK(const int *data, int length, int k) {
    int number = 0;

    if (data != nullptr && length > 0) {
        int first = GetFirstK(data, length, k, 0, length - 1);
        int last = GetLastK(data, length, k, 0, length - 1);

        if (first > -1 && last > -1)
            number = last - first + 1;
    }

    return number;
}

// 找到数组中第一个k的下标。如果数组中不存在k，返回-1
int GetFirstK(const int *data, int length, int k, int start, int end) {
    if (start > end)
        return -1;

    int middleIndex = (start + end) / 2;
    int middleData = data[middleIndex];

    if (middleData == k) {
        if ((middleIndex > 0 && data[middleIndex - 1] != k)
            || middleIndex == 0)
            return middleIndex;
        else
            end = middleIndex - 1;
    } else if (middleData > k)
        end = middleIndex - 1;
    else
        start = middleIndex + 1;

    return GetFirstK(data, length, k, start, end);
}

// 找到数组中最后一个k的下标。如果数组中不存在k，返回-1
int GetLastK(const int *data, int length, int k, int start, int end) {
    if (start > end)
        return -1;

    int middleIndex = (start + end) / 2;
    int middleData = data[middleIndex];

    if (middleData == k) {
        if ((middleIndex < length - 1 && data[middleIndex + 1] != k)
            || middleIndex == length - 1)
            return middleIndex;
        else
            start = middleIndex + 1;
    } else if (middleData < k)
        start = middleIndex + 1;
    else
        end = middleIndex - 1;

    return GetLastK(data, length, k, start, end);
}

// ====================测试代码====================
void Test(const char *testName, int data[], int length, int k, int expected) {
    if (testName != nullptr)
        printf("%s begins: ", testName);

    int result = GetNumberOfK(data, length, k);
    if (result == expected)
        printf("Passed.\n");
    else
        printf("Failed.\n");
}

// 查找的数字出现在数组的中间
void Test1() {
    int data[] = {1, 2, 3, 3, 3, 3, 4, 5};
    Test("Test1", data, sizeof(data) / sizeof(int), 3, 4);
}

// 查找的数组出现在数组的开头
void Test2() {
    int data[] = {3, 3, 3, 3, 4, 5};
    Test("Test2", data, sizeof(data) / sizeof(int), 3, 4);
}

// 查找的数组出现在数组的结尾
void Test3() {
    int data[] = {1, 2, 3, 3, 3, 3};
    Test("Test3", data, sizeof(data) / sizeof(int), 3, 4);
}

// 查找的数字不存在
void Test4() {
    int data[] = {1, 3, 3, 3, 3, 4, 5};
    Test("Test4", data, sizeof(data) / sizeof(int), 2, 0);
}

// 查找的数字比第一个数字还小，不存在
void Test5() {
    int data[] = {1, 3, 3, 3, 3, 4, 5};
    Test("Test5", data, sizeof(data) / sizeof(int), 0, 0);
}

// 查找的数字比最后一个数字还大，不存在
void Test6() {
    int data[] = {1, 3, 3, 3, 3, 4, 5};
    Test("Test6", data, sizeof(data) / sizeof(int), 6, 0);
}

// 数组中的数字从头到尾都是查找的数字
void Test7() {
    int data[] = {3, 3, 3, 3};
    Test("Test7", data, sizeof(data) / sizeof(int), 3, 4);
}

// 数组中的数字从头到尾只有一个重复的数字，不是查找的数字
void Test8() {
    int data[] = {3, 3, 3, 3};
    Test("Test8", data, sizeof(data) / sizeof(int), 4, 0);
}

// 数组中只有一个数字，是查找的数字
void Test9() {
    int data[] = {3};
    Test("Test9", data, sizeof(data) / sizeof(int), 3, 1);
}

// 数组中只有一个数字，不是查找的数字
void Test10() {
    int data[] = {3};
    Test("Test10", data, sizeof(data) / sizeof(int), 4, 0);
}

// 鲁棒性测试，数组空指针
void Test11() {
    Test("Test11", nullptr, 0, 0, 0);
}

int main(int argc, char *argv[]) {
    Test1();
    Test2();
    Test3();
    Test4();
    Test5();
    Test6();
    Test7();
    Test8();
    Test9();
    Test10();
    Test11();

    return 0;
}
```

---
## 面试题 53（二）：0到n-1中缺失的数字
题目：一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0到n-1之内。在范围0到n-1的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

```cpp
#include <bits/stdc++.h>

using namespace std;

int GetMissingNumber(const int *numbers, int length) {
    if (numbers == nullptr || length <= 0)
        return -1;

    int left = 0;
    int right = length - 1;
    while (left <= right) {
        int middle = (right + left) >> 1;
        if (numbers[middle] != middle) {
            if (middle == 0 || numbers[middle - 1] == middle - 1)
                return middle;
            right = middle - 1;
        } else
            left = middle + 1;
    }

    if (left == length)
        return length;

    // 无效的输入，比如数组不是按要求排序的，
    // 或者有数字不在0到n-1范围之内
    return -1;
}

// ====================测试代码====================
void Test(const char *testName, int numbers[], int length, int expected) {
    if (testName != nullptr)
        printf("%s begins: ", testName);

    int result = GetMissingNumber(numbers, length);
    if (result == expected)
        printf("Passed.\n");
    else
        printf("Failed.\n");
}

// 缺失的是第一个数字0
void Test1() {
    int numbers[] = {1, 2, 3, 4, 5};
    int expected = 0;
    Test("Test1", numbers, sizeof(numbers) / sizeof(int), expected);
}

// 缺失的是最后一个数字
void Test2() {
    int numbers[] = {0, 1, 2, 3, 4};
    int expected = 5;
    Test("Test2", numbers, sizeof(numbers) / sizeof(int), expected);
}

// 缺失的是中间某个数字0
void Test3() {
    int numbers[] = {0, 1, 2, 4, 5};
    int expected = 3;
    Test("Test3", numbers, sizeof(numbers) / sizeof(int), expected);
}

// 数组中只有一个数字，缺失的是第一个数字0
void Test4() {
    int numbers[] = {1};
    int expected = 0;
    Test("Test4", numbers, sizeof(numbers) / sizeof(int), expected);
}

// 数组中只有一个数字，缺失的是最后一个数字1
void Test5() {
    int numbers[] = {0};
    int expected = 1;
    Test("Test5", numbers, sizeof(numbers) / sizeof(int), expected);
}

// 空数组
void Test6() {
    int expected = -1;
    Test("Test6", nullptr, 0, expected);
}

int main(int argc, char *argv[]) {
    Test1();
    Test2();
    Test3();
    Test4();
    Test5();
    Test6();

    return 0;
}
```

---

## 面试题 53（三）：数组中数值和下标相等的元素
题目：假设一个单调递增的数组里的每个元素都是整数并且是唯一的。请编程实现一个函数找出数组中任意一个数值等于其下标的元素。例如，在数组{-3, -1, 1, 3, 5}中，数字3和它的下标相等。

---

```cpp
#include <bits/stdc++.h>

using namespace std;

int GetNumberSameAsIndex(const int *numbers, int length) {
    if (numbers == nullptr || length <= 0)
        return -1;

    int left = 0;
    int right = length - 1;
    while (left <= right) {
        int middle = left + ((right - left) >> 1);
        if (numbers[middle] == middle)
            return middle;

        if (numbers[middle] > middle)
            right = middle - 1;
        else
            left = middle + 1;
    }

    return -1;
}

// ====================测试代码====================
void Test(const char *testName, int numbers[], int length, int expected) {
    if (GetNumberSameAsIndex(numbers, length) == expected)
        printf("%s passed.\n", testName);
    else
        printf("%s FAILED.\n", testName);
}

void Test1() {
    int numbers[] = {-3, -1, 1, 3, 5};
    int expected = 3;
    Test("Test1", numbers, sizeof(numbers) / sizeof(int), expected);
}

void Test2() {
    int numbers[] = {0, 1, 3, 5, 6};
    int expected = 0;
    Test("Test2", numbers, sizeof(numbers) / sizeof(int), expected);
}

void Test3() {
    int numbers[] = {-1, 0, 1, 2, 4};
    int expected = 4;
    Test("Test3", numbers, sizeof(numbers) / sizeof(int), expected);
}

void Test4() {
    int numbers[] = {-1, 0, 1, 2, 5};
    int expected = -1;
    Test("Test4", numbers, sizeof(numbers) / sizeof(int), expected);
}

void Test5() {
    int numbers[] = {0};
    int expected = 0;
    Test("Test5", numbers, sizeof(numbers) / sizeof(int), expected);
}

void Test6() {
    int numbers[] = {10};
    int expected = -1;
    Test("Test6", numbers, sizeof(numbers) / sizeof(int), expected);
}

void Test7() {
    Test("Test7", nullptr, 0, -1);
}

int main(int argc, char *argv[]) {
    Test1();
    Test2();
    Test3();
    Test4();
    Test5();
    Test6();
    Test7();

    return 0;
}
```