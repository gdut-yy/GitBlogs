## 2-2 不要被阶乘吓到

```CPP
#include <bits/stdc++.h>

using namespace std;

int numOf0InFactorial1(int n) {
    int ret = 0;
    for (int i = 1; i <= n; i++) {
        int j = i;
        while (j % 5 == 0) {
            ret++;
            j /= 5;
        }
    }
    return ret;
}

int numOf0InFactorial2(int n) {
    int ret = 0;
    while (n) {
        ret += n / 5;
        n /= 5;
    }
    return ret;
}

int main() {
    cout << (numOf0InFactorial1(4) == 0) << endl;
    cout << (numOf0InFactorial1(5) == 1) << endl;
    cout << (numOf0InFactorial1(10) == 2) << endl;
    cout << (numOf0InFactorial1(20) == 4) << endl;
    cout << (numOf0InFactorial1(30) == 7) << endl;

    cout << (numOf0InFactorial2(4) == 0) << endl;
    cout << (numOf0InFactorial2(5) == 1) << endl;
    cout << (numOf0InFactorial2(10) == 2) << endl;
    cout << (numOf0InFactorial2(20) == 4) << endl;
    cout << (numOf0InFactorial2(30) == 7) << endl;

    return 0;
}
```
