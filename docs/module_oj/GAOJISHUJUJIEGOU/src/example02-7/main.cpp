#include <bits/stdc++.h>
#define maxn 30010
using namespace std;

int a[maxn], b[maxn];
int n, ans, x, y;
int p, q, m;

int findmin() {
    int minx = 100000000, mini = 0;
    if(p < n && a[p] < minx)
        minx = a[p], mini = 1;
    if(q <= m && b[q] < minx)
        minx = b[q], mini = 2;
    if(mini == 1)
        p++;
    else
        q++;
    return minx;
}

int main() {
    scanf("%d", &n);
    for(int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    sort(a, a + n);
    ans = a[0] + a[1];
    b[0] = a[0] + a[1];
    p = 2;
    q = 0;
    m = 0;
    for(int i = 1; i < n - 1; i++) {
        x = findmin();
        y = findmin();
        b[++m] = x + y;
        ans += x + y;
    }
    printf("%d\n", ans);
    return 0;
}
