# 例 2-2 二叉树的遍历

## 问题描述
输入一棵二叉树的先序和中序遍历序列，输出其后序遍历序列。
## 输入格式
第一行一个字符串，表示树的先序遍历。

第二行一个字符串，表示树的中序遍历。树的结点一律用小写字母表示。
## 输出格式
输出一行，表示树的后续遍历序列。
## 输入样例
	abdec
	dbeac
## 输出样例
	debca

----

```cpp
#include <bits/stdc++.h>

using namespace std;

char s1[10000], s2[10000];

int posi(char ch) {
    for(int i = 0; i < strlen(s2); i++) {
        if(ch == s2[i])
            return i;
    }
}

// 递归后求后序遍历序列
void tryit(int l1, int r1, int l2, int r2) {
    // 求 s1 的首字符在 s2 中的位置
    int m = posi(s1[l1]);
    // 遍历第 m 个的左半边
    if(m > l2) {
        tryit(l1 + 1, l1 + m - l2, l2, m - 1);
    }
    // 遍历第 m 个的右半边
    if(m < r2) {
        tryit(l1 + m - l2 + 1, r1, m + 1, r2);
    }
    printf("%c", s1[l1]);
}

int main() {
    scanf("%s", s1);
    scanf("%s", s2);
    tryit(0, strlen(s1) - 1, 0, strlen(s2) - 1);
    return 0;
}
```