# 例 2-9 前缀（topo.???）

## 问题描述
给你一个字符串集合，请从中找出一些字符串，使得找出来的这些字符串的最长公共前缀与字符串数的总个数的乘积最大化，并输出这个最大值。
## 输入格式
输入文件的第一行给出字符串个数 n（1 <= n <= 1000000），下面 n 行描述这 n 个字符串，每个字符串长度不超过 20000；输入文件大小在 10 MB以内。
## 输出格式
输出文件一行一个整数，代表最大化的结果。
## 输入样例
	7
	Jora de Sus
	Orhei
	Jora de Mijloc
	Joreni
	Jora de Jos
	Japca
	Orheiul Vechi
## 输出样例
	24

----

```cpp
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


```

----
## 拓展加强

如果将输入数据加大到 30 MB，单词数量最多为 20000 个，时间限制为 5 秒，空间限制仍是 256 MB，怎么做呢？

我们发现，数据限制改变后使得孩子兄弟表示法无法满足空间要求。但是，我们发现单词量很少，只有 20000 个，而且时间限制也适当放宽了。所以，如果使用压缩的字典树，就只有 20000 个结点，可以使空间要求降低到 30 MB 左右，完全符合题目要求，具体实现见以下参考程序。

----

```cpp
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

```
