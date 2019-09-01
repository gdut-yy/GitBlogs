# 【例 5-1】数列（queue.???）

## 问题描述

一个简单的数列问题：给定一个长度为 n 的数列，求这样的三个元素 ai,aj,ak 的个数，满足 ai < aj > ak，且 i < j < k。
## 输入格式

第一行是一个整数 n（1 <= n <= 50000）。

接下来 n 行，每行一个元素 ai（0 <= ai <= 32767）.
## 输出格式

一个数，满足 ai < aj > ak（i < j < k）的个数。
## 输入样例
```
5
1
2
3
4
1
```
## 输出样例
```
6
```

----

```cpp
#include <bits/stdc++.h>

typedef long long ll;
#define INF 1<<30
#define MAXN 60000
#define MAXM 32767

using namespace std;

struct Node {
    int l, r, lc, rc, v;
};

int root, z;
Node p[11 * MAXM];

void _set() {
    root = z = -1;
}

void _build(int &k, int l, int r) {
    k = ++z;
    p[k].l = l;
    p[k].r = r;
    p[k].lc = p[k].rc = -1;
    p[k].v = 0;
    if (l != r) {
        _build(p[k].lc, l, (l + r) / 2);
        _build(p[k].rc, (l + r) / 2 + 1, r);
    }
}

void _insert(int &k, int tag) {
    p[k].v++;
    if (p[k].lc == -1)
        return;
    if (tag <= p[p[k].lc].r)
        _insert(p[k].lc, tag);
    else
        _insert(p[k].rc, tag);
}

int _search(int &k, int tag) {
    if (tag == p[k].r)
        return p[k].v;
    if (tag > p[p[k].lc].r)
        return p[p[k].lc].v + _search(p[k].rc, tag);
    else
        return _search(p[k].lc, tag);
}

int a[MAXN];
int l[MAXN], r[MAXN];

int main() {
    int n;
    scanf("%d", &n);
    _set();
    _build(root, 0, MAXM);
    for (int i = 1; i <= n; ++i) {
        scanf("%d", &a[i]);
        if (a[i] != 0)
            l[i] = _search(root, a[i] - 1);
        _insert(root, a[i]);
    }
    _set();
    _build(root, 0, MAXM);
    for (int i = n; i >= 1; --i) {
        if (a[i] != 0) {
            r[i] = _search(root, a[i] - 1);
        }
        _insert(root, a[i]);
    }
    ll ans = 0;
    for (int i = 1; i <= n; ++i) {
        ans += (ll) l[i] * r[i];
    }
    cout << ans << endl;
    return 0;
}
```
