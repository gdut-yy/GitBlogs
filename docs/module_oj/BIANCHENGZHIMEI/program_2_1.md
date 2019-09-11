## 2-1 求二进制数中1的个数

```cpp
#include <bits/stdc++.h>

using namespace std;

typedef unsigned char BYTE;

int Count1(BYTE v) {
    int num = 0;
    while (v) {
        if (v % 2 == 1) {
            num++;
        }
        v = v / 2;
    }
    return num;
}

int Count2(BYTE v) {
    int num = 0;
    while (v) {
        num += v & 0x01;
        v >>= 1;
    }
    return num;
}

int Count3(BYTE v) {
    int num = 0;
    while (v) {
        v &= (v - 1);
        num++;
    }
    return num;
}

//int Count4(BYTE v) {
//    int num = 0;
//    switch (v) {
//        case 0x0:
//            num = 0;
//            break;
//        case 0x1:
//        case 0x2:
//        case 0x4:
//        case 0x8:
//        case 0x10:
//        case 0x20:
//        case 0x40:
//        case 0x80:
//            num = 1;
//            break;
//        case 0x3:
//        case 0x6:
//        case 0xc:
//        case 0x18:
//        case 0x30:
//        case 0x60:
//        case 0xc0:
//            num = 2;
//            break;
//            //...
//    }
//    return num;
//}

// 预定义的结果表
int countTable[256] = {
        0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3,
        3, 4, 3, 4, 4, 5, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3,
        4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4,
        3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3,
        4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6,
        6, 7, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4,
        5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
        3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 2, 3, 3, 4, 3, 4, 4, 5, 3,
        4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 3, 4,
        4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6,
        7, 6, 7, 7, 8
};

int Count5(BYTE v) {
    //check parameter
    return countTable[v];
}


int main() {
    cout << Count1(7) << endl;
    cout << Count2(7) << endl;
    cout << Count3(7) << endl;
//    cout << Count4(10) << endl;
    cout << Count5(7) << endl;

    return 0;
}
```