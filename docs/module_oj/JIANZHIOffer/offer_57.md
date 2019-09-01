## 面试题 57（一）：和为s的两个数字
题目：输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，输出任意一对即可。

---

```cpp
#include <bits/stdc++.h>

using namespace std;

bool FindNumbersWithSum(const int data[], int length, int sum,
                        int *num1, int *num2) {
    bool found = false;
    if (length < 1 || num1 == nullptr || num2 == nullptr)
        return found;

    int ahead = length - 1;
    int behind = 0;

    while (ahead > behind) {
        long long curSum = data[ahead] + data[behind];

        if (curSum == sum) {
            *num1 = data[behind];
            *num2 = data[ahead];
            found = true;
            break;
        } else if (curSum > sum)
            ahead--;
        else
            behind++;
    }

    return found;
}

// ====================测试代码====================
void Test(const char *testName, int data[], int length, int sum, bool expectedReturn) {
    if (testName != nullptr)
        printf("%s begins: ", testName);

    int num1, num2;
    int result = FindNumbersWithSum(data, length, sum, &num1, &num2);
    if (result == expectedReturn) {
        if (result) {
            if (num1 + num2 == sum)
                printf("Passed. \n");
            else
                printf("FAILED. \n");
        } else
            printf("Passed. \n");
    } else
        printf("FAILED. \n");
}

// 存在和为s的两个数字，这两个数字位于数组的中间
void Test1() {
    int data[] = {1, 2, 4, 7, 11, 15};
    Test("Test1", data, sizeof(data) / sizeof(int), 15, true);
}

// 存在和为s的两个数字，这两个数字位于数组的两段
void Test2() {
    int data[] = {1, 2, 4, 7, 11, 16};
    Test("Test2", data, sizeof(data) / sizeof(int), 17, true);
}

// 不存在和为s的两个数字
void Test3() {
    int data[] = {1, 2, 4, 7, 11, 16};
    Test("Test3", data, sizeof(data) / sizeof(int), 10, false);
}

// 鲁棒性测试
void Test4() {
    Test("Test4", nullptr, 0, 0, false);
}

int main(int argc, char *argv[]) {
    Test1();
    Test2();
    Test3();
    Test4();

    return 0;
}
```

---
## 面试题 57（二）：为s的连续正数序列
题目：输入一个正数s，打印出所有和为s的连续正数序列（至少含有两个数）。

例如输入15，由于1+2+3+4+5=4+5+6=7+8=15，所以结果打印出3个连续序列1～5、4～6和7～8。


```cpp
#include <bits/stdc++.h>

using namespace std;

void PrintContinuousSequence(int small, int big);

void FindContinuousSequence(int sum) {
    if (sum < 3)
        return;

    int small = 1;
    int big = 2;
    int middle = (1 + sum) / 2;
    int curSum = small + big;

    while (small < middle) {
        if (curSum == sum)
            PrintContinuousSequence(small, big);

        while (curSum > sum && small < middle) {
            curSum -= small;
            small++;

            if (curSum == sum)
                PrintContinuousSequence(small, big);
        }

        big++;
        curSum += big;
    }
}

void PrintContinuousSequence(int small, int big) {
    for (int i = small; i <= big; ++i)
        printf("%d ", i);

    printf("\n");
}

// ====================测试代码====================
void Test(const char *testName, int sum) {
    if (testName != nullptr)
        printf("%s for %d begins: \n", testName, sum);

    FindContinuousSequence(sum);
}

int main(int argc, char *argv[]) {
    Test("test1", 1);
    Test("test2", 3);
    Test("test3", 4);
    Test("test4", 9);
    Test("test5", 15);
    Test("test6", 100);

    return 0;
}
```


