# 【例 5-3】栅栏（fence.???）

## 问题描述
Farmer John 为奶牛们设置了一个障碍赛。障碍赛中有 n 个（n <= 50000）各种长度的栅栏，每个都与 x 轴平行，其中第 i 个栅栏的 y 坐标为 i。

终点在坐标原点（0，0），起点在（s，n）。

奶牛们很笨拙，它们都是绕过栅栏而不是跳过去的。也就是说它们会沿着栅栏走直到走到栅栏头，然后向着 x 轴奔跑，直到碰到下一个栅栏拦住去路，然后再绕过去……

如果按照这种方法，奶牛们从起点到终点需要走的最短距离是多少呢？（当然，平行于 y 轴的距离就不用计算了，因为这个数总是等于 n）。
## 输入格式
输入数据的第一行是两个整数 n 和 s，其中 s 的绝对值不超过 100000.

接下来 n 行，每行两个整数 ai 和 bi，代表第 i 个栅栏的两个端点的横坐标。其中， -100000 <= ai < bi <= 100000，an <= s <= bn。

## 输出格式
输出仅一个整数，代表 x 轴方向所需要走的最短距离。

## 输入样例
```
4 0
-2 1
-1 2
-3 0
-2 1
```

## 输出样例
```
4
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;

const int maxn = 50005;
const int inf = 2147483647 / 2;

struct node {
    int f[2];
    int l, r;
    bool lazy;
    node *lch, *rch;
};

node *T;
int a[maxn], b[maxn];

void build(node *p, int l, int r) {
    p->l = l;
    p->r = r;
    p->f[0] = p->f[1] = inf;
    p->lazy = false;

    if (r - l > 1) {
        p->lch = new node;
        build(p->lch, l, (l + r) / 2);
        p->rch = new node;
        build(p->rch, (l + r) / 2, r);
    } else {
        p->lch = p->rch = nullptr;
    }
}

void update(node *p) {
    p->lazy = false;
    p->lch->lazy = p->rch->lazy = true;
    for (int i = 0; i < 2; ++i) {
        p->lch->f[i] = p->rch->f[i] = p->f[i];
    }
}

void insert(node *p, int l, int r, int tmp, int data, bool brute) {
    if (l <= p->l && p->r <= r) {
        if (data < p->f[tmp] || brute) {
            p->f[tmp] = data;
            p->lazy = true;
        }
    } else {
        if (p->lazy) {
            update(p);
        }
        if (l < (p->l + p->r) / 2) {
            insert(p->lch, l, r, tmp, data, brute);
        }
        if (r > (p->l + p->r) / 2) {
            insert(p->rch, l, r, tmp, data, brute);
        }
        p->f[tmp] = min(p->lch->f[tmp], p->rch->f[tmp]);
    }
}

int find(node *p, int l, int r, int tmp) {
    if (l <= p->l && p->r <= r) {
        return p->f[tmp];
    } else {
        int t1 = inf, t2 = inf;
        if (p->lazy) update(p);
        if (l < (p->l + p->r) / 2) {
            t1 = find(p->lch, l, r, tmp);
        }
        if (r > (p->l + p->r) / 2) {
            t2 = find(p->rch, l, r, tmp);
        }
        return min(t1, t2);
    }
}

int main() {
    int l = inf, r = -inf;
    int n, s;
    scanf("%d %d", &n, &s);

    for (int i = n; i >= 1; --i) {
        scanf("%d %d", &a[i], &b[i]);
        if (a[i] < l)l = a[i];
        if (b[i] > r)r = b[i];
    }

    T = new node;
    build(T, l, r + 1);
    insert(T, s, s + 1, 0, -s, false);
    insert(T, s, s + 1, 1, s, false);

    for (int i = 1; i <= n; ++i) {
        int t1 = find(T, l, a[i] + 1, 0);
        int t2 = find(T, a[i], r + 1, 1);
        int k = min(t1 + a[i], t2 - a[i]);

        insert(T, a[i], a[i] + 1, 0, k - a[i], false);
        insert(T, a[i], a[i] + 1, 1, k + a[i], false);

        t1 = find(T, l, b[i] + 1, 0);
        t2 = find(T, b[i], r + 1, 1);
        k = min(t1 + b[i], t2 - b[i]);

        insert(T, b[i], b[i] + 1, 0, k - b[i], false);
        insert(T, b[i], b[i] + 1, 1, k + b[i], false);
        if (a[i] + 1 < b[i]) {
            insert(T, a[i] + 1, b[i], 0, inf, true);
            insert(T, a[i] + 1, b[i], 1, inf, true);
        }
    }
    int t1 = find(T, l, 1, 0);
    int t2 = find(T, 0, r + 1, 1);
    printf("%d\n", min(t1, t2));

    return 0;
}
```