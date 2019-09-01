# 【例 8-1】星际争霸（battle.???） 
## 问题描述

玩《星际争霸》的无限人口版时，我们常常会不顾一切地大肆建造军队以扩充自己的战斗力。当我们每建造出一支部队时，我们总想知道这支部队的战斗力，以便设计出好的战略。你的任务是设计出一个能快速回答一支部队的战斗力强弱问题的程序，部队的战斗力就是这支部队的人数。

我们约定三种操作：

    （1）C num，表示往一个编号为 num 的部队里加一个兵，如果当前还没有编号为 num 的部队，则建立这支部队并添加一个兵；
    （2）D num，表示编号为 num 的部队里一个兵牺牲了，如果此部队里没有兵了，则删掉此部队，如果没有编号为 num 的部队，则忽略此次操作；
    （3）M num1<num2，表示将 num2 里面的兵合并到 num1 中，然后 num2 消失，如果 num1 或 num2 中任意一个不存在，则忽略此次操作。

注意：0 < num, num1, num2 <= 10^12。你最后只需要按要求输出战斗力第 k 强的部队的战斗力。
## 输入格式

第一行为一个整数 n，表示后面的操作命令的总数。

从第二行开始的后 n 行，每行是一条操作命令。

从 n+2 行是一个整数 m，表示有 m 个提问。

第 n+3 行有 m 个用一个空格隔开的数 k1,k2,k3,...kn，也就是提问战斗力第 ki 强的部队编号。注意：可能 ki = kj，也就是说战斗力第 k 强可能被问到两次。

数据中没有多余的空格。
## 输出格式

输出 m 行，每行输出一个战斗力第 ki 强的部队的士兵人数，如果没有第 ki 强的部队，则输出 “NO”。

这里举个例子，如果士兵人数从大到小分别为 7、5、5、3、2，则战斗力第一强大的是 7，第二、第三都为 5，第四为 3，第五为 2。
## 输入样例
```
5
C 4
C 8
M 8<4
D 4
C 5
3
1 2 3
```
## 输出样例
```
2
1
NO
```

----

```cpp
#include <bits/stdc++.h>

#define inf 1 << 30

using namespace std;

struct node {
    struct node *l;
    struct node *r;
    struct node *f;
    int key;
    int priority;
    int tot;
} *root;

// 左旋
void leftrotate(struct node *x) {
    struct node *y = x->f;
    x->f = y->f;
    if (y->f->l == y)
        x->f->l = x;
    else
        x->f->r = x;
    if (x->r)
        x->r->f = y;
    y->l = x->r;
    y->f = x;
    x->r = y;
}

// 右旋
void rightrotate(struct node *x) {
    struct node *y = x->f;
    x->f = y->f;
    if (y->f->l == y)
        x->f->l = x;
    else
        x->f->r = x;
    if (x->l)
        x->l->f = y;
    y->r = x->l;
    y->f = x;
    x->l = y;
}

// 删除
void del(struct node *x) {
    while (x->l || x->r) {
        if (x->l && (x->r && x->l->priority < x->r->priority || !x->r))
            leftrotate(x->l);
        else
            rightrotate(x->r);
    }
    if (x->f->l == x)
        x->f->l = 0;
    else
        x->f->r = 0;
    delete x;
}

// 插入
void ins(struct node *x, int k, int dir, struct node *fa) {
    if (!x) {
        x = new struct node;
        x->key = k;
        x->priority = rand() % inf;
        x->l = x->r = 0;
        x->tot = 1;
        x->f = fa;
        if (dir)
            fa->r = x;
        else
            fa->l = x;
    } else {
        if (k < x->key) {
            ins(x->l, k, 0, x);
            if (x->l->priority < x->priority)
                leftrotate(x->l);
        } else {
            ins(x->r, k, 1, x);
            if (x->r->priority < x->priority)
                rightrotate(x->r);
        }
    }
}

// 查找
struct node *exist(struct node *x, int k) {
    if (x == 0)
        return 0;
    if (x->key == k)
        return x;
    if (k < x->key)
        return exist(x->l, k);
    else
        return exist(x->r, k);
};

vector<int> rating;

bool cmp(int x, int y) {
    return x > y;
}

// 深度优先遍历
void dfs(struct node *x) {
    if (!x)
        return;
    dfs(x->r);
    rating.push_back(x->tot);
    dfs(x->l);
}

int main() {
    int t;
    cin >> t;
    root = new struct node;
    root->l = root->r = root->f = 0;
    while (t--) {
        getchar();
        char tag;
        struct node *tmp;
        int x, y;
        scanf("%c", &tag);
        switch (tag) {
            case 'C':
                scanf("%d", &x);
                tmp = exist(root->l, x);
                if (!tmp)
                    ins(root->l, x, 0, root);
                else
                    tmp->tot++;
                break;
            case 'D':
                scanf("%d", &x);
                tmp = exist(root->l, x);
                if (!tmp)
                    continue;
                if (!--tmp->tot)
                    del(tmp);
                break;
            case 'M':
                scanf("%d<%d", &x, &y);
                struct node *xNode = exist(root->l, x);
                struct node *yNode = exist(root->l, y);
                if (!xNode || !yNode)
                    continue;
                if (xNode == yNode)
                    continue;
                xNode->tot += yNode->tot;
                del(yNode);
                break;
        }
    }
    dfs(root->l);
    // 排序
    sort(rating.begin(), rating.end(), cmp);
    cin >> t;
    while (t--) {
        int x;
        scanf("%d", &x);
        if (x > rating.size())
            printf("NO\n");
        else
            printf("%d\n", rating[x - 1]);
    }
    return 0;
}
```