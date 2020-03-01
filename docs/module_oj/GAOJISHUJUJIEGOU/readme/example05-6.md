# 【例 5-6】买票（ticket.???）

## 问题描述
排队买票是一件令人很焦躁的事情。售票窗口前排了一列长队，而且不断有人往前插队。由于天太黑了，人们并不知道有人插队。但是每个人身上有一个标记（不同人的标记可能相同）Vali，并且知道第 i 个人来了队伍之后会走到第 Posi 个人的后面。售票窗口记为第 0 个人，所以走到第 0 个人的后面意味着插到队伍的首端了。

现在，给出以上信息，你能求出最后的 Val 的序列码？

## 输入格式
输入数据第一行包含一个整数 n（1 <= n <= 200000），代表总人数。

接下来 n 行，每行两个整数 Posi 和 Vali，意义见问题描述。其中 Posi ∈ [0, i - 1]，Vali ∈ [0, 32767]。

## 输出格式
输出一行共 n 个整数，代表最后的 Val 的序列。

## 输入样例
```
4
0 20523
1 19243
1 3890
0 31492
```

## 输出样例
```
31492 20523 3890 19243
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;

const int maxn = 400005;
int ans[maxn], data[maxn], pos[maxn];
int lch[maxn], rch[maxn], l[maxn], r[maxn], empty[maxn];
int T, top;

void build(int p, int l_lable, int r_lable) {
    l[p] = l_lable;
    r[p] = r_lable;
    empty[p] = r[p] - l[p];
    if (r[p] - l[p] > 1) {
        lch[p] = ++top;
        build(lch[p], l[p], (l[p] + r[p]) / 2);
        rch[p] = ++top;
        build(rch[p], (l[p] + r[p]) / 2, r[p]);
    } else {
        lch[p] = 0;
        rch[p] = 0;
    }
}

int insert(int p, int pos) {
    empty[p]--;
    if (l[p] + 1 == r[p]) {
        return l[p];
    }
    if (empty[lch[p]] > pos) {
        return insert(lch[p], pos);
    } else {
        return insert(rch[p], pos - empty[lch[p]]);
    }
}

int main() {
    int n;
    scanf("%d", &n);
    top = 0;
    T = ++top;
    build(T, 1, n + 1);
    for (int i = 1; i <= n; ++i) {
        scanf("%d %d", &pos[i], &data[i]);
    }
    for (int i = n; i >= 1; --i) {
        int tmp = insert(T, pos[i]);
        ans[tmp] = data[i];
    }
    for (int i = 1; i < n; ++i) {
        printf("%d ", ans[i]);
    }
    printf("%d\n", ans[n]);
    return 0;
}
```