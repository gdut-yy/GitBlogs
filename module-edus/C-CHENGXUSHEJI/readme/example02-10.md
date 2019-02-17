# 例 2-10 图书管理（tsgl.???）

## 问题描述
图书管理是一件十分繁杂的工作，图书馆中每天都会有许多新书加入。为了更方便地管理图书（以便于帮助想要借书的客人快速查找是否有他们所需要的书），我们需要设计一个图书查找系统，该系统需要支持两种操作：

（1）add(s)，表示新加入一本书名为 s 的图书；

（2）find(s)，表示查询是否存在一本书名为 s 的图书。
## 输入格式
第一行包括一个正整数 n（n<=10000），表示操作数。

以下 n 行，每行给出两种操作中的一种，指令格式为：

add s   
find s

在书名 s 与指令（add、find）之间有一个空格隔开，我们保证所有书名的长度都不超过 200。可以假设读入数据是准确无误的。
## 输出格式
对于每个 find(s) 指令，我们必须对应地输出一行 yes 或 no，表示当前所查询的书是否存在于图书馆内。注意：开始时图书馆内是没有一本图书的，并且对于相同字母但大小写不同的书名，我们认为它们是不同的书。
## 输入样例
	4
	add Inside C#
	find Effective Java
	add Effective Java
	find Effective Java
## 输出样例
	no
	yes

----

```cpp
#include <bits/stdc++.h>

using namespace std;

struct node {
    char c;
    vector<struct node*> s;
    bool tag;
} *root = new struct node;

void add(string str) {
    struct node *p = root;
    for(int i = 0; i < str.length(); i++) {
        int j;
        for(j = 0; j < p->s.size(); j++) {
            if(p->s[j]->c == str[i])
                break;
        }
        if(j == p->s.size()) {
            struct node * newNode = new struct node;
            newNode->c = str[i];
            newNode->s.clear();
            newNode->tag = 0;
            p->s.push_back(newNode);
            p = newNode;
        } else
            p = p->s[j];
    }
    p->tag = 1;
}

int query(string str) {
    struct node *p = root;
    for(int i = 0; i < str.length(); i++) {
        int j;
        for(j = 0; j < p->s.size(); j++) {
            if(p->s[j]->c == str[i])
                break;
        }
        if(j == p->s.size())
            return 0;
        p = p->s[j];
    }
    return p->tag;
}

int main() {
    int t;
    cin >> t;
    root->s.clear();
    while(t--) {
        string tag, str;
        scanf("%s", tag.c_str());
        getline(cin, str);
        if(tag[0] == 'a')
            add(str);
        else
            puts(query(str) ? "yes" : "no");
    }
    return 0;
}

```
