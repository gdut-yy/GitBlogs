# 例 2-5 约瑟夫问题

## 问题描述
用二叉排序树解决经典约瑟夫问题。如输入 n=8，m=3，输出从 1 开始报数依次出列的序列：3 6 1 5 2 8 4 7。

## 样例输入
	8 3
## 样例输出
	3 6 1 5 2 8 4 7

----

```cpp
#include <bits/stdc++.h>

using namespace std;

struct node {
    struct node *l, *r;
    int key, s;
    bool del;
} *root;

void make_tree(int l, int r, struct node *&x) {
    int mid = (l + r) / 2;
    x = new struct node;
    x->key = mid;
    x->del = 0;
    x->l = x->r = NULL;
    x->s = r - l + 1;
    if(l <= mid - 1) {
        make_tree(l, mid - 1, x->l);
    }
    if(mid + 1 <= r) {
        make_tree(mid + 1, r, x->r);
    }
}

void del(int no, struct node *x) {
    x->s--;
    if(!x->del && (!x->l && no == 1 || x->l && no == x->l->s + 1)) {
        x->del = 1;
        printf("%d ", x->key);
    } else {
        if(!x->l)
            del(no - !x->del, x->r);
        else if(no > x->l->s + !x->del)
            del(no - x->l->s - !x->del, x->r);
        else
            del(no, x->l);
    }
}

int main() {
    int n, m, j = 0;
    scanf("%d%d", &n, &m);
    make_tree(1, n, root);
    for(int i = n; i >= 1; i--) {
        j = (j + m - 1) % i + 1;
        del(j, root);
        j--;
    }
    return 0;
}

```