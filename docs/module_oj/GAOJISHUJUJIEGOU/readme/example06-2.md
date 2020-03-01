# 【例 6-2】矩阵操作（matrix.???）

## 问题描述
给定一个 n\*n 的矩阵 A，其中每个元素不是 0 就是 1。A[i，j] 表示在第 i 行、第 j 列的数，初始时，A[i，j] = 0（1 <= i, j <= n）。

我们可以按照如下方式改变矩阵：给定一个左上角在（x1，y1）、右下角在（x2，y2）的矩阵，通过使用 “not” 操作改变这个矩形内的所有元素值（元素 0 变成 1，元素 1 变成 0）。为了维护矩阵的信息，你需要写个程序来接收并且执行以下两个操作：

（1）C x1 y1 x2 y2（1 <= x1 <= x2 <= n，1 <= y1 <= y2 <= n），代表改变左上角为（x1，y1）、右下角为（x2，y2）的矩形区域的值。

（2）Q x y（1 <= x，y <= n），代表询问 A[x，y] 的值。

## 输入格式
第一行两个整数 n 和 T（2 <= n <= 1000，1 <= T <= 50000），分别代表矩阵的尺寸和操作数。

接下来 T 行，每行包含一条指令，以 “C x1 y1 x2 y2” 或者 “Q x y” 的形式给出，具体描述如上。

## 输出格式
对于每个询问操作，输出一行一个整数，代表对应格子的值。

## 输入样例
```
2 10
C 2 1 2 2
Q 2 2
C 2 1 2 1
Q 1 1
C 1 1 2 1
C 1 2 1 2
C 1 1 2 2
Q 1 1
C 1 1 2 1
Q 2 1
```

## 输出样例
```
1
0
0
1
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;

const int maxn = 1005;

int sum[maxn][maxn], n;

inline int lowbit(int x) {
    return (x & -x);
}

void Change(int x, int y, int delta) {
    int ty = y;
    while (x <= n) {
        y = ty;
        while (y <= n) {
            sum[x][y] += delta;
            y += lowbit(y);
        }
        x += lowbit(x);
    }
}

int Query(int x, int y) {
    int ty = y, ans = 0;
    while (x) {
        y = ty;
        while (y) {
            ans += sum[x][y];
            y -= lowbit(y);
        }
        x -= lowbit(x);
    }
    return ans;
}

int main() {
    int T;
    scanf("%d %d\n", &n, &T);
    memset(sum, 0, sizeof(sum));
    for (int i = 1; i <= T; ++i) {
        char ch = getchar();
        int x1, x2, y1, y2;
//        scanf("%c", &ch);
        if (ch == 'C') {
            scanf("%d %d %d %d", &x1, &y1, &x2, &y2);
            Change(x1, y1, 1);
            Change(x1, y2 + 1, 1);
            Change(x2 + 1, y1, 1);
            Change(x2 + 1, y2 + 1, 1);
            getchar();
        } else {
            scanf("%d %d", &x1, &y1);
            printf("%d\n", Query(x1, y1) & 1);
            getchar();
        }
    }
    return 0;
}
```