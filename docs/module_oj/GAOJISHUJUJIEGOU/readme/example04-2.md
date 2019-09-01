# 【例 4-2】食物链（eat.???）

## 问题描述#
动物王国中有三类动物 A,B,C，这三类动物的食物链构成了有趣的环形：A 吃 B，B 吃 C，C 吃 A。

现在有 n 个动物，以 1~n 编号。每个动物都是 A,B,C 中的一种，但是我们并不知道它到底是哪一种。有人用 2 种说法对这 N 个动物所构成的食物链关系进行描述：

第一种说法是 “1 X Y”，表示 X 和 Y 是同类。

第二种说法是 “2 X Y”，表示 X 吃 Y。

此人对 n 个动物，用上述两种说法，一句接一句第说出 k 句话，这 k 句话有的是真的，有点是假的。

你从头开始，一句一句地读入这 k 句话。当你读到的话满足下列 3 条之一时，这句话就是假的，否则就是真的。

    （1）当前的话与前面的某句真话冲突；
    （2）当前的话中 X 或 Y 比 n 大；
    （3）当前的话表示 X 吃 X。

你的任务是根据给定的 n（1 <= n <= 50000） 和 k 个条件（0 <= k <= 100000），输出假话的总数。
## 输入格式

输入文件的第一行是两个整数 n 和 k，以一个空格分隔。

以下 k 行，每行是 3 个正整数 D,X,Y，之间用一个空格隔开，其中 D 表示说法的种类，若 D=1，X 和 Y 是同类；若 D = 2，X 吃 Y。
## 输出格式

输出一行一个整数，表示假话的数目。
## 输入样例
```
100 7
1 101 1
2 1 2
2 2 3
2 3 3
1 1 3
2 3 1
1 5 5
```
## 输出样例
```
3
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;

int _set[50100], value[50100], n, k, x, y, d, cnt;

int fa(int id) {
    if (id != _set[id]) {
        int tmp = _set[id];
        _set[id] = fa(_set[id]);
        value[id] = (value[id] + value[tmp]) % 3;
    }
    return _set[id];
}

int main() {
    scanf("%d %d", &n, &k);
    for (int i = 1; i <= n; i++) {
        _set[i] = i;
    }
    for (int i = 0; i < k; i++) {
        scanf("%d %d %d", &d, &x, &y);
        if (x > n || y > n) {
            cnt++;
            continue;
        }
        if (d == 1) {
            if (fa(x) == fa(y)) {
                if (value[x] != value[y]) {
                    cnt++;
                }
            } else {
                value[_set[x]] = (value[y] - value[x] + 3) % 3;
                _set[_set[x]] = _set[y];
            }
        } else {
            if (x == y) {
                cnt++;
                continue;
            }
            if (fa(x) == fa(y)) {
                if (value[x] != (value[y] + 1) % 3) {
                    cnt++;
                }
            } else {
                value[_set[x]] = (value[y] - value[x] + 4) % 3;
                _set[_set[x]] = _set[y];
            }
        }
    }
    for (int i = 1; i <= 10; i++) {
        fa(i);
    }
    cout << cnt << endl;
    return 0;
}
```