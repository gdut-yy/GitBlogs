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
