#include <bits/stdc++.h>

using namespace std;
#define NN 10485761

struct letter {
    char d;
    // 用数组模拟链表
    int son, bro, cnt;
};
char line[32768];
int n, best = 0, gs = 0;
letter tr[NN];

// 本题只需插入，查找的过程类似
void _insert(char s[]) {
    int len = strlen(s);
    int now = 0;
    for(int i = 0; i < len; i++) {
        tr[now].cnt++;
        if(tr[now].cnt * i > best)
            best = tr[now].cnt * i;
        if(tr[now].son == 0) {
            tr[++gs].d = s[i];
            tr[gs].son = 0;
            tr[gs].bro = 0;
            tr[gs].cnt = 0;
            tr[now].son = gs;
            now = gs;
        } else {
            now = tr[now].son;
            while(tr[now].d != s[i] && tr[now].bro > 0) {
                now = tr[now].bro;
            }
            if(tr[now].d != s[i]) {
                tr[++gs].d = s[i];
                tr[gs].son = 0;
                tr[gs].bro = 0;
                tr[gs].cnt = 0;
                tr[now].bro = gs;
                now = gs;
            }
        }
    }
    tr[now].cnt++;
    if(tr[now].cnt * len > best) {
        best = tr[now].cnt * len;
    }
}

int main() {
    //gets(line);
    //scanf(line, "%d", &n);
    //printf("%d",n);
    cin >> n;
    tr[0].son = 0;
    tr[0].cnt = 0;
    tr[0].bro = 0;
    for(int i = 0; i < n + 1; i++) {
        cin.getline(line, 20000);
        _insert(line);
    }
    printf("%d\n", best);

    return 0;
}
