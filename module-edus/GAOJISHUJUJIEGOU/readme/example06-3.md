# 【例 6-3】奶牛狂欢节（moofeat.???）

## 问题描述
每年，Farmer John 的 n 头那妞都会参加它们盛大的 节日“MooFest”。由于节日里气氛太热烈了，奶牛们的叫声使得节日结束后一些奶牛的听力收到了影响。

现在有 n 头奶牛，第 i 头奶牛的听力阈值为 v(i)（1 <= v(i) <= 20000），即如果其他奶牛想让这只奶牛听到它的声音，那么至少得发出 v(i) 乘上它们之间距离这么大的音量。所以如果第 i 头奶牛和第 j 头奶牛交谈，那么发出的音量大小至少是它们之间的距离乘上它们两个阈值中的最大值，即 max(v(i),v(j))。

现在这 n 头奶牛站在了一条直线上，每头奶牛都站在唯一的坐标上（在 1 到 20000 之间），并且每对奶牛交谈都尽可能降低音量。那么请你计算着 n\*(n-1)/2对奶牛交谈产生的最小总音量大小。
## 输入格式
输入数据第一行包含一个整数 n（1 <= n <= 20000），代表奶牛的头数。

接下来 n 行，第 i 行两个数，第一个数代表奶牛的听力阈值 v(i)，第二个数代表该奶牛所站的坐标。

## 输出格式
一行一个整数，代表最小的总音量。

## 输入样例
```
4
3 1
2 5
2 6
4 3
```
## 输错样例
```
57
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

const int MAXN = 20000;

struct cow {
    int volumn;
    int loc;
};
cow c[MAXN + 10];
ll sum[MAXN + 10], cnt[MAXN + 10];
int n;

inline int lowbit(int x) {
    return (x & -x);
}

void Change(int x, ll delta, ll(&a)[MAXN + 10]) {
    while (x <= MAXN) {
        a[x] += delta;
        x += lowbit(x);
    }
}

ll Query(int x, ll(&a)[MAXN + 10]) {
    ll ans = 0;
    while (x) {
        ans += a[x];
        x -= lowbit(x);
    }
    return ans;
}

bool cmp(const cow &i, const cow &j) {
    return (i.volumn < j.volumn);
}

int main() {
    memset(sum, 0, sizeof(sum));
    memset(cnt, 0, sizeof(cnt));
    scanf("%d", &n);
    for (int i = 1; i <= n; ++i) {
        scanf("%d %d", &c[i].volumn, &c[i].loc);
    }
    sort(c + 1, c + n + 1, cmp);
    ll total = 0, ans = 0;
    for (int i = 1; i <= n; ++i) {
        ll cnt1 = Query(c[i].loc, cnt), sum1 = Query(c[i].loc, sum);
        ll cnt2 = i - 1 - cnt1, sum2 = total - sum1;
        ans += c[i].volumn * (cnt1 * c[i].loc - sum1 + sum2 - cnt2 * c[i].loc);
        total += c[i].loc;
        Change(c[i].loc, c[i].loc, sum);
        Change(c[i].loc, 1, cnt);
    }
    cout << ans << endl;
    return 0;
}
```