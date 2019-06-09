# 【例 6-1】逆序对（inversions.???）

## 问题描述

给你 n 个整数，每个数 a[i] 都是不超过 10^9 的非负整数。求其中逆序对的个数，即所有这样的数对（i,j）满足 1 <= i < j <= n 且 a[i] > a[j]。
## 输入格式

第一行一个正整数 n（1 <= n <= 100000），代表数字的个数。

接下来一行 n 个整数，代表带出来的数列。
## 输出格式

一行一个整数，代表逆序对的个数。
## 输入样例
```
5
2 3 1 5 4
```
## 输出样例
```
3
```

----

```cpp
#include <bits/stdc++.h>

const int MAXN = 100000;
typedef long long ll;
using namespace std;

struct node {
    ll v;
    int id;

    bool operator<(const node &p) const {
        return v < p.v;
    }
};

node a[MAXN + 10];
ll b[MAXN + 10];
ll c[MAXN + 10];
int n;

inline int lowbit(int x) {
    return x & -x;
}

ll query(int x) {
    ll ans = 0;
    while (x) {
        ans += c[x];
        x -= lowbit(x);
    }
    return ans;
}

void change(int x) {
    while (x <= n) {
        c[x]++;
        x += lowbit(x);
    }
}

int main() {
    scanf("%d", &n);
    memset(a, 0, sizeof(a));
    memset(b, 0, sizeof(b));
    memset(c, 0, sizeof(c));
    for (int i = 1; i <= n; i++) {
        scanf("%lld", &(a[i].v));
        a[i].id = i;
    }
    sort(a + 1, a + n + 1);
    int pre = -1;
    int prevalue = 0;
    for (int i = 1; i <= n; i++) {
        if (pre != a[i].v) {
            pre = a[i].v;
            a[i].v = ++prevalue;
        } else
            a[i].v = prevalue;
    }
    for (int i = 1; i <= n; i++) {
        b[a[i].id] = a[i].v;
    }
    ll s = 0;
    for (int i = n; i >= 1; i--) {
        change(b[i]);
        s += query(b[i] - 1);
    }
    cout << s << endl;
    return 0;
}
```