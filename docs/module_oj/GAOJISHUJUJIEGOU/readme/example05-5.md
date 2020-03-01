# 【例 5-5】动态排名（ranking.???）

## 问题描述
对于一个长度为 n 的数列 a，你需要高效第维护如下两种操作：

（1）修改，将某个数 a[i] 改为制定的值 t；

（2）查询，询问区间 [i,j] 中第 k 小的数字是多少。

## 输入格式
输入数据第一行包含两个整数 n 和 m，其中 1 <= n <= 50000，1 <= m <= 10000，分别代表数列的长度以及指令数。

接下来一行 n 个数，代表这个数列。

接下来 m 行。如果是查询操作，那么会以 “Q i j k” 的形式给出；如果是修改操作，那么会以 “C i t” 的形式给出。

## 输出格式
对于每个查询，输出一行一个整数，对应查询的结果。

## 输入样例
```
5 3
3 2 1 4 7
Q 1 4 3
C 2 6
Q 2 5 3
```

## 输出样例
```
3
6
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;

struct splaytree {
    int data, num, lnum;
    splaytree *lch, *rch, *father;
};
struct segmentnode {
    int l, r;
    splaytree *link;
    segmentnode *lch, *rch;
};

const int maxn = 50005;
int a[maxn];
segmentnode *T;

void leftrotate(splaytree *x) {
    splaytree *y = x->father;
    x->lnum = x->lnum + y->lnum + y->num;
    y->rch = x->lch;
    if (x->lch) {
        x->lch->father = y;
    }
    x->father = y->father;
    if (y->father) {
        if (y == y->father->lch) {
            y->father->lch = x;
        } else {
            y->father->rch = x;
        }
    }
    y->father = x;
    x->lch = y;
}

void rightrotate(splaytree *x) {
    splaytree *y = x->father;
    y->lnum = y->lnum - x->num - x->lnum;
    y->lch = x->rch;
    if (x->rch) {
        x->rch->father = y;
    }
    x->father = y->father;
    if (y->father) {
        if (y == y->father->lch) {
            y->father->lch = x;
        } else {
            y->father->rch = x;
        }
    }
    y->father = x;
    x->rch = y;
}

void splay(segmentnode *p, splaytree *x) {
    while (x->father) {
        splaytree *y = x->father;
        if (y->father == 0) {
            if (x == y->lch) {
                rightrotate(x);
            } else {
                leftrotate(x);
            }
        } else {
            if (y == y->father->lch) {
                if (x == y->lch) {
                    rightrotate(y);
                    rightrotate(x);
                } else {
                    leftrotate(x);
                    rightrotate(x);
                }
            } else {
                if (x == y->rch) {
                    leftrotate(y);
                    leftrotate(x);
                } else {
                    rightrotate(x);
                    leftrotate(x);
                }
            }
        }
    }
    p->link = x;
}

void make(segmentnode *p, int k) {
    splaytree *x = p->link, *y = 0;
    if (x == 0) {
        x = new splaytree;
        x->data = k;
        x->num = 1;
        x->lnum = 0;
        x->lch = 0;
        x->rch = 0;
        x->father = 0;
        p->link = x;
    } else {
        while (x) {
            y = x;
            if (k < x->data) {
                x->lnum = x->lnum + 1;
                x = x->lch;
            } else if (k == x->data) {
                x->num = x->num + 1;
                break;
            } else {
                x = x->rch;
            }
        }
        if (x == 0) {
            x = new splaytree;
            x->data = k;
            x->num = 1;
            x->lnum = 0;
            x->lch = 0;
            x->rch = 0;
            x->father = y;
            if (k < y->data) {
                y->lch = x;
            } else {
                y->rch = x;
            }
        }
        splay(p, x);
    }
}

void build(segmentnode *p, int l, int r) {
    p->l = l;
    p->r = r;
    p->link = 0;
    if (r - l > 1) {
        p->lch = new segmentnode;
        build(p->lch, l, (l + r) / 2);
        p->rch = new segmentnode;
        build(p->rch, (l + r) / 2, r);
        for (int i = l; i < r; ++i) {
            make(p, a[i]);
        }
    } else {
        p->lch = 0;
        p->rch = 0;
        make(p, a[l]);
    }
}

int count(splaytree *x, int k) {
    int num = 0;
    while (x) {
        if (x->data < k) {
            num = num + x->lnum + x->num;
            x = x->rch;
        } else {
            x = x->lch;
        }
    }
    return num;
}

int ask(segmentnode *p, int l, int r, int k) {
    if (l <= p->l && p->r <= r) {
        return count(p->link, k);
    } else {
        int t1 = 0, t2 = 0;
        if (l < (p->l + p->r) / 2) {
            t1 = ask(p->lch, l, r, k);
        }
        if (r > (p->l + p->r) / 2) {
            t2 = ask(p->rch, l, r, k);
        }
        return t1 + t2;
    }
}

splaytree *max(splaytree *x) {
    while (x->rch) {
        x = x->rch;
    }
    return x;
}

splaytree *find(splaytree *x, int k) {
    while (x) {
        if (k < x->data) {
            x = x->lch;
        } else if (k == x->data) {
            return x;
        } else {
            x = x->rch;
        }
    }
    return 0;
}

void del(segmentnode *p, int l, int r, int k) {
    splaytree *x = find(p->link, k);
    splay(p, x);
    if (x->num > 1) {
        x->num = x->num - 1;
    } else {
        if (x->lch == 0) {
            p->link = x->rch;
            if (p->link) {
                p->link->father = 0;
            }
        } else {
            x->lch->father = 0;
            splaytree *y = max(x->lch);
            splay(p, y);
            y->rch = x->rch;
            if (x->rch) {
                x->rch->father = y;
            }
            p->link = y;
        }
    }
    if (l <= p->l && p->r <= r) return;
    if (l < (p->l + p->r) / 2) {
        del(p->lch, l, r, k);
    }
    if (r > (p->l + p->r) / 2) {
        del(p->rch, l, r, k);
    }
}

void insert(segmentnode *p, int l, int r, int k) {
    make(p, k);
    if (l <= p->l && p->r <= r) return;
    if (l < (p->l + p->r) / 2) {
        insert(p->lch, l, r, k);
    }
    if (r > (p->l + p->r) / 2) {
        insert(p->rch, l, r, k);
    }
}

void clear(splaytree *x) {
    if (x->lch) {
        clear(x->lch);
    }
    if (x->rch) {
        clear(x->rch);
    }
    delete x;
}

void clean(segmentnode *p) {
    if (p->lch) {
        clean(p->lch);
    }
    if (p->rch) {
        clean(p->rch);
    }
    clear(p->link);
    delete p;
}

int main() {

    int n, m;
    scanf("%d %d", &n, &m);

    for (int i = 1; i <= n; ++i) {
        scanf("%d", &a[i]);
    }
    getchar();

    T = new segmentnode;
    build(T, 1, n + 1);
    for (int i = 1; i <= m; ++i) {
        char ch = getchar();
        if (ch == 'Q') {
            int x, y, k;
            scanf("%d %d %d", &x, &y, &k);
            int l = 0, r = 1000000000, mid = 0;
            while (l <= r) {
                mid = (l + r) / 2;
                int s1 = ask(T, x, y + 1, mid), s2 = ask(T, x, y + 1, mid + 1);
                if (s2 < k) {
                    l = mid + 1;
                } else if (s1 < k && s2 >= k) {
                    break;
                } else {
                    r = mid - 1;
                }
            }
            printf("%d\n", mid);
            getchar();
        } else {
            int x, k;
            scanf("%d %d", &x, &k);
            del(T, x, x + 1, a[x]);
            a[x] = k;
            insert(T, x, x + 1, k);
            getchar();
        }
    }
    clean(T);

    return 0;
}
```