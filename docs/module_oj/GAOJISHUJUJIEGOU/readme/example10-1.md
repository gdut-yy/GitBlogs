# 例 10-1 文本编辑器（editor.???）

## 问题描述

## 输入格式

## 输出格式
输出文件的每行依次对应输入文件中每条 Get 指令的输出。
## 输入样例
	15
	Insert 26
	abcdefghijklmnop
	qrstuvwxy 
	Move 16
	Delete 10
	Move 5
	Insert 1
	-
	Next
	Insert 1
	_
	Next
	Next
	Insert 4
	.\/.
	Get 4
	Prev
	Insert 1
	-
	Move 0
	Get 22

## 输出样例
	.\/.
	abcde-_-f.\/.ghijklmno

----

```cpp
#include <bits/stdc++.h>

using namespace std;

// 最大维护元素个数
const int MAXL = 2 * 1024 * 1024 + 100;
// 最大可能的块数
const int BLOCK_SIZE = 5000;
// 每块大小上限
const int BLOCK_NUM = MAXL / BLOCK_SIZE * 2 + 100;
// 手工实现链表的内存管理
int indexPool[BLOCK_NUM];
// 当前块的数目
int blockNum;
// 块的后继指针以及自身大小
int _next[BLOCK_NUM], curSize[BLOCK_NUM];
// 数据域
char data[BLOCK_NUM][BLOCK_SIZE];

void init() {
    for(int i = 1; i < BLOCK_NUM; ++i) {
        indexPool[i] = i;
    }
    // 为了方便，新建一个编号为 0、大小为 0 的块
    blockNum = 1;
    _next[0] = -1;
    curSize[0] = 0;
}

int getNewBlock() {
    // 相当于指针的 new 操作
    return indexPool[blockNum++];
}

void deleteBlock(int blockIndex) {
    // 相当于指针的 delete 操作
    indexPool[--blockNum] = blockIndex;
}

// 找到 pos 位置对应的块，同时 pos 指向块内位置
int getCurBlock(int &pos) {
    int blockIndex = 0;
    while(blockIndex != -1 && pos > curSize[blockIndex]) {
        pos -= curSize[blockIndex];
        blockIndex = _next[blockIndex];
    }
    return blockIndex;
}

// 给 ewBlock 设置数据域和后继指针
void addNewBlock(int curBlock, int newBlock, int num, char str[]) {
    if(newBlock != -1) {
        _next[newBlock] = _next[curBlock];
        curSize[newBlock] = num;
        memcpy(data[newBlock], str, num);
    }
    _next[curBlock] = newBlock;
}

// 将 urBlock 从 pos 处分裂
void split(int curBlock, int pos) {
    if(curBlock == -1 || pos == curSize[curBlock])
        return;
    int newBlock = getNewBlock();
    addNewBlock(curBlock, newBlock, curSize[curBlock] - pos, data[curBlock] + pos);
    curSize[curBlock] = pos;
}

// 合并 curBlock 和 nextBlock，删除原 nextBlock
void _merge(int curBlock, int nextBlock) {
    memcpy(data[curBlock] + curSize[curBlock], data[nextBlock], curSize[nextBlock]);
    curSize[curBlock] += curSize[nextBlock];
    _next[curBlock] = _next[nextBlock];
    deleteBlock(nextBlock);
}

void maintainList() {
    // 从链头开始扫描
    int curBlock = 0;
    // 如果未扫描完整个链表就继续执行循环
    while(curBlock != -1) {
        int nextBlock = _next[curBlock];
        while(nextBlock != -1 && curSize[curBlock] + curSize[nextBlock] <= BLOCK_SIZE) {
            _merge(curBlock, nextBlock);
            nextBlock = _next[curBlock];
        }
        curBlock = _next[curBlock];
    }
}

// 在 pos 处插入 num 个字符，str 为待插入的数据
void _insert(int pos, int num, char str[]) {
    int curBlock = getCurBlock(pos);
    split(curBlock, pos);
    int curNum = 0;
    // 先构造若干个大小为 BLOCK_SIZE 的块
    while(curNum + BLOCK_SIZE <= num) {
        int newBlock = getNewBlock();
        addNewBlock(curBlock, newBlock, BLOCK_SIZE, str + curNum);
        curBlock = newBlock;
        curNum += BLOCK_SIZE;
    }
    // 如果还有余项，那么再添加一块
    if(num - curNum) {
        int newBlock = getNewBlock();
        addNewBlock(curBlock, newBlock, num - curNum, str + curNum);
    }
    maintainList();
}

// 从 pos 处删除 num 个字符
void _erase(int pos, int num) {
    int curBlock = getCurBlock(pos);
    split(curBlock, pos);
    int nextBlock = _next[curBlock];
    while(nextBlock != -1 && num > curSize[nextBlock]) {
        num -= curSize[nextBlock];
        nextBlock = _next[nextBlock];
    }
    split(nextBlock, num);
    nextBlock = _next[nextBlock];
    for(int p = _next[curBlock]; p != nextBlock; p = _next[curBlock]) {
        _next[curBlock] = _next[p];
        deleteBlock(p);
    }
    maintainList();
}

// 获取 pos 处开始的 num 个数并存放于 str 中
void getData(int pos, int num, char str[]) {
    int curBlock = getCurBlock(pos);
    int index = curSize[curBlock] - pos;
    if(num < index){
        index = num;
    }
    memcpy(str, data[curBlock] + pos, index);
    int tmpBlock = _next[curBlock];
    while(tmpBlock != -1 && index + curSize[tmpBlock] <= num) {
        memcpy(str + index, data[tmpBlock], curSize[tmpBlock]);
        index += curSize[tmpBlock];
        tmpBlock = _next[tmpBlock];
    }
    if(num - index && tmpBlock != -1) {
        memcpy(str + index, data[tmpBlock], num - index);
    }
    str[num] = '\0';
}

char str[MAXL], command[20];

int main() {
    init();
    int curPos = 0;
    int opNum, num;
    char ch;
    scanf("%d", &opNum);
    while(opNum) {
        opNum--;
        scanf("%s", command);
        switch(command[0]) {

        case 'M':
            scanf("%d", &curPos);
            break;
        case 'I':
            scanf("%d", &num);
            for(int i = 0; i < num; ++i) {
                scanf("%c", &ch);
                str[i] = ch;
                if(ch < 32 || ch > 126) {
                    --i;
                }
            }
            _insert(curPos, num, str);
            break;
        case 'D':
            scanf("%d", &num);
            _erase(curPos, num);
            break;
        case 'G':
            scanf("%d", &num);
            getData(curPos, num, str);
            printf("%s\n", str);
            break;
        case 'P':
            --curPos;
            break;
        case 'N':
            ++curPos;
            break;
        }
    }
    return 0;
}

```