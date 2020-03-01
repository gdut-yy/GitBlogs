# 24 点
## 题目
A 取值 1，J 取值 11，Q 取值 12，K 取值 13，判断给定四张牌，能否通过加减乘除四种运算，使得最后的结果是 24。

### 输入样例
```
A 5 5 5
A A A A
```
### 输出样例
```
Yes
No
```
### 提示
```
(5-1/5)*5=24
```
----
## 法 1：24 点（递归解法）
```java
import java.util.Scanner;

public class Main {
    /**
     * 目标值，此题为 24
     */
    private static final double TARGET_VALUE = 24.0;
    /**
     * 卡片数，此题为 4
     */
    private static final int CARDS_NUM = 4;
    /**
     * 用于 double 类型判等
     */
    private static final double ZERO = 1e-6;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            String[] line = sc.nextLine().split(" ");
            int[] cards = new int[line.length];
            for (int i = 0; i < line.length; i++) {
                switch (line[i]) {
                    case "A":
                        cards[i] = 1;
                        break;
                    case "J":
                        cards[i] = 11;
                        break;
                    case "Q":
                        cards[i] = 12;
                        break;
                    case "K":
                        cards[i] = 13;
                        break;
                    default:
                        cards[i] = Integer.parseInt(line[i]);
                        break;
                }
            }
            System.out.println(judgePoint24(cards) ? "Yes" : "No");
        }
    }

    /**
     * 判断数组能否凑 24 点
     *
     * @param nums_ 卡片数组
     * @return true: 能凑 24 点
     */
    private static boolean judgePoint24(int[] nums_) {
        double[] nums = new double[nums_.length];
        for (int i = 0; i < nums_.length; i++) {
            nums[i] = nums_[i];
        }
        return dfs(nums, CARDS_NUM);
    }

    /**
     * 递归判断数组能否凑 24 点
     *
     * @param nums 卡片数组
     * @param n    卡片数
     * @return true: 能凑 24 点
     */
    private static boolean dfs(double[] nums, int n) {
        if (n == 1) {
            return Math.abs(nums[0] - TARGET_VALUE) <= ZERO;
        }
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                double a, b;
                a = nums[i];
                b = nums[j];
                nums[j] = nums[n - 1];
                // 加
                nums[i] = a + b;
                if (dfs(nums, n - 1)) {
                    return true;
                }
                // 减
                nums[i] = a - b;
                if (dfs(nums, n - 1)) {
                    return true;
                }
                // 反减
                nums[i] = b - a;
                if (dfs(nums, n - 1)) {
                    return true;
                }
                // 乘
                nums[i] = a * b;
                if (dfs(nums, n - 1)) {
                    return true;
                }
                // 除
                if (b != 0) {
                    nums[i] = a / b;
                    if (dfs(nums, n - 1)) {
                        return true;
                    }
                }
                // 反除
                if (a != 0) {
                    nums[i] = b / a;
                    if (dfs(nums, n - 1)) {
                        return true;
                    }
                }
                nums[i] = a;
                nums[j] = b;
            }
        }
        return false;
    }
}

```
## 法 2：24 点（打表、查表解法，可达O(1) ）
```java
import java.util.Arrays;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Main2 {
    /**
     * 目标点值，此题为 24
     */
    private static final double TARGET_VALUE = 24.0;
    /**
     * 牌的最大点数，此题为 13
     */
    private static final int CARD_MAX = 13;
    /**
     * 用于 double 类型判等
     */
    private static final double ZERO = 1e-6;

    public static void main(String[] args) {
//        printSolutions();
//        printTable();
        solution();
    }

    /**
     * Step1:
     * <p>
     * 打印 运算式 4^3 * 5 = 320 种
     * 是的，会存在不少的冗余表达式，但是对于线下打表是无影响的
     * <p>
     * 输出结果用于 isSingle24()
     */
    private static void printSolutions() {
        String[] op = {"+", "-", "*", "/"};
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                for (int k = 0; k < 4; k++) {
                    // (a b) (c d)
                    System.out.println("Math.abs((a" + op[i] + "b)" + op[j] + "(c" + op[k] + "d)-TARGET_VALUE)<ZERO ||");
                    // (a b c) d
                    System.out.println("Math.abs((a" + op[i] + "b" + op[j] + "c)" + op[k] + "d-TARGET_VALUE)<ZERO ||");
                    // a (b c d)
                    System.out.println("Math.abs(a" + op[i] + "(b" + op[j] + "c" + op[k] + "d)-TARGET_VALUE)<ZERO ||");
                    // (a b) c d
                    System.out.println("Math.abs((a" + op[i] + "b)" + op[j] + "c" + op[k] + "d-TARGET_VALUE)<ZERO ||");
                    // a b (c d)
                    System.out.println("Math.abs(a" + op[i] + "b" + op[j] + "(c" + op[k] + "d)-TARGET_VALUE)<ZERO ||");
                }
            }
        }
    }

    /**
     * Step2-1:
     * <p>
     * 判断单个排列能否凑 24 点
     *
     * @return true: 能凑 24 点
     */
    private static boolean isSingle24(double a, double b, double c, double d) {
        return (Math.abs((a + b) + (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b + c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b + c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) + c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b + (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) + (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b + c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b + c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) + c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b + (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) + (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b + c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b + c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) + c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b + (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) + (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b + c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b + c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) + c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b + (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) - (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b - c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b - c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) - c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b - (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) - (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b - c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b - c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) - c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b - (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) - (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b - c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b - c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) - c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b - (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) - (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b - c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b - c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) - c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b - (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) * (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b * c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b * c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) * c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b * (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) * (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b * c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b * c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) * c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b * (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) * (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b * c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b * c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) * c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b * (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) * (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b * c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b * c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) * c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b * (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) / (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b / c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b / c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) / c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b / (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) / (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b / c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b / c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) / c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b / (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) / (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b / c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b / c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) / c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b / (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) / (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b / c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a + (b / c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a + b) / c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a + b / (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) + (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b + c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b + c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) + c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b + (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) + (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b + c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b + c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) + c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b + (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) + (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b + c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b + c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) + c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b + (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) + (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b + c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b + c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) + c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b + (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) - (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b - c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b - c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) - c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b - (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) - (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b - c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b - c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) - c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b - (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) - (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b - c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b - c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) - c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b - (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) - (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b - c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b - c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) - c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b - (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) * (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b * c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b * c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) * c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b * (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) * (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b * c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b * c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) * c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b * (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) * (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b * c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b * c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) * c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b * (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) * (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b * c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b * c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) * c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b * (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) / (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b / c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b / c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) / c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b / (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) / (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b / c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b / c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) / c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b / (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) / (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b / c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b / c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) / c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b / (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) / (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b / c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a - (b / c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a - b) / c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a - b / (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) + (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b + c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b + c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) + c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b + (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) + (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b + c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b + c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) + c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b + (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) + (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b + c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b + c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) + c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b + (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) + (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b + c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b + c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) + c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b + (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) - (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b - c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b - c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) - c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b - (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) - (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b - c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b - c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) - c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b - (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) - (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b - c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b - c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) - c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b - (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) - (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b - c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b - c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) - c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b - (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) * (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b * c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b * c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) * c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b * (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) * (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b * c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b * c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) * c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b * (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) * (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b * c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b * c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) * c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b * (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) * (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b * c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b * c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) * c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b * (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) / (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b / c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b / c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) / c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b / (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) / (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b / c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b / c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) / c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b / (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) / (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b / c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b / c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) / c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b / (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) / (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b / c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a * (b / c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a * b) / c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a * b / (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) + (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b + c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b + c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) + c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b + (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) + (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b + c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b + c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) + c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b + (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) + (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b + c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b + c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) + c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b + (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) + (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b + c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b + c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) + c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b + (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) - (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b - c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b - c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) - c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b - (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) - (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b - c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b - c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) - c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b - (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) - (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b - c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b - c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) - c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b - (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) - (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b - c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b - c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) - c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b - (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) * (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b * c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b * c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) * c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b * (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) * (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b * c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b * c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) * c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b * (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) * (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b * c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b * c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) * c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b * (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) * (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b * c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b * c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) * c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b * (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) / (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b / c) + d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b / c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) / c + d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b / (c + d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) / (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b / c) - d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b / c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) / c - d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b / (c - d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) / (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b / c) * d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b / c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) / c * d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b / (c * d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) / (c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b / c) / d - TARGET_VALUE) < ZERO ||
                Math.abs(a / (b / c / d) - TARGET_VALUE) < ZERO ||
                Math.abs((a / b) / c / d - TARGET_VALUE) < ZERO ||
                Math.abs(a / b / (c / d) - TARGET_VALUE) < ZERO
        );
    }

    /**
     * Step2-2:
     * <p>
     * 断一组数能否凑 24 点（共 4! 种排列即 24 种）
     *
     * @return true: 能凑 24 点
     */
    private static boolean isBatch24(double a, double b, double c, double d) {
        return isSingle24(a, b, c, d) ||
                isSingle24(a, b, d, c) ||
                isSingle24(a, c, b, d) ||
                isSingle24(a, c, d, b) ||
                isSingle24(a, d, c, b) ||
                isSingle24(a, d, b, c) ||
                isSingle24(b, a, c, d) ||
                isSingle24(b, a, d, c) ||
                isSingle24(c, a, b, d) ||
                isSingle24(c, a, d, b) ||
                isSingle24(d, a, c, b) ||
                isSingle24(d, a, b, c) ||
                isSingle24(b, c, a, d) ||
                isSingle24(b, d, a, c) ||
                isSingle24(c, b, a, d) ||
                isSingle24(c, d, a, b) ||
                isSingle24(d, c, a, b) ||
                isSingle24(d, b, a, c) ||
                isSingle24(b, c, d, a) ||
                isSingle24(b, d, c, a) ||
                isSingle24(c, b, d, a) ||
                isSingle24(c, d, b, a) ||
                isSingle24(d, c, b, a) ||
                isSingle24(d, b, c, a);
    }

    /**
     * Step3:
     * <p>
     * 打表。52 张牌抽 4 张牌共 1820 种组合（A 5 5 5 和 5 A 5 5 视为同一种）
     * 其中共有 458 种组合无解
     * <p>
     * 输出结果用于 solution()
     */
    private static void printTable() {
        int cnt = 0;
        for (int x1 = 1; x1 <= CARD_MAX; x1++) {
            for (int x2 = x1; x2 <= CARD_MAX; x2++) {
                for (int x3 = x2; x3 <= CARD_MAX; x3++) {
                    for (int x4 = x3; x4 <= CARD_MAX; x4++) {
                        if (!isBatch24(x1, x2, x3, x4)) {
                            System.out.println("set.add(\"" + x1 + "," + x2 + "," + x3 + "," + x4 + "\");");
                            cnt++;
                        }
                    }
                }
            }
        }
        System.out.println("个数=" + cnt);
    }

    /**
     * Step4:
     * <p>
     * 最终呈现
     */
    private static void solution() {
        Set<String> set = new HashSet<>();
        set.add("1,1,1,1");
        set.add("1,1,1,2");
        set.add("1,1,1,3");
        set.add("1,1,1,4");
        set.add("1,1,1,5");
        set.add("1,1,1,6");
        set.add("1,1,1,7");
        set.add("1,1,1,9");
        set.add("1,1,1,10");
        set.add("1,1,2,2");
        set.add("1,1,2,3");
        set.add("1,1,2,4");
        set.add("1,1,2,5");
        set.add("1,1,3,3");
        set.add("1,1,4,11");
        set.add("1,1,4,13");
        set.add("1,1,5,9");
        set.add("1,1,5,10");
        set.add("1,1,5,11");
        set.add("1,1,5,12");
        set.add("1,1,5,13");
        set.add("1,1,6,7");
        set.add("1,1,6,10");
        set.add("1,1,6,11");
        set.add("1,1,6,13");
        set.add("1,1,7,7");
        set.add("1,1,7,8");
        set.add("1,1,7,9");
        set.add("1,1,7,11");
        set.add("1,1,7,12");
        set.add("1,1,7,13");
        set.add("1,1,8,9");
        set.add("1,1,8,10");
        set.add("1,1,8,11");
        set.add("1,1,8,12");
        set.add("1,1,8,13");
        set.add("1,1,9,9");
        set.add("1,1,9,10");
        set.add("1,1,9,11");
        set.add("1,1,9,12");
        set.add("1,1,10,10");
        set.add("1,1,10,11");
        set.add("1,2,2,2");
        set.add("1,2,2,3");
        set.add("1,2,5,11");
        set.add("1,2,7,13");
        set.add("1,2,8,11");
        set.add("1,2,8,12");
        set.add("1,2,9,9");
        set.add("1,2,9,10");
        set.add("1,2,10,10");
        set.add("1,3,3,13");
        set.add("1,3,5,5");
        set.add("1,3,7,11");
        set.add("1,3,10,13");
        set.add("1,3,11,13");
        set.add("1,4,4,13");
        set.add("1,4,7,10");
        set.add("1,4,8,10");
        set.add("1,4,9,9");
        set.add("1,4,10,13");
        set.add("1,4,11,11");
        set.add("1,4,11,12");
        set.add("1,4,11,13");
        set.add("1,4,12,13");
        set.add("1,4,13,13");
        set.add("1,5,5,7");
        set.add("1,5,5,8");
        set.add("1,5,7,7");
        set.add("1,5,11,13");
        set.add("1,5,12,13");
        set.add("1,5,13,13");
        set.add("1,6,6,7");
        set.add("1,6,7,7");
        set.add("1,6,7,8");
        set.add("1,6,7,13");
        set.add("1,6,9,11");
        set.add("1,6,10,10");
        set.add("1,6,10,11");
        set.add("1,6,11,11");
        set.add("1,6,13,13");
        set.add("1,7,7,7");
        set.add("1,7,7,8");
        set.add("1,7,7,13");
        set.add("1,7,8,13");
        set.add("1,7,10,10");
        set.add("1,7,10,11");
        set.add("1,7,11,11");
        set.add("1,7,11,12");
        set.add("1,7,11,13");
        set.add("1,8,8,13");
        set.add("1,8,9,9");
        set.add("1,8,9,10");
        set.add("1,8,10,10");
        set.add("1,8,11,11");
        set.add("1,8,12,13");
        set.add("1,8,13,13");
        set.add("1,9,9,9");
        set.add("1,9,9,10");
        set.add("1,9,9,11");
        set.add("1,9,9,13");
        set.add("1,9,10,10");
        set.add("1,9,10,11");
        set.add("1,9,12,13");
        set.add("1,9,13,13");
        set.add("1,10,10,10");
        set.add("1,10,10,11");
        set.add("1,10,10,13");
        set.add("1,10,11,11");
        set.add("1,10,11,13");
        set.add("1,10,13,13");
        set.add("1,11,11,11");
        set.add("1,13,13,13");
        set.add("2,2,2,2");
        set.add("2,2,2,6");
        set.add("2,2,5,13");
        set.add("2,2,7,9");
        set.add("2,2,7,11");
        set.add("2,2,8,11");
        set.add("2,2,8,13");
        set.add("2,2,9,9");
        set.add("2,2,9,13");
        set.add("2,2,10,12");
        set.add("2,3,3,4");
        set.add("2,3,9,11");
        set.add("2,3,10,11");
        set.add("2,4,7,13");
        set.add("2,4,9,11");
        set.add("2,4,11,13");
        set.add("2,4,12,13");
        set.add("2,5,5,5");
        set.add("2,5,5,6");
        set.add("2,5,7,12");
        set.add("2,5,9,9");
        set.add("2,5,9,13");
        set.add("2,5,11,11");
        set.add("2,5,11,13");
        set.add("2,5,13,13");
        set.add("2,6,7,7");
        set.add("2,6,9,13");
        set.add("2,6,11,11");
        set.add("2,6,13,13");
        set.add("2,7,7,7");
        set.add("2,7,7,9");
        set.add("2,7,8,10");
        set.add("2,7,9,9");
        set.add("2,7,9,12");
        set.add("2,7,10,13");
        set.add("2,7,11,11");
        set.add("2,7,11,13");
        set.add("2,7,13,13");
        set.add("2,8,11,13");
        set.add("2,9,9,9");
        set.add("2,9,9,10");
        set.add("2,9,11,12");
        set.add("2,9,12,12");
        set.add("2,10,10,10");
        set.add("2,10,12,12");
        set.add("2,10,13,13");
        set.add("3,3,3,13");
        set.add("3,3,4,10");
        set.add("3,3,5,8");
        set.add("3,3,5,11");
        set.add("3,3,7,10");
        set.add("3,3,8,11");
        set.add("3,3,10,10");
        set.add("3,3,10,11");
        set.add("3,3,10,12");
        set.add("3,3,11,11");
        set.add("3,3,13,13");
        set.add("3,4,6,7");
        set.add("3,4,7,13");
        set.add("3,4,8,8");
        set.add("3,4,9,10");
        set.add("3,4,10,11");
        set.add("3,4,11,11");
        set.add("3,4,13,13");
        set.add("3,5,5,5");
        set.add("3,5,5,10");
        set.add("3,5,5,13");
        set.add("3,5,7,7");
        set.add("3,5,8,10");
        set.add("3,5,9,11");
        set.add("3,5,11,13");
        set.add("3,6,7,11");
        set.add("3,6,8,11");
        set.add("3,6,10,13");
        set.add("3,7,7,11");
        set.add("3,7,8,10");
        set.add("3,7,10,12");
        set.add("3,7,11,13");
        set.add("3,8,8,13");
        set.add("3,8,10,13");
        set.add("3,8,11,13");
        set.add("3,10,10,10");
        set.add("3,10,10,11");
        set.add("3,10,10,13");
        set.add("3,10,11,11");
        set.add("3,10,12,12");
        set.add("3,10,12,13");
        set.add("3,10,13,13");
        set.add("3,11,11,11");
        set.add("3,11,11,13");
        set.add("3,11,12,13");
        set.add("3,11,13,13");
        set.add("3,13,13,13");
        set.add("4,4,4,13");
        set.add("4,4,5,9");
        set.add("4,4,6,6");
        set.add("4,4,6,7");
        set.add("4,4,7,11");
        set.add("4,4,9,9");
        set.add("4,4,9,10");
        set.add("4,4,9,13");
        set.add("4,4,10,11");
        set.add("4,4,11,11");
        set.add("4,4,13,13");
        set.add("4,5,5,11");
        set.add("4,5,5,12");
        set.add("4,5,5,13");
        set.add("4,5,9,11");
        set.add("4,6,6,11");
        set.add("4,6,6,13");
        set.add("4,6,7,11");
        set.add("4,6,7,13");
        set.add("4,6,8,11");
        set.add("4,6,9,11");
        set.add("4,6,10,13");
        set.add("4,6,11,13");
        set.add("4,7,7,9");
        set.add("4,7,7,10");
        set.add("4,7,7,12");
        set.add("4,7,7,13");
        set.add("4,7,10,13");
        set.add("4,8,10,13");
        set.add("4,9,9,9");
        set.add("4,9,9,11");
        set.add("4,9,9,13");
        set.add("4,9,10,10");
        set.add("4,9,11,13");
        set.add("4,9,12,13");
        set.add("4,9,13,13");
        set.add("4,10,10,10");
        set.add("4,10,10,13");
        set.add("4,10,11,11");
        set.add("4,10,13,13");
        set.add("4,11,11,11");
        set.add("4,11,11,12");
        set.add("4,11,11,13");
        set.add("4,11,12,12");
        set.add("4,11,13,13");
        set.add("4,12,12,13");
        set.add("4,12,13,13");
        set.add("4,13,13,13");
        set.add("5,5,5,7");
        set.add("5,5,5,8");
        set.add("5,5,5,10");
        set.add("5,5,5,11");
        set.add("5,5,5,13");
        set.add("5,5,6,9");
        set.add("5,5,6,10");
        set.add("5,5,6,12");
        set.add("5,5,6,13");
        set.add("5,5,7,9");
        set.add("5,5,7,12");
        set.add("5,5,7,13");
        set.add("5,5,9,12");
        set.add("5,5,9,13");
        set.add("5,5,10,12");
        set.add("5,6,6,11");
        set.add("5,6,6,13");
        set.add("5,6,7,10");
        set.add("5,6,7,11");
        set.add("5,6,8,11");
        set.add("5,7,7,7");
        set.add("5,7,7,8");
        set.add("5,7,7,12");
        set.add("5,7,7,13");
        set.add("5,7,8,11");
        set.add("5,7,8,12");
        set.add("5,7,8,13");
        set.add("5,7,9,9");
        set.add("5,7,11,12");
        set.add("5,7,12,13");
        set.add("5,8,8,11");
        set.add("5,8,8,12");
        set.add("5,8,9,9");
        set.add("5,8,9,10");
        set.add("5,8,10,10");
        set.add("5,8,10,13");
        set.add("5,8,11,11");
        set.add("5,8,12,13");
        set.add("5,8,13,13");
        set.add("5,9,9,9");
        set.add("5,9,9,10");
        set.add("5,9,9,13");
        set.add("5,9,10,12");
        set.add("5,9,11,11");
        set.add("5,9,11,12");
        set.add("5,9,13,13");
        set.add("5,10,10,10");
        set.add("5,10,11,12");
        set.add("5,10,11,13");
        set.add("5,10,12,12");
        set.add("5,11,11,11");
        set.add("5,11,11,12");
        set.add("5,11,11,13");
        set.add("5,11,12,13");
        set.add("5,11,13,13");
        set.add("5,12,12,12");
        set.add("5,12,12,13");
        set.add("5,12,13,13");
        set.add("5,13,13,13");
        set.add("6,6,6,7");
        set.add("6,6,6,13");
        set.add("6,6,7,7");
        set.add("6,6,7,8");
        set.add("6,6,7,13");
        set.add("6,6,9,9");
        set.add("6,6,10,10");
        set.add("6,6,10,11");
        set.add("6,6,11,11");
        set.add("6,6,13,13");
        set.add("6,7,7,7");
        set.add("6,7,7,8");
        set.add("6,7,7,9");
        set.add("6,7,7,12");
        set.add("6,7,7,13");
        set.add("6,7,8,8");
        set.add("6,7,8,13");
        set.add("6,7,9,10");
        set.add("6,7,9,11");
        set.add("6,7,9,13");
        set.add("6,7,10,11");
        set.add("6,7,13,13");
        set.add("6,8,8,13");
        set.add("6,8,10,10");
        set.add("6,8,12,13");
        set.add("6,9,9,9");
        set.add("6,9,9,13");
        set.add("6,9,10,10");
        set.add("6,9,10,13");
        set.add("6,9,11,11");
        set.add("6,9,13,13");
        set.add("6,10,10,11");
        set.add("6,10,10,12");
        set.add("6,10,11,11");
        set.add("6,10,11,13");
        set.add("6,10,13,13");
        set.add("6,11,11,11");
        set.add("6,11,11,13");
        set.add("6,11,13,13");
        set.add("6,13,13,13");
        set.add("7,7,7,7");
        set.add("7,7,7,8");
        set.add("7,7,7,9");
        set.add("7,7,7,10");
        set.add("7,7,7,11");
        set.add("7,7,7,13");
        set.add("7,7,8,8");
        set.add("7,7,8,9");
        set.add("7,7,8,10");
        set.add("7,7,8,12");
        set.add("7,7,8,13");
        set.add("7,7,9,9");
        set.add("7,7,9,11");
        set.add("7,7,9,12");
        set.add("7,7,9,13");
        set.add("7,7,10,10");
        set.add("7,7,10,11");
        set.add("7,7,10,12");
        set.add("7,7,11,11");
        set.add("7,7,13,13");
        set.add("7,8,8,8");
        set.add("7,8,9,9");
        set.add("7,8,9,11");
        set.add("7,8,10,12");
        set.add("7,8,11,11");
        set.add("7,8,13,13");
        set.add("7,9,9,9");
        set.add("7,9,9,10");
        set.add("7,9,9,11");
        set.add("7,9,9,12");
        set.add("7,9,10,10");
        set.add("7,9,10,13");
        set.add("7,9,11,13");
        set.add("7,9,12,13");
        set.add("7,10,10,10");
        set.add("7,10,10,13");
        set.add("7,10,11,11");
        set.add("7,10,11,12");
        set.add("7,10,13,13");
        set.add("7,11,11,11");
        set.add("7,11,11,12");
        set.add("7,11,11,13");
        set.add("7,11,12,12");
        set.add("7,11,12,13");
        set.add("7,11,13,13");
        set.add("7,12,12,12");
        set.add("7,12,13,13");
        set.add("7,13,13,13");
        set.add("8,8,8,8");
        set.add("8,8,8,9");
        set.add("8,8,9,9");
        set.add("8,8,9,10");
        set.add("8,8,10,10");
        set.add("8,8,10,11");
        set.add("8,8,11,11");
        set.add("8,8,13,13");
        set.add("8,9,9,9");
        set.add("8,9,9,10");
        set.add("8,9,9,11");
        set.add("8,9,9,13");
        set.add("8,9,10,10");
        set.add("8,9,10,11");
        set.add("8,9,13,13");
        set.add("8,10,10,10");
        set.add("8,10,10,11");
        set.add("8,10,10,13");
        set.add("8,10,11,12");
        set.add("8,10,11,13");
        set.add("8,11,11,11");
        set.add("8,11,11,12");
        set.add("8,11,11,13");
        set.add("8,11,12,13");
        set.add("8,11,13,13");
        set.add("8,12,12,12");
        set.add("8,12,12,13");
        set.add("8,12,13,13");
        set.add("8,13,13,13");
        set.add("9,9,9,9");
        set.add("9,9,9,10");
        set.add("9,9,9,11");
        set.add("9,9,9,13");
        set.add("9,9,10,10");
        set.add("9,9,10,11");
        set.add("9,9,10,12");
        set.add("9,9,11,11");
        set.add("9,9,13,13");
        set.add("9,10,10,10");
        set.add("9,10,10,11");
        set.add("9,10,10,12");
        set.add("9,10,11,11");
        set.add("9,10,13,13");
        set.add("9,11,11,12");
        set.add("9,11,11,13");
        set.add("9,12,12,13");
        set.add("9,12,13,13");
        set.add("9,13,13,13");
        set.add("10,10,10,10");
        set.add("10,10,10,11");
        set.add("10,10,11,11");
        set.add("10,10,13,13");
        set.add("10,11,11,11");
        set.add("10,11,13,13");
        set.add("11,11,11,11");
        set.add("11,11,13,13");
        set.add("13,13,13,13");

        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            String[] line = sc.nextLine().split(" ");
            int[] cards = new int[line.length];
            for (int i = 0; i < line.length; i++) {
                switch (line[i]) {
                    case "A":
                        cards[i] = 1;
                        break;
                    case "J":
                        cards[i] = 11;
                        break;
                    case "Q":
                        cards[i] = 12;
                        break;
                    case "K":
                        cards[i] = 13;
                        break;
                    default:
                        cards[i] = Integer.parseInt(line[i]);
                        break;
                }
            }
            // 排序
            Arrays.sort(cards);
            String args = cards[0] + "," + cards[1] + "," + cards[2] + "," + cards[3];
            System.out.println(set.contains(args) ? "No" : "Yes");
        }
    }

}
```