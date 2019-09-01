# 【例 3-4】木板（frame.???）
## 问题描述
给你 n 块单位宽度的木板，每块木板的长度是 L[i]，每块木板的中间都有一个空槽，空槽必须挂在 P[i] 处的钉子上。

现在，要你选出尽可能多的木板并将它们安排在一条直线上，使得任意两块木板不相交（一块包含另外一块当然也是禁止的，不过边界相碰是允许的）。空槽两端忽略不计，钉子也非常细，可以安装在木板的边界，也就是说木板的左端点可能位置是 P[i]-L[i] 至 P[i]。没有两个钉子在同一个位置。

## 输入格式
第一行一个整数 n，代表木板的数量（1 <= n <= 100000）。

接下来每一行包括两个整数 L[i] 和 P[i]（1 <= L[i],P[i] <= 10000000），代表第 i 块木板的长度，以及相关的钉子的位置。没有两个钉子会在同一位置。


## 输出格式
输出一行一个整数，代表你可以选择的最多的木板数。

## 样例输入
```
7
5 9
2 17
6 10
3 11
2 16
4 13
5 6
```

## 样例输出
```
5
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;

const int maxn = 100005;
const int inf = 2147483647;

struct frame {
    int l;
    int p;
};

class cmp_p {
public:
    bool operator()(frame i, frame j) {
        return i.p > j.p;
    }
};

class cmp_l {
public:
    bool operator()(frame i, frame j) {
        return i.l > j.l;
    }
};

priority_queue<frame, vector<frame>, cmp_p> q_p;
priority_queue<frame, vector<frame>, cmp_l> q_l;

bool cmp(frame i, frame j) {
    return i.p < j.p;
}

frame a[maxn];

int main() {

    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; ++i) {
        scanf("%d %d", &a[i].l, &a[i].p);
    }
    while (!q_p.empty()) {
        q_p.pop();
    }
    while (!q_l.empty()) {
        q_l.pop();
    }
    sort(a + 1, a + n + 1, cmp);

    int ans = 1, pre = a[1].p;
    for (int i = 2; i <= n; ++i) {
        if (a[i].p > a[i].l + pre) {
            q_p.push(a[i]);
        } else {
            q_l.push(a[i]);
        }
    }
    while (1) {
        int t1 = inf, t2 = inf;
        frame k;
        while (!q_p.empty()) {
            k = q_p.top();
            if (k.p < pre) {
                q_p.pop();
                continue;
            }
            if (k.p < k.l + pre) {
                q_l.push(k);
                q_p.pop();
            } else {
                break;
            }
        }
        if (!q_p.empty()) {
            t1 = q_p.top().p;
        }
        while (!q_l.empty()) {
            k = q_l.top();
            if (k.p < pre) {
                q_l.pop();
            } else {
                break;
            }
        }
        if (!q_l.empty()) {
            t2 = q_l.top().l + pre;
        }
        if (t1 == t2 && t1 == inf) {
            break;
        }
        ans++;
        if (t1 < t2) {
            pre = q_p.top().p;
            q_p.pop();
        } else {
            pre = q_l.top().l + pre;
            q_l.pop();
        }
    }
    printf("%d\n", ans);

    return 0;
}
```