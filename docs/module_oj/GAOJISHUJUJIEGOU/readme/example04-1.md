# 【例 4-1】亲戚（relation.???）

## 问题描述
或许你并不知道，你的某个朋友是你的亲戚。他可能是你的曾祖父的外公的女婿的外甥女的表姐的孙子。如果能得到完整的家谱，判断两个人是否是亲戚应该是可行的，但如果两个人的最近公共祖先与他们相隔好几代，使得家谱十分庞大，那么检验亲戚关系实非人力所能及。在这种情况下，最好的帮手就是计算机。

为了将问题简化，你将得到一些亲戚关系的信息，如 Marry 和 Tom 是亲戚，Tom 和 Ben 是亲戚等，从这些信息中，你可以推出 Marry 和 Ben 是亲戚。请写一个程序，对于我们的关于亲戚关系的提问，以最快的速度给出答案。

## 输入格式
输入由两部分组成。

第一部分的第一行是以空格隔开的 n，m。n 为问题涉及的人数（1 <= n <= 20000），这些人的编号为 1，2，3，……，n。下面有 m 行（1 <= m <= 1000000），每行有两个数 ai 和 bi ，表示已知 ai 和 bi 是亲戚。

第二部分的第一行为 q，表示提问次数（1 <= 1 <= 1000000）。下面的 q 行每行有两个数 ci 和 di，表示询问 ci 和 di 是否为亲戚。

## 输出格式
对于每个提问，输出一行，若 ci 和 di 为亲戚，则输出 “Yes”，否则输出 “No”。

## 输入样例
```
10 7
2 4
5 7
1 3
8 9
1 2
5 6
2 3
3
3 4
7 10
8 9
```

## 输出样例
```
Yes
No
Yes
```

----

### 1）数组实现
```cpp
#include <bits/stdc++.h>

#define maxn 20020

using namespace std;

struct eletype {
    int rank;
    int father;
};
eletype opt[maxn];

void mdf(int r1, int r2) {
    int path[maxn];
    int k = 0;
    do {
        k++;
        path[k] = r1;
        r1 = opt[r1].father;
    } while (r1 != opt[r1].father); // 查找 r1 所属集合的代表

    // 路径压缩优化，把这个路径上的点全部指向根结点
    for (int i = 1; i < k - 1; ++i) {
        opt[path[i]].father = r1;
    }
    k = 0;
    do {
        k++;
        path[k] = r2;
        r2 = opt[r2].father;
    } while (r2 != opt[r2].father);
    for (int i = 1; i < k - 1; ++i) {
        opt[path[i]].father = r2;
    }

    // r1 和 r2 已属于同一集合，则退出；否则做合并操作
    if (r1 == r2) {
        return;
    }
    // 采用按秩合并
    if (opt[r1].rank < opt[r2].rank) {
        opt[r1].father = r2;
        opt[r2].rank += opt[r1].rank;
    } else {
        opt[r2].father = r1;
        opt[r1].rank += opt[r2].rank;
    }
}

void work() {
    int m, n, x, y, q;
    scanf("%d %d", &n, &m);

    // 初始化
    for (int i = 1; i <= n; ++i) {
        opt[i].father = i;
        opt[i].rank = 1;
    }
    for (int i = 1; i <= m; ++i) {
        scanf("%d %d", &x, &y);
        mdf(x, y); // 建立关联
    }
    scanf("%d", &q);
    for (int i = 1; i <= q; ++i) {
        scanf("%d %d", &x, &y);
        do {
            x = opt[x].father;
        } while (x != opt[x].father); // 查找 x 所属集合的代表
        do {
            y = opt[y].father;
        } while (y != opt[y].father); // 查找 y 所属集合的代表
        if (opt[x].father == opt[y].father) {
            printf("Yes\n");
        } else {
            printf("No\n");
        }
    }
}

int main() {
    work();
    return 0;
}
```
### 2）链表实现
```cpp
#include <bits/stdc++.h>

#define maxn 20020

using namespace std;

struct rec {
    int next;
    int head;
    int tail;
    int num;
} a[maxn];
int h1, h2, m, n, x, y, Q;

void makeset(int x) {
    a[x].next = 0;
    a[x].head = x;
    a[x].tail = x;
    a[x].num = 1;
}

int findhead(int x) {
    return a[x].head;
}

void merge(int h1, int h2) {
    int p;
    a[a[h1].tail].next = h2;
    a[h1].tail = a[h2].tail;
    a[h1].num = a[h1].num + a[h2].num;
    a[h2].head = h1;
    a[h2].tail = 0;
    a[h2].num = 0;
    p = a[h2].next;
    while (p) {
        a[p].head = h1;
        p = a[p].next;
    }
}

int main() {
    scanf("%d %d", &n, &m);
    for (int i = 1; i <= n; ++i) {
        makeset(i);
    }
    for (int i = 1; i <= m; ++i) {
        scanf("%d %d", &x, &y);
        h1 = findhead(x);
        h2 = findhead(y);
        if (h1 != h2) {
            if (a[h1].num > a[h2].num) {
                merge(h1, h2);
            } else {
                merge(h2, h1);
            }
        }
    }
    scanf("%d", &Q);
    for (int i = 1; i <= Q; ++i) {
        scanf("%d %d", &x, &y);
        if (findhead(x) == findhead(y)) {
            printf("Yes\n");
        } else {
            printf("No\n");
        }
    }
    return 0;
}
```

### 3）树实现
```cpp
#include <bits/stdc++.h>

#define maxn 20020

using namespace std;

int a[maxn];
int r1, r2, m, n, x, y, Q;

int findroot(int x) {
    int path[maxn];
    int k = 0;
    int root = x;
    while (a[root] != root) {
        path[++k] = root;
        root = a[root];
    }
    for (int i = 1; i < k; ++i) {
        a[path[i]] = root;
    }
    return root;
}

void merge(int r1, int r2) {
    a[r2] = r1;
}

int main() {
    scanf("%d %d", &n, &m);
    for (int i = 1; i <= n; ++i) {
        a[i] = i;
    }
    for (int i = 1; i <= m; ++i) {
        scanf("%d %d", &x, &y);
        r1 = findroot(x);
        r2 = findroot(y);
        if (r1 != r2) {
            merge(r1, r2);
        }
    }
    scanf("%d", &Q);
    for (int i = 1; i <= Q; ++i) {
        scanf("%d %d", &x, &y);
        if (findroot(x) == findroot(y)) {
            printf("Yes\n");
        } else {
            printf("No\n");
        }
    }
    return 0;
}
```