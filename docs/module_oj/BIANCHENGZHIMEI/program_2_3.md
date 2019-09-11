## 2-3 寻找发帖“水王”
```cpp
#include <bits/stdc++.h>

using namespace std;

typedef int Type;

Type Find(Type *ID, int N) {
    Type candidate;
    int nTimes, i;
    for (i = nTimes = 0; i < N; i++) {
        if (nTimes == 0) {
            candidate = ID[i], nTimes = 1;
        } else {
            if (candidate == ID[i])
                nTimes++;
            else
                nTimes--;
        }
    }
    return candidate;
}

int main() {
    return 0;
}
```