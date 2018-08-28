## 面试题 02：实现 Singleton 模式

题目：设计一个类，我们只能生成该类的一个实例。

----

单例，背就完事了。

----

### 1、单元素枚举类型

	public enum Elvis {
		INSTANCE;
	
		public void leaveTheBuilding() { ... }
	}

### 2、“double check” 双重检查 + volatile关键字
	public class Singleton {
        private static volatile Singleton instance;

        private Singleton() {
        }

        public static Singleton getInstance() {
            if (instance == null) {
                synchronized (Singleton.class) {
                    if (instance == null) {
                        instance = new Singleton();
                    }
                }
            }
            return instance;
        }
    }

### 3、静态内部类

	public static class Singleton {
        private static final class SingletonHolder {
            private static final Singleton INSTANCE = new Singleton();
        }

        private Singleton() {
        }

        public static Singleton getInstance() {
            return SingletonHolder.INSTANCE;
        }
    }


### 4、“饿汉式”单例

	public static class Singleton {
        private static final Singleton INSTANCE = new Singleton();

        private Singleton() {
        }

        public static Singleton getInstance() {
            return INSTANCE;
        }
    }