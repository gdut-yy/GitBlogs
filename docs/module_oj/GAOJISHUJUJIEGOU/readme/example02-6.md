# 例 2-6 数星星

## 问题描述
夜空中有 n 颗恒星（n <= 100000），每颗恒星的坐标为（x，y），0 <= x,y <= 32000.现在，天文学家要对这些恒星进行分类，分类的标准如下：对于任意一颗恒星 S（x，y），如果存在 k 颗恒星，其 x，y 坐标均不大于 S，则恒星 S 属于 k 类星。

现按 y-x 升序（y 坐标为第一关键字，x 坐标为第二关键字）给出 n 颗恒星的坐标，要求统计出 0~n-1 类星的个数。给出数据保证不存在两颗星拥有相同的坐标。
## 输入格式
第一行一个整数 N，表示恒星个数。

接下来 N 行，每行两个整数 x，y，表示一颗恒星的坐标。
## 输出格式
输出 N 行，第 i 行一个整数，表示一颗恒星的坐标。
## 样例输入
	5
	1 1
	5 1
	7 1
	3 3
	5 5
## 样例输出
	1
	2
	1
	1
	0

----

```cpp
#include <bits/stdc++.h>

using namespace std;

// 最大恒星数
const int maxstars = 100000;
// 恒星坐标
int st1_x[maxstars], st1_y[maxstars];
int st2_x[maxstars], st2_y[maxstars];
// 记录每类星的个数
int st[maxstars + 1];
// 线性有序表
int c[maxstars + 1];
// 恒星数量
int n;

// 判断 n1、n2 是否为 x-y 升序
bool smaller(int n1_x, int n1_y, int n2_x, int n2_y) {
    if(n1_x < n2_x | (n1_x == n2_x && n1_y < n2_y))
        return true;
    else
        return false;
}

// 快速排序过程（x-y 升序）
void qsort(int l, int r) {
    int i, j;
    int x_x, x_y;
    int temp_x, temp_y;
    int mid = (l + r) / 2;
    i = l;
    j = r;
    x_x = st2_x[mid];
    x_y = st2_y[mid];
    while(i <= j) {
        while(smaller(st2_x[i], st2_y[i], x_x, x_y) == true)
            i++;
        while(smaller(x_x, x_y, st2_x[j], st2_y[j]) == true)
            j--;
        if(i <= j) {
            temp_x = st2_x[i];
            temp_y = st2_y[i];
            st2_x[i] = st2_x[j];
            st2_y[i] = st2_y[j];
            st2_x[j] = temp_x;
            st2_y[j] = temp_y;
            i++;
            j--;
        }
    }
    if(l < j)
        qsort(l, j);
    if(i < r)
        qsort(i, r);
}

void initialize() {
    int i;
    cin >> n;
    for(i = 1; i <= n; i++) {
        cin >> st1_x[i] >> st1_y[i];
        st2_x[i] = st1_x[i];
        st2_y[i] = st1_y[i];
    }
    qsort(1, n);
}

// 统计过程
void solve() {
    int i, l, r, m, ld, temp;
    temp = n;
    for(i = 0; i < maxstars; i++) {
        st[i + 1] = 0;
        c[i + 1] = 0;
    }
    n = temp;
    for(i = 1; i <= n; i++) {
        l = 1;
        r = n;
        ld = 0;
        // 二分查找
        while(l < r) {
            m = (l + r) / 2;
            if(smaller(st2_x[m], st2_y[m], st1_x[i], st1_y[i])) {
                ld = ld + c[m + 1];
                l = m + 1;
            } else {
                c[m + 1]++;
                r = m;
            }
        }
        st[ld + 1]++;
    }
    for(i = 0; i < n; i++) {
        cout << st[i + 1] << endl;
    }
}

int main() {
    initialize();
    solve();
    return 0;
}

```