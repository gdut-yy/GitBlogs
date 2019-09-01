#include <bits/stdc++.h>

using namespace std;

struct node {
    int st, ed;
    int cnt;
    node *ch[50];
    char _list[50];
    int tot;
};
char _list[10000000], s[20000], re;
node *T = new(node), *tnode;
int n, cmq, len, _size, tmp;

void _clear(node *p) {
    p->st = p->ed = _size;
    p->cnt = 0;
    p->tot = 0;
}

int same(node *p, int st) {
    int i;
    for(i = 0; p->st + i < p->ed && st + i < len && s[st + i] == _list[p->st + i]; i++);
    return i;
}

void diliver(node * &p, int len) {
    node *t = new(node);
    t->tot = p->tot;
    t->st = p->st;
    t->ed = t->st + len;
    t->cnt = 1;
    t->_list[0] = _list[t->ed];
    t->ch[0] = p;
    p->st = t->ed;
    p = t;
}

int _find(node *p, char ch) {
    for(int i = 0; i < p->cnt; i++) {
        if(p->_list[i] == ch)
            return i;
    }
    return -1;
}

void _insert(node * &p, int st) {
    int ll = same(p, st);
    if(ll == p->ed - p->st) {
        p->tot++;
        st = st + ll;
    } else {
        diliver(p, ll);
        p->tot++;
        st = st + ll;
    }
    if(st == len)
        return;
    else {
        tmp = _find(p, s[st]);
        if(tmp != -1) {
            _insert(p->ch[tmp], st);
        } else {
            tnode = new(node);
            p->ch[p->cnt] = tnode;
            p->_list[p->cnt] = s[st];
            p->cnt++;
            _clear(tnode);
            for(int i = st; i < len; i++) {
                _list[tnode->ed++] = s[i];
            }
            _size = tnode->ed;
            tnode->tot = 1;
            return;
        }
    }
}

void dfs(node *p, int ll) {
    ll += p->ed - p->st;
    cmq = max(cmq, ll * p->tot);
    for(int i = 0; i < p->cnt; i++) {
        dfs(p->ch[i], ll);
    }
}

int main() {
    _clear(T);
    scanf("%d\n", &n);
    for(int i = 0; i < n; i++) {
        re = getchar();
        len = 0;
        while(re != '\n') {
            s[len++] = re;
            re = getchar();
        }
        _insert(T, 0);
    }
    dfs(T, 0);
    cout << cmq << endl;
    return 0;
}
