## 面试题 59（一）：滑动窗口的最大值
题目：给定一个数组和滑动窗口的大小，请找出所有滑动窗口里的最大值。例如，如果输入数组{2, 3, 4, 2, 6, 2, 5, 1}及滑动窗口的大小3，那么一共存在6个滑动窗口，它们的最大值分别为{4, 4, 6, 6, 6, 5}.

---

```cpp
#include <bits/stdc++.h>

using namespace std;

vector<int> maxInWindows(const vector<int> &num, unsigned int size) {
    vector<int> maxInWindows;
    if (num.size() >= size && size >= 1) {
        deque<int> index;

        for (unsigned int i = 0; i < size; ++i) {
            while (!index.empty() && num[i] >= num[index.back()])
                index.pop_back();

            index.push_back(i);
        }

        for (unsigned int i = size; i < num.size(); ++i) {
            maxInWindows.push_back(num[index.front()]);

            while (!index.empty() && num[i] >= num[index.back()])
                index.pop_back();
            if (!index.empty() && index.front() <= (int) (i - size))
                index.pop_front();

            index.push_back(i);
        }
        maxInWindows.push_back(num[index.front()]);
    }

    return maxInWindows;
}

// ====================测试代码====================
void Test(const char *testName, const vector<int> &num, unsigned int size, const vector<int> &expected) {
    if (testName != nullptr)
        printf("%s begins: ", testName);

    vector<int> result = maxInWindows(num, size);

    vector<int>::const_iterator iterResult = result.begin();
    vector<int>::const_iterator iterExpected = expected.begin();
    while (iterResult < result.end() && iterExpected < expected.end()) {
        if (*iterResult != *iterExpected)
            break;

        ++iterResult;
        ++iterExpected;
    }

    if (iterResult == result.end() && iterExpected == expected.end())
        printf("Passed.\n");
    else
        printf("FAILED.\n");
}

void Test1() {
    int num[] = {2, 3, 4, 2, 6, 2, 5, 1};
    vector<int> vecNumbers(num, num + sizeof(num) / sizeof(int));

    int expected[] = {4, 4, 6, 6, 6, 5};
    vector<int> vecExpected(expected, expected + sizeof(expected) / sizeof(int));

    unsigned int size = 3;

    Test("Test1", vecNumbers, size, vecExpected);
}

void Test2() {
    int num[] = {1, 3, -1, -3, 5, 3, 6, 7};
    vector<int> vecNumbers(num, num + sizeof(num) / sizeof(int));

    int expected[] = {3, 3, 5, 5, 6, 7};
    vector<int> vecExpected(expected, expected + sizeof(expected) / sizeof(int));

    unsigned int size = 3;

    Test("Test2", vecNumbers, size, vecExpected);
}

// 输入数组单调递增
void Test3() {
    int num[] = {1, 3, 5, 7, 9, 11, 13, 15};
    vector<int> vecNumbers(num, num + sizeof(num) / sizeof(int));

    int expected[] = {7, 9, 11, 13, 15};
    vector<int> vecExpected(expected, expected + sizeof(expected) / sizeof(int));

    unsigned int size = 4;

    Test("Test3", vecNumbers, size, vecExpected);
}

// 输入数组单调递减
void Test4() {
    int num[] = {16, 14, 12, 10, 8, 6, 4};
    vector<int> vecNumbers(num, num + sizeof(num) / sizeof(int));

    int expected[] = {16, 14, 12};
    vector<int> vecExpected(expected, expected + sizeof(expected) / sizeof(int));

    unsigned int size = 5;

    Test("Test4", vecNumbers, size, vecExpected);
}

// 滑动窗口的大小为1
void Test5() {
    int num[] = {10, 14, 12, 11};
    vector<int> vecNumbers(num, num + sizeof(num) / sizeof(int));

    int expected[] = {10, 14, 12, 11};
    vector<int> vecExpected(expected, expected + sizeof(expected) / sizeof(int));

    unsigned int size = 1;

    Test("Test5", vecNumbers, size, vecExpected);
}

// 滑动窗口的大小等于数组的长度
void Test6() {
    int num[] = {10, 14, 12, 11};
    vector<int> vecNumbers(num, num + sizeof(num) / sizeof(int));

    int expected[] = {14};
    vector<int> vecExpected(expected, expected + sizeof(expected) / sizeof(int));

    unsigned int size = 4;

    Test("Test6", vecNumbers, size, vecExpected);
}

// 滑动窗口的大小为0
void Test7() {
    int num[] = {10, 14, 12, 11};
    vector<int> vecNumbers(num, num + sizeof(num) / sizeof(int));

    vector<int> vecExpected;

    unsigned int size = 0;

    Test("Test7", vecNumbers, size, vecExpected);
}

// 滑动窗口的大小大于输入数组的长度
void Test8() {
    int num[] = {10, 14, 12, 11};
    vector<int> vecNumbers(num, num + sizeof(num) / sizeof(int));

    vector<int> vecExpected;

    unsigned int size = 5;

    Test("Test8", vecNumbers, size, vecExpected);
}

// 输入数组为空
void Test9() {
    vector<int> vecNumbers;
    vector<int> vecExpected;

    unsigned int size = 5;

    Test("Test9", vecNumbers, size, vecExpected);
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

    return 0;
}
```

---

## 面试题 59（二）：队列的最大值
题目：给定一个数组和滑动窗口的大小，请找出所有滑动窗口里的最大值。例如，如果输入数组{2, 3, 4, 2, 6, 2, 5, 1}及滑动窗口的大小3，那么一共存在6个滑动窗口，它们的最大值分别为{4, 4, 6, 6, 6, 5}.

---

```cpp
#include <bits/stdc++.h>

using namespace std;

template<typename T>
class QueueWithMax {
public:
    QueueWithMax() : currentIndex(0) {
    }

    void push_back(T number) {
        while (!maximums.empty() && number >= maximums.back().number)
            maximums.pop_back();

        InternalData internalData = {number, currentIndex};
        data.push_back(internalData);
        maximums.push_back(internalData);

        ++currentIndex;
    }

    void pop_front() {
        if (maximums.empty())
            throw "queue is empty";

        if (maximums.front().index == data.front().index)
            maximums.pop_front();

        data.pop_front();
    }

    T max() const {
        if (maximums.empty())
            throw "queue is empty";

        return maximums.front().number;
    }

private:
    struct InternalData {
        T number;
        int index;
    };

    deque<InternalData> data;
    deque<InternalData> maximums;
    int currentIndex;
};

// ====================测试代码====================
void Test(const char *testName, const QueueWithMax<int> &queue, int expected) {
    if (testName != nullptr)
        printf("%s begins: ", testName);

    if (queue.max() == expected)
        printf("Passed.\n");
    else
        printf("FAILED.\n");
}

int main(int argc, char *argv[]) {
    QueueWithMax<int> queue;
    // {2}
    queue.push_back(2);
    Test("Test1", queue, 2);

    // {2, 3}
    queue.push_back(3);
    Test("Test2", queue, 3);

    // {2, 3, 4}
    queue.push_back(4);
    Test("Test3", queue, 4);

    // {2, 3, 4, 2}
    queue.push_back(2);
    Test("Test4", queue, 4);

    // {3, 4, 2}
    queue.pop_front();
    Test("Test5", queue, 4);

    // {4, 2}
    queue.pop_front();
    Test("Test6", queue, 4);

    // {2}
    queue.pop_front();
    Test("Test7", queue, 2);

    // {2, 6}
    queue.push_back(6);
    Test("Test8", queue, 6);

    // {2, 6, 2}
    queue.push_back(2);
    Test("Test9", queue, 6);

    // {2, 6, 2, 5}
    queue.push_back(5);
    Test("Test9", queue, 6);

    // {6, 2, 5}
    queue.pop_front();
    Test("Test10", queue, 6);

    // {2, 5}
    queue.pop_front();
    Test("Test11", queue, 5);

    // {5}
    queue.pop_front();
    Test("Test12", queue, 5);

    // {5, 1}
    queue.push_back(1);
    Test("Test13", queue, 5);

    return 0;
}
```
