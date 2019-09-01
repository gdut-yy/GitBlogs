# 【例 3-3】有序表的最小和（element.???）
## 问题描述

给出两个长度为 n 的有序表 A 和 B，在 A 和 B 中各任取一个元素，可以得到 n^2 个和，求这些和中最小的 n 个。
## 输入格式

第一行包含一个整数 n(n<=400000)；

第二行与第三行分别有 n 个整数，分别代表有序表 A 和 B。整数之间由一个空格隔开，大小在长整型范围内，保证有序表的数据单词递增。
## 输出格式

输出共 n 行，每行一个整数，第 i 行为第 i 小的和。数据保证在长整型范围内。
## 输入样例
```
3
1 2 5
2 4 7
```
## 输出样例
```
3
4
5
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;

struct node {
    int sum;
    int no;
};
node heap[400400], tmp;
int a[400400], b[400400], d[400400], n, tot;

void put(int key, int sign) {
    int fa, son;
    node temp;
    tot = tot + 1;
    heap[tot].sum = key;
    heap[tot].no = sign;
    son = tot;
    fa = son / 2;
    while(fa > 0) {
        if(heap[fa].sum > heap[son].sum) {
            temp = heap[fa];
            heap[fa] = heap[son];
            heap[son] = temp;
            son = fa;
            fa /= 2;
        } else
            fa = 0;
    }
}

node getmin() {
    int fa, son;
    node temp, ans;
    ans = heap[1];
    heap[1] = heap[tot];
    tot = tot - 1;
    fa = 1;
    son = fa * 2;
    while(son <= tot) {
        if(son < tot && heap[son].sum > heap[son + 1].sum)
            son++;
        if(heap[fa].sum > heap[son].sum) {
            temp = heap[fa];
            heap[fa] = heap[son];
            heap[son] = temp;
            fa = son;
            son = fa * 2;
        } else
            son = tot + 1;
    }
    return ans;
}

int main() {
    scanf("%d", &n);
    memset(a, 0, sizeof(a));
    memset(b, 0, sizeof(b));
    memset(d, 0, sizeof(d));
    memset(heap, 0, sizeof(heap));
    for(int i = 1; i <= n; i++)
        scanf("%d", &a[i]);
    for(int i = 1; i <= n; i++)
        scanf("%d", &b[i]);
    tot = 0;
    for(int i = 1; i <= n; ++i) {
        d[i]++;
        put(a[i] + b[d[i]], i);
    }
    for(int i = 1; i <= n; ++i) {
        tmp = getmin();
        printf("%d\n", tmp.sum);
        d[tmp.no]++;
        put(a[tmp.no] + b[d[tmp.no]], tmp.no);
    }
    return 0;
}
```