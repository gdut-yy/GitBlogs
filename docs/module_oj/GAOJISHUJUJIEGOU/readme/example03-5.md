# 【例 3-5】猴王（monkey.???）
## 问题描述

很久很久以前，一个广阔的森林里住着 n 只好斗的猴子。起初，他们各干各的，互相之间也不了解。但是这些并不能避免猴子们之间的争论，当然，这只存在与两只陌生猴子之间。当两只猴子争论时，它们都会请自己最强壮的朋友来代表自己进行决斗。显然，决斗之后，这两只猴子以及它们的朋友就互相了解了，这些猴子之间再也不会发生争论了，即使它们曾经发生过冲突。

假设每一只猴子都有一个强壮值，每次决斗后都会减少一半（比如 10 会变成 5，5 会变成 2）。并且我们假设每只猴子都很了解自己，猴品都很好，就是说，当它属于所有朋友中最强壮的一个时，他会自己站出来，走向决斗场。
## 输入格式

输入分为两部分。

第一部分，第一行有一个整数 n（n<=100000），代表猴子总数。接下来的 n 行，每行一个数表示每只猴子的强壮值（小于等于 32767）。

第二部分，第一行有一个整数 m(m<=100000)，表示有 m 次冲突会发生。接下来的 m 行，每行包含两个数 x 和 y，代表第 x 个猴子和第 y 个猴子之间发生冲突。
## 输出格式

输出每次决斗后在它们所有朋友中的最大强壮值。数据保证所有猴子决斗前彼此不认识。
## 输入样例
```
5
20
16
10
10
4
4
2 3
3 4
3 5
1 5
```
## 输出样例
```
8
5
5
10
```

----

```cpp
#include <bits/stdc++.h>
#define maxn 200000
using namespace std;

struct Node {
    int key, dist;
    Node *lch, *rch, *parent;
} LT[maxn + 1];

Node *p, *q, *A, *B;

int n, i, j, x, m, y;

int getDist(Node *A) {
    if (A == NULL)
        return (-1);
    else
        return (A->dist);
}

// 合并操作
Node *MERGE(Node *A, Node *B) {
    if (A == NULL)
        return (B);
    if (B == NULL)
        return (A);
    if (A->key < B->key)
        swap(A, B);
    A->rch = MERGE(A->rch, B);
    if (A->rch != NULL)
        A->rch->parent = A;
    if (A->lch != NULL)
        A->lch->parent = A;
    if (getDist(A->lch) < getDist(A->rch))
        swap((A->lch), (A->rch));
    A->dist = getDist(A->rch) + 1;
    return (A);
}

// 查找一只猴子所在的堆，并返回堆头
Node *getRoot(int x) {
    Node *q;
    q = &LT[x];
    while (q->parent != NULL)
        q = q->parent;
    return q;
}

// 一个单独结点的左偏树
void _clear(Node *p) {
    p->key /= 2;
    p->lch = NULL;
    p->rch = NULL;
    p->dist = 0;
    p->parent = NULL;
}

// 一只猴子单独构成一棵左偏树
Node *first(int x) {
    Node *p;
    p->key = x;
    p->lch = NULL;
    p->rch = NULL;
    p->dist = 0;
    p->parent = NULL;
    return p;
}

int main() {

    scanf("%d", &n);
    for (int i = 1; i <= n; ++i) {
        scanf("%d", &x);
        // 初始化，每只猴子单独构成一棵左偏树
        LT[i] = *first(x);
    }
    scanf("%d", &m);
    for (int i = 1; i <= m; ++i) {  // 每次决斗的处理
        scanf("%d %d", &x, &y);     // 输入两只猴子编号
        // 找到两个堆头
        p = getRoot(x);
        q = getRoot(y);
        // 通过合并操作，删除 A 根结点
        A = MERGE(p->lch, p->rch);
        if (A != NULL)
            A->parent = NULL;
        // 通过合并操作，删除 B 根结点
        B = MERGE(q->lch, q->rch);
        if (B != NULL)
            B->parent = NULL;
        // 单独处理两个根结点形成的左偏树
        _clear(p);
        _clear(q);
        p = MERGE(p, q);
        A = MERGE(A, B);
        A = MERGE(A, p);
        printf("%d\n", A->key);
    }
    return 0;
}
```