# 【例 5-4】3D方块（tet.???）

## 问题描述
“俄罗斯方块”游戏的作者想做一个新的三维的版本。在这个版本中长方块会掉到一个矩形的平台上。这些块按照一定的顺序分开落下，就像在二维的游戏中一样。一个块会一直往下掉直到它遇到障碍，比如平台或者另外的已经停下的块，然后这个块会停在当前位置直到游戏结束。

然而，游戏的作者们想改变这个游戏的本质，把它从一个简单的街机游戏编程更有迷惑性的游戏。当知道方块落下的顺序和它们的下落路线后，玩家的任务是在所有块落下停在以后给出最高点的高度。所有的块都是垂直落下的而且在落下的过程中不旋转。为了把问题简单化，我们给平台建立直角坐标系，坐标系的原点在平台的某个角上，轴平行于平台的边。

写一个程序满足下列要求：

（1）从输入中读入接连下落的块的描述；

（2）得出所有块下落停止后最高点的高度；

（3）输出答案。

## 输入格式
第一行有 3 个整数 D，S 和 N（1 <= N <= 20000，1 <= D，S <= 1000），用一个空格分开，分别表示平台的长度和深度以及下落块的个数。

下面 N 行分别描述这 N 个块。每个块的描述包括 5 个数字：d，s，w，x 和 y（1 <= d，0 <= x，d+x <= D，1 <= s，0 <= y，s+y <= S，1 <= w <= 100000），表示一个长度为 d，深度为 s、高度为 w 的块，这个块掉下时以 d\*x 的面为底，并且两边分别与平台两边平行。这样，这个块的顶点在平台上的投影为（x，y），（x+d，y），（x，y+s）和（x+d，y+s）。

## 输出格式
输出有且仅有一个整数，表示最高点的高度。

## 输入样例
```
7 5 4
4 3 2 0 0
3 3 1 3 0
7 1 2 0 3
2 3 3 2 2
```

## 输出样例
```
6
```

----

```cpp
#include <bits/stdc++.h>

using namespace std;

const int MaxN = 1002;

struct SegmentTree {
    struct node {
        int l;
        int r;
        int lch;
        int rch;
        int cover;
        int val;
    } lt[MaxN << 1];

    int tot;

    void create(int L, int R) {
        int p = tot++;
        lt[p].l = L;
        lt[p].r = R;
        lt[p].cover = lt[p].val = 0;
        if (L + 1 == R) {
            lt[p].lch = lt[p].rch = -1;
            return;
        }
        lt[p].lch = tot;
        create(L, (L + R) >> 1);
        lt[p].rch = tot;
        create((L + R) >> 1, R);
    }

    inline void setit(int N) {
        tot = 0;
        create(0, N);
    }

    int get(int p, int L, int R) {
        if (L <= lt[p].l && lt[p].r <= R) {
            return lt[p].val;
        }
        int ret = lt[p].cover, m = (lt[p].l + lt[p].r) >> 1;
        int tmp;
        if (L < m) {
            tmp = get(lt[p].lch, L, R);
            if (tmp > ret) ret = tmp;
        }
        if (R > m) {
            tmp = get(lt[p].rch, L, R);
            if (tmp > ret) ret = tmp;
        }
        return ret;
    }

    int query(int L, int R) {
        return get(0, L, R);
    }

    void add(int p, int L, int R, int h) {
        if (h > lt[p].val) {
            lt[p].val = h;
        }
        if (L <= lt[p].l && lt[p].r <= R) {
            if (h > lt[p].cover) {
                lt[p].cover = h;
            }
            return;
        }
        int m = (lt[p].l + lt[p].r) >> 1;
        if (L < m) add(lt[p].lch, L, R, h);
        if (R > m) add(lt[p].rch, L, R, h);
    }

    void cover(int L, int R, int H) {
        add(0, L, R, H);
    }

};

struct SegmentTree2D {
    struct node {
        int l;
        int r;
        int lch;
        int rch;
        SegmentTree cover, val;
    } lt[MaxN << 1];

    int tot;

    void create(int L, int R, int M) {
        int p = tot++;
        lt[p].l = L;
        lt[p].r = R;
        lt[p].cover.setit(M);
        lt[p].val.setit(M);
        if (L + 1 == R) {
            lt[p].lch = lt[p].rch = -1;
            return;
        }
        lt[p].lch = tot;
        create(L, (L + R) >> 1, M);
        lt[p].rch = tot;
        create((L + R) >> 1, R, M);
    }

    inline void setit(int N, int M) {
        tot = 0;
        create(0, N, M);
    }

    int get(int p, int x1, int x2, int y1, int y2) {
        if (x1 <= lt[p].l && lt[p].r <= x2) {
            return lt[p].val.query(y1, y2);
        }
        int ret = lt[p].cover.query(y1, y2), m = (lt[p].l + lt[p].r) >> 1;
        int tmp;
        if (x1 < m) {
            tmp = get(lt[p].lch, x1, x2, y1, y2);
            if (tmp > ret) ret = tmp;
        }
        if (x2 > m) {
            tmp = get(lt[p].rch, x1, x2, y1, y2);
            if (tmp > ret) ret = tmp;
        }
        return ret;
    }

    int query(int x1, int x2, int y1, int y2) {
        return get(0, x1, x2, y1, y2);
    }

    void add(int p, int x1, int x2, int y1, int y2, int h) {
        lt[p].val.cover(y1, y2, h);
        if (x1 <= lt[p].l && lt[p].r <= x2) {
            lt[p].cover.cover(y1, y2, h);
            return;
        }
        int m = (lt[p].l + lt[p].r) >> 1;
        if (x1 < m) {
            add(lt[p].lch, x1, x2, y1, y2, h);
        }
        if (x2 > m) {
            add(lt[p].rch, x1, x2, y1, y2, h);
        }
    }

    void cover(int x1, int x2, int y1, int y2, int H) {
        add(0, x1, x2, y1, y2, H);
    }
} T;

int N, M, Q;

int main() {
    scanf("%d %d %d", &N, &M, &Q);
    T.setit(N, M);

    int x1, x2, y1, y2, d, s, w, h;
    while (Q--) {
        scanf("%d %d %d %d %d", &d, &s, &w, &x1, &y1);
        x2 = d + x1;
        y2 = s + y1;
        h = T.query(x1, x2, y1, y2);
        T.cover(x1, x2, y1, y2, h + w);
    }
    printf("%d\n", T.query(0, N, 0, M));
    return 0;
}
```
