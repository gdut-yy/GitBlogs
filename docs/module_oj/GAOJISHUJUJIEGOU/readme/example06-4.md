# 【例 6-4】数星星（stars.???）

## 问题描述
在一个二维平面中有 n 颗星星，任意两颗星星的坐标不同。现在 Stan 和 Ollie 决定玩如下一个游戏：Stan 首先画一条垂直于 x 轴的直线，这条直线必须至少经过一颗星星，当然也可能会经过几颗星星（它们都有同样的 x 坐标）。接下来，Ollie 画一条垂直于 y 轴的直线，这条直线必须经过一颗被 Stan 所画直线经过的星星。这样，平面就会被划分为如图所示 4 个部分。

其中，右上和左下的星星数是 Stan 的得分，而左上和右下的星星数是 Ollie 的得分。注意，被两条线经过的点都不计算在内。

两个人都尽可能想要获得高分。Stan 想要最大化自己可能的最小得分。这种方案可能不止一个，对于每种方案，Ollie当然也想得到最大的得分。所以你同时也得求出 Ollie 可能的得分。
## 输入格式
第一行一个整数 n（1 <= n <= 20000），代表星星的颗数。

接下来 n 行，每行两个整数 xi 和 yi 代表第 i 颗星星的坐标。坐标绝对值不超过 10^9。

## 输出格式
输出一行若干个整数。

第一个整数代表 Stan 最大化的最小得分。接下来若干个整数，代表满足题目中条件的 Ollie 可能获得的分数。分数升序输出，并且相邻两个整数之间用一个空格隔开。

## 输入样例
```
11
3 2
3 3
3 4
3 6
2 -2
1 -3
0 0
-3 -3
-3 -2
-3 -4
3 -7
```

## 输出样例
```
7 2 3
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;
const int MAXN = 20005;

struct star {
    int x, y;
    int left, right, up, down;
    int xsmall, xlarge, ysmall, ylarge;
    int TL, TR, BL, BR;
};

star a[MAXN];
int X[MAXN], Y[MAXN], xnum[MAXN], ynum[MAXN], xsum[MAXN], ysum[MAXN];
int cnt[MAXN];
set<int> _list;
int n;

void Prepare(int &size, int (&x)[MAXN]) {
    size = 1;
    sort(x + 1, x + n + 1);
    for (int i = 2; i <= n; ++i) {
        if (x[i] != x[i - 1]) {
            x[++size] = x[i];
        }
    }
}

int Rank(int k, int size, int (&a)[MAXN]) {
    int l = 1, r = size;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (a[mid] == k) {
            return mid;
        }
        if (a[mid] < k) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return 0;
}

bool cmp2(const star &i, const star &j) {
    return (i.x < j.x || (i.x == j.x && i.y < j.y));
}

bool cmp1(const star &i, const star &j) {
    return (i.y < j.y || (i.y == j.y && i.x < j.x));
}

inline int lowbit(int x) {
    return (x & -x);
}

void Change(int x, int delta, int size) {
    while (x <= size) {
        cnt[x] += delta;
        x += lowbit(x);
    }
}

int Query(int x) {
    int ans = 0;
    while (x) {
        ans += cnt[x];
        x -= lowbit(x);
    }
    return ans;
}

int main() {
    scanf("%d", &n);
    a[0].x = a[0].y = a[n + 1].x = a[n + 1].y = -1;
    for (int i = 1; i <= n; ++i) {
        scanf("%d %d", &a[i].x, &a[i].y);
        X[i] = a[i].x;
        Y[i] = a[i].y;
    }
    int xSize, ySize;
    Prepare(xSize, X);
    Prepare(ySize, Y);
    memset(xnum, 0, sizeof(xnum));
    memset(ynum, 0, sizeof(ynum));
    for (int i = 1; i <= n; ++i) {
        a[i].x = Rank(a[i].x, xSize, X);
        a[i].y = Rank(a[i].y, ySize, Y);
        xnum[a[i].x]++;
        ynum[a[i].y]++;
    }
    xsum[0] = ysum[0] = 0;
    for (int i = 1; i <= n; ++i) {
        xsum[i] = xsum[i - 1] + xnum[i];
        ysum[i] = ysum[i - 1] + ynum[i];
    }
    for (int i = 1; i <= n; ++i) {
        a[i].xsmall = xsum[a[i].x - 1];
        a[i].xlarge = n - a[i].xsmall - xnum[a[i].x];
        a[i].ysmall = ysum[a[i].y - 1];
        a[i].ylarge = n - a[i].ysmall - ynum[a[i].y];
    }
    sort(a + 1, a + n + 1, cmp1);
    for (int i = 1; i <= n; ++i) {
        if (a[i - 1].y != a[i].y) {
            a[i].left = 0;
        } else {
            a[i].left = a[i - 1].left + 1;
        }
        a[i].right = ynum[a[i].y] - 1 - a[i].left;
    }
    sort(a + 1, a + n + 1, cmp2);
    for (int i = 1; i <= n; ++i) {
        if (a[i - 1].x != a[i].x) {
            a[i].down = 0;
        } else {
            a[i].down = a[i - 1].down + 1;
        }
        a[i].up = xnum[a[i].x] - 1 - a[i].down;
    }

    memset(cnt, 0, sizeof(cnt));
    for (int i = 1; i <= n; ++i) {
        a[i].BL = Query(a[i].y - 1) - a[i].down;
        a[i].TL = a[i].xsmall - a[i].BL - a[i].left;
        a[i].TR = a[i].ylarge - a[i].TL - a[i].up;
        a[i].BR = a[i].ysmall - a[i].BL - a[i].down;
        Change(a[i].y, 1, ySize);
    }

    int ans = 0, pre = 1;
    _list.clear();
    for (int i = 1; i <= n; ++i) {
        if (a[i].x != a[i + 1].x) {
            int stan = n + 1, ollie = 0;
            for (int j = pre; j <= i; ++j) {
                stan = min(stan, a[j].TR + a[j].BL);
                ollie = max(ollie, a[j].TL + a[j].BR);
            }
            if (stan >= ans) {
                if (stan > ans) {
                    ans = stan;
                    _list.clear();
                }
                _list.insert(ollie);
            }
            pre = i + 1;
        }


    }

    printf("%d", ans);
    for (set<int>::iterator it = _list.begin(); it != _list.end(); ++it) {
        printf(" %d", *it);
    }
    printf("\n");
    return 0;
}
```