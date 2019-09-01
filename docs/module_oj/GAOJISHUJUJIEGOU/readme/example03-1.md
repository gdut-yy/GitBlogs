# 【例 3-1】投票点（ballot.???）
## 问题描述
某国正在进行轰轰烈烈的领导人大选。由于该国是民主投票决定领导人，每一位成年公民都有选举权，因此需要再城市中设置投票点来统计票数。

现在有 N（1 <= N <= 1000）个城市，共有 M（N <= M <= 5000）个投票点需要被放置到这些城市中，每一个城市都至少有一个投票点。每个城市的选民被平均分配到这个城市的各个投票点。为了让统计票数出错的概率最低，因此要使被分配到选民的人数最多的投票点的选民人数越少越好。输出所有投票点钟分配到最多选民的人数。

## 输入格式
第一行两个整数 n,m，表示有 n 个城市，m 个投票点，两个整数用空格隔开。

接下来 n 行，每行一个整数 ai，表示每个城市的选民数量。

## 输出格式
输出一行一个整数，表示一个投票点被分配到最多选民的人数。

## 样例输入
```
4 6
120
2680
3400
200
```

## 样例输出
```
1700
```

## 样例说明
4 个城市的投票点个数分别为 1、2、2、1

----

```cpp
#include <bits/stdc++.h>

using namespace std;

#define maxn 500010
#define LL long long

struct node {
    int num;
    int p;
};
node a[maxn];
int n, m, cnt;


int main() {
    scanf("%d %d", &n, &m);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i].p);
        a[i].num = 1;
    }
    m -= n;
    for (int i = 0; i < m; i++) {
        cnt = 0;
        for (int j = 1; j < n; j++) {
            if ((LL) a[cnt].p * (LL) a[j].num < (LL) a[cnt].num * (LL) a[j].p) {
                cnt = j;
            }
        }
        a[cnt].num++;
    }
    cnt = 0;
    for (int i = 1; i < n; i++) {
        if ((LL) a[cnt].p * (LL) a[i].num < (LL) a[cnt].num * (LL) a[i].p) {
            cnt = i;
        }
    }
    int ans = a[cnt].p / a[cnt].num;
    if (a[cnt].p % a[cnt].num != 0) {
        ans++;
    }
    printf("%d\n", ans);

    return 0;
}
```