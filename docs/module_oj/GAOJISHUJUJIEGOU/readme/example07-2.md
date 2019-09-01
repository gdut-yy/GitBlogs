# 【例 7-2】船舶停靠（berth.???）
## 问题描述
有一个港口分为 m 个隔舱，每个隔舱都有固定的长度，一条船不能跨越一个或多个隔舱，即一条船只能在一个隔舱内，但每个隔舱能容纳多条船。每条船只占用 1 个单位长度，在隔舱内的船不能交叉或重叠。每条船都有自己的入港和出港时间，作为调度员你可以接受或拒绝船只的停靠，你的任务是使得停靠的船只数量最多。

## 输入格式
第一行为两个整数 m,n（m <= 10，1 <= n <= 100000），m 为隔舱的数量，n 为船的数量。

接下来 m 行，每行一个整数 r 表示隔舱的长度。

最后 n 行每行三个整数 是，s，e，sec（0 <= s <= e，1 <= sec <= m），分别表示入港时间，出港时间以及进入的隔舱。
## 输出格式
输出仅一行一个整数，表示最大可容纳的船只数量。
## 输入样例
```
1 3
2
1 3 1
2 6 1
2 8 1
```
## 输出样例
```
2
```

----

```cpp
#include <bits/stdc++.h>

#define N 100010

using namespace std;

int cnt, r[N], ans;

class SplayNode {
public:
    SplayNode *L, *R, *F;
    int key;

    SplayNode(int k) {
        key = k;
        L = R = F = NULL;
    }

    void leftrotate() {
        SplayNode *y = F;
        F = y->F;
        if (F != NULL) {
            if (F->L == y) {
                F->L = this;
            } else {
                F->R = this;
            }
        }
        if (R != NULL) {
            R->F = y;
        }
        y->L = R;
        y->F = this;
        this->R = y;
    }

    void rightrotate() {
        SplayNode *y = F;
        F = y->F;
        if (F != NULL) {
            if (F->L == y) {
                F->L = this;
            } else {
                F->R = this;
            }
        }
        if (L != NULL) {
            L->F = y;
        }
        y->R = L;
        y->F = this;
        this->L = y;
    }

    static void splay(SplayNode *x, SplayNode *S) {
        SplayNode *SF = S->F;
        while (x->F != SF) {
            SplayNode *y = x->F;
            SplayNode *z = y->F;
            if (z == SF) {
                if (y->L == x) {
                    x->leftrotate();
                } else {
                    x->rightrotate();
                }
            } else {
                if (y->L == x && z->L == y) {
                    y->leftrotate();
                    x->leftrotate();
                } else if (y->L == x && z->R == y) {
                    x->leftrotate();
                    x->rightrotate();
                } else if (y->R == x && z->R == y) {
                    y->rightrotate();
                    x->rightrotate();
                } else {
                    x->rightrotate();
                    x->leftrotate();
                }
            }
        }
    }

    SplayNode *insert(int k) {
        if (k <= key) {
            if (L == NULL) {
                L = new SplayNode(k);
                L->F = this;
                return L;
            } else {
                return L->insert(k);
            }
        } else {
            if (R == NULL) {
                R = new SplayNode(k);
                R->F = this;
                return R;
            } else {
                return R->insert(k);
            }
        }
    }

    SplayNode *max() {
        if (R == NULL) {
            return this;
        }
        return R->max();
    }

    SplayNode *prev(int k) {
        if (key <= k) {
            if (R == NULL) {
                return this;
            }
            SplayNode *tmp = R->prev(k);
            if (tmp == NULL) {
                return this;
            }
            return tmp;
        } else {
            if (L == NULL) {
                return NULL;
            }
            return L->prev(k);
        }
    }

    static SplayNode *join(SplayNode *x, SplayNode *y) {
        SplayNode *p = x->max();
        splay(p, x);
        p->R = y;
        y->F = p;
        return p;
    }

    static SplayNode *deleteNode(SplayNode *x, SplayNode *S) {
        splay(x, S);
        SplayNode *a = x->L;
        SplayNode *b = x->R;
        delete x;
        if (a != NULL) a->F = NULL;
        if (b != NULL) b->F = NULL;
        if (a == NULL) return b;
        if (b == NULL) return a;
        return join(a, b);
    }


};

struct boat {
    int s;
    int e;
    int sec;
} b[N];

int cmp(struct boat A, struct boat B) {

    return (A.sec < B.sec ||
            A.sec == B.sec && A.e < B.e ||
            A.sec == B.sec && A.e == B.e && A.s > B.s);
}

SplayNode *root;

void SplayInsert(int k) {
    if (cnt == 0) {
        root = new SplayNode(k);
    } else {
        SplayNode *tmp = root->insert(k);
        SplayNode::splay(tmp, root);
        root = tmp;
    }
    cnt++;
    ans++;
}

int main() {
    int m, n;
    cin >> m >> n;
    for (int i = 1; i <= m; i++) {
        scanf("%d", &r[i]);
    }
    for (int i = 1; i <= n; i++) {
        scanf("%d %d %d", &b[i].s, &b[i].e, &b[i].sec);
    }
    sort(b + 1, b + n + 1, cmp);
    for (int i = 1; i <= n; i++) {
        if (b[i].sec != b[i - 1].sec) {
            cnt = 0;
            SplayInsert(b[i].e);
        } else {
            SplayNode *pre = root->prev(b[i].s);
            if (pre == NULL) {
                if (cnt < r[b[i].sec]) {
                    SplayInsert(b[i].e);
                } else continue;
            } else {
                root = SplayNode::deleteNode(pre, root);
                cnt--;
                SplayInsert(b[i].e);
            }
        }
    }
    cout << ans << endl;
    return 0;
}
```