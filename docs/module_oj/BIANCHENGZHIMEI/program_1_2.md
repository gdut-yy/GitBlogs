## 1-2 中国象棋将帅问题

下过中国象棋的朋友都知道，双方的“将”和“帅”相隔遥远，并且他们不能照面，在象棋残局中，许多高手能利用这一规则走出精妙的杀招，假设棋盘上只有“将”和“帅”二子（如图）（为了下面叙述方便，我们约定用A表示“将”，B表示“帅”）。

A、B二子被限制在己方的3x3的格子里运动，例如，在如上表格里，A被正方形{d10,f10,d8,f8}包围，而B被正方形{d3,f3,d1,f1}包围。每一步，A、B分别可以横向或者纵向移动一格，但是不能沿对角线移动，另外，A不能面对B，也就是说，A和B不能处在一纵向直线上(比如A在d(10)的位置上，那么B就不能在d1、d2以及d3)。 

请写出一个程序，输出A、B所有合法的位置，要求在代码中只能使用一个字节存储变量。 

### 解法一
```cpp
#include <bits/stdc++.h>

#define HALF_BITS_LENGTH 4
// 这个值是记忆存储单元长度的一半，在这道题里是4bit
#define FULLMASK 255
// 这个数字表示一个全部bit的mask，在二进制表示中，它是11111111。
#define LMASK (FULLMASK << HALF_BITS_LENGTH)
// 这个宏表示左bits的mask，在二进制表示中，它是11110000。
#define RMASK (FULLMASK >> HALF_BITS_LENGTH)
// 这个数字表示右bits的mask，在二进制表示中，它表示00001111。
#define RSET(b, n) (b = ((LMASK & b) ^ n))
// 这个宏，将b的右边设置成n
#define LSET(b, n) (b = ((RMASK & b) ^ (n << HALF_BITS_LENGTH)))
// 这个宏，将b的左边设置成n
#define RGET(b) (RMASK & b)
// 这个宏得到b的右边的值
#define LGET(b) ((LMASK & b) >> HALF_BITS_LENGTH)
// 这个宏得到b的左边的值
#define GRIDW 3
// 这个数字表示将帅移动范围的行宽度。

#define HALF_BITS_LENGTH 4
#define FULLMASK 255
#define LMASK (FULLMASK << HALF_BITS_LENGTH)
#define RMASK (FULLMASK >> HALF_BITS_LENGTH)
#define RSET(b, n) (b = ((LMASK & b) ^ n))
#define LSET(b, n) (b = ((RMASK & b) ^ (n << HALF_BITS_LENGTH)))
#define RGET(b) (RMASK & b)
#define LGET(b) ((LMASK & b) >> HALF_BITS_LENGTH)
#define GRIDW 3

int main() {
    unsigned char b;
    for (LSET(b, 1); LGET(b) <= GRIDW * GRIDW; LSET(b, (LGET(b) + 1)))
        for (RSET(b, 1); RGET(b) <= GRIDW * GRIDW; RSET(b, (RGET(b) + 1)))
            if (LGET(b) % GRIDW != RGET(b) % GRIDW)
                printf("A = %d, B = %d\n", LGET(b), RGET(b));
    return 0;
}
```

### 解法二
```cpp
#include <bits/stdc++.h>

int main() {
    unsigned char i = 81;
    while (i--) {
        if (i / 9 % 3 == i % 9 % 3)
            continue;
        printf("A = %d, B = %d\n", i / 9 + 1, i % 9 + 1);
    }
    return 0;
}
```

### 解法三
```cpp
#include <bits/stdc++.h>

struct {
    unsigned char a : 4;
    unsigned char b : 4;
} i;

int main() {
    for (i.a = 1; i.a <= 9; i.a++)
        for (i.b = 1; i.b <= 9; i.b++)
            if (i.a % 3 != i.b % 3)
                printf("A = %d, B = %d\n", i.a, i.b);
    return 0;
}
```