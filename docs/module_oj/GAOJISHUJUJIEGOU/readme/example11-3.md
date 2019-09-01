# 例 11-3 文本检查（text.???）

## 问题描述
给定一个由英文字母构成的文本，你需要给出从某两个位置的字符开始，能够匹配的最大长度。匹配的过程从左到右，一个字符一个字符进行。

当然，有些时候会在里面插入一些字符。你能胜任这个工作吗？
## 输入格式
第一行一个字符串，代表最开始的文本。

接下来一个整数 n，代表操作数，操作有两类：

（1）I ch p：在当前第 p 个字符前插入一个字符 ch，如果 p 大于当前文本长度，那么将这个字符插在最后面。

（2）Q i j：询问最开始文本中第 i 个字符和第 j 个字符，在现在的文本串中对应位置开始能够匹配的最大长度。

你可以假定最开始的串长度不会超过 5----，插入操作数不会超过 200，询问次数不会超过 20000。
## 输出格式
对于每个询问，输出一行一个整数，代表对应的最大匹配长度。
## 输入样例
	abaab
	5
	Q 1 2
	Q 1 3
	I a 2
	Q 1 2
	Q 1 3
## 输出样例
	0
	1
	0
	3

----

```cpp
#include <bits/stdc++.h>

using namespace std;

// ==> DC3 算法
#define getRealPos() (SA12[pos12] < n0 ? SA12[pos12] * 3 + 1 : (SA12[pos12] - n0) * 3 + 2)
// 二元组排序的比较函数
inline bool cmp(int a1, int a2, int b1, int b2) {
    return (a1 < b1 || (a1 == b1 && a2 <= b2));
}
// 三元组排序的比较函数
inline bool cmp(int a1, int a2, int a3, int b1, int b2, int b3) {
    return (a1 < b1 || (a1 == b1 && cmp(a2, a3, b2, b3)));
}
// 基数排序（对特定位的）
// oldIdx：原后缀数组指针
// newIdx：排序结果数组指针
// origin：对应字符数组指针
// n：排序个数
// upperBound：对字符集离散化之后的范围
void radixSort(int *oldIdx, int *newIdx, int *origin, int n, int upperBound) {
    // 单次桶排序过程
    int *cnt = new int[upperBound + 1];
    for(int i = 0; i <= upperBound; ++i) {
        cnt[i] = 0;
    }
    for(int i = 0; i < n; ++i) {
        cnt[origin[oldIdx[i]]]++;
    }
    for(int i = 0, sum = 0; i <= upperBound; ++i) {
        int tmp = cnt[i];
        cnt[i] = sum;
        sum += tmp;
    }
    for(int i = 0; i < n; ++i) {
        newIdx[cnt[origin[oldIdx[i]]]++] = oldIdx[i];
    }
    delete []cnt;
}
// 构造后缀数组主函数
void suffixArray(int *st, int *SA, int n, int upperBound) {
    // 以下 3 个整数分别为模 3 余 0、1、2 的后缀位置个数
    int n0 = (n + 2) / 3, n1 = (n + 1) / 3, n2 = n / 3, n12 = n0 + n2;
    // 被采样的后缀（即位置模 3 部不为 0 的那些后缀）
    int *s12 = new int[n12 + 3];
    s12[n12] = s12[n12 + 1] = s12[n12 + 2] = 0;
    // 被采样后缀的后缀数组
    int *SA12 = new int[n12 + 3];
    SA12[n12] = SA12[n12 + 1] = SA12[n12 + 2] = 0;
    // 未被采样后缀及其后缀数组（即位置模 3 部为 0 的那些后缀）
    int *s0 = new int [n0];
    int *SA0 = new int[n0];
    // 初始化被采样后缀
    for(int i = 0, j = 0; i < n + (n % 3 == 1); ++i) {
        if(i % 3) {
            s12[j++] = i;
        }
    }
    // 对被采样后缀按照第一个“字符”进行基数排序
    radixSort(s12, SA12, st + 2, n12, upperBound);
    radixSort(SA12, s12, st + 1, n12, upperBound);
    radixSort(s12, SA12, st, n12, upperBound);
    // 以下为对“字符”进行离散化的过程
    int cnt = 0, pre0 = -1, pre1 = -1, pre2 = -1;
    for (int i = 0; i < n12; ++i) {
        if(st[SA12[i]] != pre0 || st[SA12[i] + 1] != pre1 || st[SA12[i] + 2] != pre2) {
            cnt++;
            pre0 = st[SA12[i]];
            pre1 = st[SA12[i] + 1];
            pre2 = st[SA12[i] + 2];
        }
        if(SA12[i] % 3 == 1) {
            s12[SA12[i] / 3] = cnt;
        } else {
            s12[SA12[i] / 3 + n0] = cnt;
        }
    }
    // 如果存在相同字符，那么需要递归构造后缀数组
    if(cnt < n12) {
        // 递归处理
        suffixArray(s12, SA12, n12, cnt);
        for(int i = 0; i < n12; ++i) {
            s12[SA12[i]] = i + 1;
        }
    }
    // 否则，由于任意两个字符都不相同，可以直接得到后缀数组
    else {
        for(int i = 0; i < n12; ++i) {
            SA12[s12[i] - 1] = i;
        }
    }
    // 构造未被采样后缀的后缀数组
    for(int i = 0, j = 0; i < n12; ++i) {
        if(SA12[i] < n0) {
            s0[j++] = 3 * SA12[i];
        }
    }
    radixSort(s0, SA0, st, n0, upperBound);
    // 以下过程将两次构造的后缀数组合并为最终结果
    for(int pos0 = 0, pos12 = n0 - n1, k = 0; k < n; ++k) {
        int i = getRealPos();
        int j = SA0[pos0];
        // i 为被采样后缀集合中当前最小后缀，j 为未被采样后缀中当前最小后缀
        bool is12First;
        if(SA12[pos12] < n0) {
            is12First = cmp(st[i], s12[SA12[pos12] + n0], st[j], s12[j / 3]);
        } else {
            is12First = cmp(st[i], st[i + 1], s12[SA12[pos12] - n0 + 1], st[j], st[j + 1], s12[j / 3 + n0]);
        }
        // 根据上文中的比较规则对这两者进行比较，取较小的优先加入后缀数组
        if(is12First) {
            SA[k] = i;
            pos12++;
            if(pos12 == n12) {
                for(k++; pos0 < n0; pos0++, k++) {
                    SA[k] = SA0[pos0];
                }
            }
        } else {
            SA[k] = j;
            pos0++;
            if(pos0 == n0) {
                for(k++; pos12 < n12; pos12++, k++) {
                    SA[k] = getRealPos();
                }
            }
        }
    }
    // 释放内存
    delete [] s12;
    delete [] SA12;
    delete [] SA0;
    delete [] s0;
}
// <== DC3 算法

void getHeight(int *st, int *SA, int *_rank, int *height, int n) {
    int l = 0;
    height[0] = 0;
    for(int i = 0; i < n; ++i) {
        if(_rank[i] > 0) {
            int j = SA[_rank[i] - 1];
            while((i + 1 < n) && (j + 1 < n) && (st[i + l] == st[j + l])) {
                l++;
            }
            height[_rank[i]] = l;
            if(l > 0) {
                l--;
            }
        }
    }
}

const int maxn = 60000;
const int inf  = 2147483647 / 2;
char s[maxn];
int st[maxn], SA[maxn], _rank[maxn], height[maxn];
int n, originLen, _log2[maxn], rmq[maxn][18];
int dist[maxn], posi[maxn], opos[maxn];

int _min(int x, int y) {
    return (x < y ? x : y);
}

void _caclRMQ() {
    int k = 0;
    for(int i = 1; i <= n; ++i) {
        if((1 << (k + 1)) == i)
            k++;
        _log2[i] = k;
    }
    for(int i = 1; i < n; ++i) {
        rmq[i][0] = height[i];
    }
    k = _log2[n - 1];
    for(int j = 1; j <= k; ++j)
        for(int i = 1; i < n - (1 << j) + 1; ++i)
            rmq[i][j] = _min(rmq[i][j - 1], rmq[i + (1 << (j - 1))][j - 1]);
}

int LCP(int l, int r) {
    if(l == r)
        return originLen - r;
    l = _rank[l];
    r = _rank[r];
    if(l > r) {
        int tmp = l;
        l = r;
        r = tmp;
    }
    int k = _log2[r - l];
    return (_min(rmq[l+1][k],rmq[r - (1 << k) + 1][k]));
}

void _prepare() {
    scanf("%s", s);
    n = strlen(s);
    originLen = n;
    for(int i = 0; i < n; ++i) {
        st[i] = s[i];
    }
    st[n++] = '$';
    suffixArray(st, SA, n, 150);
    for(int i = 0; i < n; ++i)
        _rank[SA[i]] = i;
    getHeight(st, SA, _rank, height, n);
    _caclRMQ();
}

void _insert(char ch, int p) {
    if(p > n)
        p = n - 1;
    for(int i = n - 1; i >= p; --i) {
        st[i + 1] = st[i];
        opos[i + 1] = opos[i];
        if(opos[i] != -1)
            posi[opos[i]] = i + 1;
    }
    st[++n] = 0;
    st[p] = ch;
    opos[p] = -1;
    for(int i = p - 1; i >= 0; i--) {
        if(opos[i] == -1)
            break;
        dist[opos[i]] = p - i;
    }
}

int _query(int a, int b, int offset) {
    int lc=LCP(a,b),mis=_min(dist[a],dist[b]);
    int ra=posi[a],rb=posi[b];
    if(lc<mis){
        return offset+lc;
    }
    for(int i=mis;ra+i<=n && rb+i <=n;++i){
        if(st[ra+i]!=st[rb+i] || !st[ra+1] || !st[rb+i])
            return offset+i;
        if(opos[ra+i]!=-1 && opos[rb+i]!=-1)
            return _query(opos[ra+i],opos[rb+i],offset+i);
    }
    return 0;
}

char op[100];

int main() {
    _prepare();
    for(int i=0;i<n;++i){
        posi[i]=opos[i]=i;
        dist[i]=inf;
    }
    int m;
    scanf("%d",&m);
    for(int i=0;i<m;++i){
        scanf("%s",op);
        int a,b;
        if(op[0]=='Q'){
            scanf("%d %d",&a,&b);
            printf("%d\n",_query(a-1,b-1,0));
        }else{
            scanf("%s %d",op,&a);
            _insert(op[0],a-1);
        }
    }
    return 0;
}

```