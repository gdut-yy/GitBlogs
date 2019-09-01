# 【例 5-2】火星探险（mars.???）

## 问题描述
在 2051 年，若干火星探险队探索了这颗红色行星的不同区域并且制作了这些区域的地图。现在，Baltic 空间机构有一个雄心勃勃的计划，他们想制作一张整个行星的地图。为了考虑必要的工作，他们需要知道地图上已经存在的全部区域的大小。你的任务是写一个计算这个区域大小的程序。

具体要求为：

（1）从输入文件 mars.in 读取地图形状的描述
（2）计算地图覆盖的全部的区域
（3）输出到文件 mars.out 中。
## 输入格式
输入文件的第一行包含一个整数 n（1 <= n <= 10000），表示可得到的地图数目。

以下 n 行，每行描述一张地图。每行包含 4 个整数 x1，y1，x2 和 y2（0 <= x1 < x2 <= 30000，0 <= y1 < y2 <= 30000）。数值（x1，y1）和（x2，y2）是坐标，分别表示绘制区域的左上角和右下角坐标。每张地图是矩形的，并且它的边是平行于 x 坐标轴或 y 坐标轴的。

## 输出格式
输出文件包含一个整数，表示探索区域的总面积（即所有矩形的公共面积）。

## 输入样例
```
2
10 10 20 20
15 15 25 30
```

## 输出样例
```
225
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;

const int maxsize = 80010;

struct node {
    int st;
    int ed;
    int c; // 区间被覆盖的层数
    int m; // 区间的测度
} ST[maxsize];

struct line {
    int x; // 直线横坐标
    int y1; // 直线上的下面的纵坐标
    int y2; // 直线上的上面的纵坐标
    // s=1 表示直线为矩形的左边，s=0 表示直线为矩形的右边
    bool s;
} Line[maxsize];

// y[] 为整数与浮点数的对应数组，ty[] 为用来求 y[] 的辅助数组
int y[maxsize], ty[maxsize];

void build(int root, int st, int ed) {
    ST[root].st = st;
    ST[root].ed = ed;
    ST[root].c = 0;
    ST[root].m = 0;
    if (ed - st > 1) {
        int mid = (st + ed) / 2;
        build(root * 2, st, mid);
        build(root * 2 + 1, mid, ed);
    }
}

inline void update(int root) {
    if (ST[root].c > 0) {
        // 将线段树上区间的端点分别映射到 y[] 数组所对应的浮点数上，由此计算出测度
        ST[root].m = y[ST[root].ed - 1] - y[ST[root].st - 1];
    } else if (ST[root].ed - ST[root].st == 1) {
        ST[root].m = 0;
    } else {
        ST[root].m = ST[root * 2].m + ST[root * 2 + 1].m;
    }
}

void insert(int root, int st, int ed) {
    if (st <= ST[root].st && ST[root].ed <= ed) {
        ST[root].c++;
        update(root);
        return;
    }
    int mid = (ST[root].ed + ST[root].st) / 2;
    if (st < mid) {
        insert(root * 2, st, ed);
    }
    if (ed > mid) {
        insert(root * 2 + 1, st, ed);
    }
    update(root);

}

void Delete(int root, int st, int ed) {
    if (st <= ST[root].st && ST[root].ed <= ed) {
        ST[root].c--;
        update(root);
        return;
    }
    int mid = (ST[root].ed + ST[root].st) / 2;
    if (st < mid) {
        Delete(root * 2, st, ed);
    }
    if (ed > mid) {
        Delete(root * 2 + 1, st, ed);
    }
    update(root);
}

int indexs[30010];

bool cmp(line l1, line l2) {
    return l1.x < l2.x;
}

int main() {
    int n, num;
    scanf("%d", &n);
    for (int i = 0; i < n; ++i) {
        int x1, x2, y1, y2;
        scanf("%d %d %d %d", &x1, &y1, &x2, &y2);
        Line[2 * i].x = x1;
        Line[2 * i].y1 = y1;
        Line[2 * i].y2 = y2;
        Line[2 * i].s = 1;

        Line[2 * i + 1].x = x2;
        Line[2 * i + 1].y1 = y1;
        Line[2 * i + 1].y2 = y2;
        Line[2 * i + 1].s = 0;

        ty[2 * i] = y1;
        ty[2 * i + 1] = y2;
    }
    n <<= 1;
    sort(Line, Line + n, cmp);
    sort(ty, ty + n);
    y[0] = ty[0];

    // 处理数组 ty[] 使之不含重复元素，得到新的数组存放到数组 y[] 中
    for (int i = num = 1; i < n; ++i) {
        if (ty[i] != ty[i - 1]) {
            y[num++] = ty[i];
        }
    }
    for (int i = 0; i < num; ++i) {
        indexs[y[i]] = i;
    }
    build(1, 1, num);

    // 树的叶结点与数组 y[] 中的元素个数相同，以便建立一一对应的关系
    long long area = 0;
    for (int i = 0; i < n - 1; ++i) {
        int l = indexs[Line[i].y1] + 1, r = indexs[Line[i].y2] + 1;

        // 插入矩形的左边
        if (Line[i].s) {
            insert(1, l, r);
        }
            // 删除矩形的右边
        else {
            Delete(1, l, r);
        }
        area += (long long) ST[1].m * (long long) (Line[i + 1].x - Line[i].x);
    }

    cout << area << endl;
    return 0;
}
```
