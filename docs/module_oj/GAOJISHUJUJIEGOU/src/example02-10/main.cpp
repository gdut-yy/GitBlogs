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
