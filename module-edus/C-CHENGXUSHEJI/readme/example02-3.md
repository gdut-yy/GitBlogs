# 例 2-3 下一棵树

## 问题描述
农场有 n（1 <= n <= 1000）棵树。在上过“数据结构”课程后，小 Y 发现所有的树实际上都是严格二叉树，二叉树的每个非叶结点都恰好有两个子结点，小 Y 按照先序遍历的思想把和结点相关的数列出作为它的特征序列。但是，他只列出了与根结点和所有的左子结点相关的数。例如下图所示的树，用 * 表示的是小 Y 列出的结点，这棵树的特征序列为：（7 4 1 2 1 1 1）。在用这种方法表示完所有的树后，小 Y 发现：


（1）所有的树有相同多的叶结点；

（2）所有的树有不同的特征序列；

（3）所有可能的严格二叉树都在农场里。

所以，小 Y 决定把这些特征序列排序，然后希望给出一棵树的特征序列，求出紧接着的一棵树的特征序列。

	     *7
	    /   \
	  *4     *3
	  / \    / \
	 /   \  /   \
    *1   3 *1   2
	    / \    / \
	   *2  1  *1  1
	   / \ 
	  *1  1
## 输入格式
输入文件共两行，第一行为 n 的值，表示特征序列的长度。

第二行为 n 个用空格隔开的数，表示一棵树的特征序列。
## 输出格式
输出文件只有一行，表示按字典顺序排序后所给序列的后一个序列。如果所给序列是最后一个序列输出 0。记住：输入和输出序列代表的树要有相同的叶节点树。
## 输入样例
	5
	5 3 2 1 1
## 输出样例
	5 4 1 1 1

----

```cpp
#include <bits/stdc++.h>

using namespace std;

const long maxn = 1000;
long link[maxn];
long data[maxn];
long full[2 * maxn];
long ftop, length, i, j;

// 根据给出的先序遍历的部分结果，退出整棵树的先序遍历
void build() {
    long _stack[maxn];
    long stop = 0;
    for(i = 2; i <= length; i++) {
        // 如果存在右子树，则让右子树的根结点进入堆栈
        if((full[ftop] - data[i]) > 0) {
            stop++;
            _stack[stop] = full[ftop] - data[i];
        }
        ftop++;
        full[ftop] = data[i];
        link[i] = ftop;
        // 如果当前结点是叶子结点，则让右子树的根结点出栈。
        while(full[ftop] == 1) {
            ftop++;
            full[ftop] = _stack[stop];
            stop--;
        }
    }
}

// 求解并输出
void solve() {
    i = length;
    while((full[link[i] - 1] - full[link[i]]) < 2 && (i > 1)) {
        i--;
    }
    if(i == 1) {
        cout << 0;
    } else {
        for(j = 1; j <= i - 1; j++) {
            // 把找到的结点的值加1，其后的结点的值都变为1
            cout << data[j] << " ";
        }
        cout << data[i] + 1;
        for(j = i + 1; j <= length; j++) {
            cout << " 1";
        }
    }
}

int main() {
    cin >> length;
    for(i = 1; i <= length; i++) {
        cin >> data[i];
    }
    /*
    printf("%d\n", length);
    for(int i = 1; i <= length; i++) {
        printf("%d\n", data[i]);
    }
    */
    full[1] = data[1];
    link[1] = 1;
    ftop = 1;
    build();
    solve();
    return 0;
}

```