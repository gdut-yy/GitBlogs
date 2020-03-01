# 【例 4-3】最近公共祖先问题（LCA.???）

## 问题描述
给定一棵有根树，询问树中某两个结点的公共祖先中离根最远的一个的编号。例如图，若询问结点 4 和 9，则回答 2。

```
       1
     /  \
    /    \
   2       3
  / \     / \
 /   \   /   \
4     5 6     7
     / \   
    8   9 
```

## 输入格式
第一行一个整数 n，表示树的结点数。

接下来 n 行，每行一个整数 fi，第 i+1 行的数表示 i 结点的父结点编号。父结点编号为 0 的结点为根。

第 n+2 行一个整数 m，表示问题数。

接下来 m 行，每行两个数 xi 和 yi，表示询问 xi 和 yi 的公共祖先中离根最远的一个的编号。

## 输出格式
输出 m 行，按输入顺序给出询问的答案。

## 输入样例
```
9
0
1
1
2
2
3
3
5
5
1
4 9
```

## 输出样例
```
2
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;

#define maxn 150015
#define maxm 150015

struct node {
    int code;
    int data;
    node *next;
} a[maxn], question[maxm];
int x, y, n, m, root, f[maxn], ans[maxm];
bool visited[maxn];

void push(int x, int y) {
    node *p = new node;
    p->data = y;
    p->next = a[x].next;
    a[x].next = p;
    a[x].data++;
}

void addque(int x, int y, int z) {
    node *p = new node;
    p->data = y;
    p->next = question[x].next;
    p->code = z;
    question[x].next = p;
    question[x].data++;
}

int find(int x) {
    if (f[x] != x) {
        f[x] = find(f[x]);
    }
    return f[x];
}

void search(int x) {
    node *p;
    visited[x] = true;
    p = question[x].next;
    for (int i = 1; i <= question[x].data; ++i) {
        if (visited[p->data]) {
            ans[p->code] = find(f[p->data]);
            p = p->next;
        }
    }
    p = a[x].next;
    for (int i = 1; i <= a[x].data; ++i) {
        search(p->data);
        f[p->data] = x;
        p = p->next;
    }
}

int main() {
    scanf("%d", &n);
    for (int i = 1; i <= n; ++i) {
        a[i].data = 0;
        a[i].next = NULL;
    }

    for (int i = 1; i <= n; ++i) {
        scanf("%d", &x);
        if (x) {
            push(x, i);
        } else {
            root = i;
        }
    }
    for (int i = 1; i <= m; ++i) {
        question[i].data = 0;
        question[i].next = NULL;
    }

    scanf("%d", &m);
    for (int i = 1; i <= m; ++i) {
        scanf("%d %d", &x, &y);
        addque(x, y, i);
        addque(y, x, i);
    }
    memset(visited, 0, sizeof(visited));
    for (int i = 1; i <= n; ++i) {
        f[i] = i;
    }
    search(root);
    for (int i = 1; i <= m; ++i) {
        printf("%d\n", ans[i]);
    }

    return 0;
}
```