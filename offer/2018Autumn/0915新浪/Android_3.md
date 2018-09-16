### [编程题-Android方向|10分] 找出数组中重复次数最大的值以及对应的重复次数

## 题目描述
有一个整型数组，请编写代码，输出重复次数最多的item的值，以及重复次数
## 输入描述
字符串列表，以换行符（\n）进行分割

## 输出描述
value = 数据值 count = 最大重复次数
## 示例1

### 输入
	1
	2
	1
	1
### 输出
	value = 1 count = 3

----

本地IDE跑没问题，牛客网数组越界。。

	import java.util.*;
	
	public class Main {
	    public static void main(String[] args) {
	        Map<Integer, Integer> map = new HashMap<>();
	        Scanner scanner = new Scanner(System.in);
	        do {
	            String string = scanner.nextLine();
	            if (string.equals("")) {
	                break;
	            }
	            int in;
	            if (string != null && string.length() > 0) {
	                in = Integer.valueOf(string);
	                if (map.containsKey(in)) {
	                    int cnt = map.get(in);
	                    cnt++;
	                    map.remove(in);
	                    map.put(in, cnt);
	                } else {
	                    map.put(in, 1);
	                }
	            }
	        } while (true);
	        int ans1 = 0, ans2 = 0;
	        for (Integer i : map.keySet()) {
	            if (map.get(i) > ans2) {
	                ans2 = map.get(i);
	                ans1 = i;
	            }
	        }
	        System.out.println("value = " + ans1 + " count = " + ans2);
	        scanner.close();
	    }
	}