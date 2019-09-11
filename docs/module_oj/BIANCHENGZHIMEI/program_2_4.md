## 2-4 1的数目
```cpp
#include <bits/stdc++.h>

using namespace std;

typedef unsigned long long ULONGLONG;

//方法1:最简单的直接遍历O(N*log10(N))
ULONGLONG Count1InAInteger(ULONGLONG n) {
    ULONGLONG iNum = 0;
    while (n != 0) {
        iNum += (n % 10 == 1) ? 1 : 0;
        n /= 10;
    }

    return iNum;
}

ULONGLONG f1(ULONGLONG n) {
    ULONGLONG iCount = 0;
    for (ULONGLONG i = 1; i <= n; i++) {
        iCount += Count1InAInteger(i);
    }
    return iCount;
}

//方法2:找规律
ULONGLONG Sum1s(ULONGLONG n) {
    ULONGLONG iCount = 0;

    ULONGLONG iFactor = 1;

    ULONGLONG iLowerNum = 0;
    ULONGLONG iCurrNum = 0;
    ULONGLONG iHigherNum = 0;

    while (n / iFactor != 0) {
        iLowerNum = n - (n / iFactor) * iFactor;
        iCurrNum = (n / iFactor) % 10;
        iHigherNum = n / (iFactor * 10);

        switch (iCurrNum) {
            case 0:
                iCount += iHigherNum * iFactor;
                break;
            case 1:
                iCount += iHigherNum * iFactor + iLowerNum + 1;
                break;
            default:
                iCount += (iHigherNum + 1) * iFactor;
                break;
        }

        iFactor *= 10;
    }

    return iCount;
}

int main() {
    return 0;
}
```