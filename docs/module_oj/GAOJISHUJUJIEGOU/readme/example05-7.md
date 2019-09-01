# 【例 5-7】取牌游戏（mousetrap.???）

## 问题描述
MouseTrap 是一个简单的牌类游戏。游戏刚开始有 K 张牌，每个牌具有唯一的在 1 到 K 之间的标号。牌朝下放置。游戏过程中，你将从顶部取出一张牌，然后放到底部；与此同时，你将记录取的牌的数量（包括顶部的牌）。如果发现取的牌的数量与顶部的那张牌的点数一样，那么顶部的牌就可以被取走了，此时需要重置你的计数为 0。

现在的问题是，请你安排一种方案，使得标记为 i 的牌是第 i 个被取走的。不过由于问题规模太大，你只需要告诉我一些比较关系的牌放在哪个位置就可以了。

## 输入格式
输入第一行包含一个整数 k（1 <= k <= 1000000），代表牌的数量。

第二行的第一个数为整数 n（1 <= n <= 100），代表询问的次数；

接下来的 n 个数，每个数 di 都是在 1 到 k 之间，代表询问的标号。

## 输出格式
输出仅一行，共 n 个整数。第 i 个数代表询问的牌 di 应该在哪个位置。

## 输入样例
```
5
5 1 2 3 4 5
```

## 输出样例
```
1 3 2 5 4
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;

#define MAXN 1200000

struct node {
    int l, r, lc, rc, v;
};

class line_tree {
public:
    int root, z;
    node p[11 * MAXN];

    void set() {
        root = z = -1;
    }

    void build(int &k, int l, int r) {
        k = ++z;
        p[k].l = l;
        p[k].r = r;
        p[k].lc = p[k].rc = -1;
        p[k].v = r - l + 1;
        if (l != r) {
            build(p[k].lc, l, (l + r) / 2);
            build(p[k].rc, (l + r) / 2 + 1, r);
        }
    }

    int left(int &k, int tag) {
        if (tag == p[k].r) return p[k].v;
        if (tag <= p[p[k].lc].r) {
            return left(p[k].lc, tag);
        } else {
            return p[p[k].lc].v + left(p[k].rc, tag);
        }
    }

    int insert(int &k, int tag) {
        p[k].v--;
        if (p[k].l == p[k].r) return p[k].r;
        if (tag > p[p[k].lc].v) {
            return insert(p[k].rc, tag - p[p[k].lc].v);
        } else {
            return insert(p[k].lc, tag);
        }
    }
};

int ans[MAXN];
line_tree t;

int main() {
    int k, n;
    scanf("%d", &k);
    t.set();
    t.build(t.root, 1, k);
    ans[t.insert(t.root, 1)] = 1;
    int last = 1;
    for (int i = 2; i <= k; i++) {
        int left = t.left(t.root, last);
        last = t.insert(t.root, (i + left - 1) % (k - i + 1) + 1);
        ans[last] = i;
    }
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        int x;
        scanf("%d", &x);
        printf(" %d", ans[x]);
    }
    printf("\n");
    return 0;
}
```