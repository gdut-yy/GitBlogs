
## 1、

	关于http协议以下说法不正确的是：
	1.304表示临时重定向
	2.range请求响应一定是用http状态码206表示成功
	3.http的header分割符是\r
	4.请求参数如果包含%，需要进行encode

	A. 1，3
	B. 1，4
	C. 2，3
	D. 2，4
	E. 3，4

	正确答案：A
	
	解析：

## 2、

	关于计算机网络，以下说法正确的是
	(1)在向下的过程中，需要添加下层协议所需要的首部或者尾部
	(2)在向上的过程中不断拆开首部和尾部
	(3)在向上的过程中，需要添加下层协议所需要的首部或者尾部
	(4)在向下的过程中不断拆开首部和尾部
	(5)SMTP属于TCP协议
	(6)POP3属于UDP协议
	(7)DNS属于TCP协议
	(8)Telnet属于UDP协议	
	
	(1)(2)(5)
	(1)(2)(6)
	(1)(2)(8)
	(3)(4)(5)(6)
	(3)(4)(5)(7)

	正确答案: A

	解析：略

## 3、
	已知一棵树具有10个节点，且度为4，那么：
	
	
	A. 该树的高度至少是6
	B. 该树的高度至多是6
	C. 该树的高度至少是7
	D. 该树的高度至多是7
	
	正确答案: D

	解析：节点的孩子个数称为节点的度。

## 4、

## 5、

## 6、



## 7、



## 8、


## 9、



## 10、


## 11、



## 12、

## 13、



## 14、



## 15、

	关于控件TextView的属性,下列使用正确的是 :
	
	A. layout_marginLeft为控件左边框,距离父容器的距离(外边距), paddingLeft为控件内部,距离控件左边框的距离(内边距)
	B. textview的scrollY属性可以用来设置这个view在其父view里面的相对垂直位置
	C. inputType为输入类型,可以选择输入纯符号,或者纯数字等.
	D. Gravity为内部文字摆放的位置,可以选择inside和outside.
	
	正确答案:A
	
	解析：


## 16、



## 17、

	关于listview说法下列错误的是:
	
	A. 如果希望使用listview,则必须有对应的适配器Adapter才能使其正常工作
	B. listview经常使用的Adapter有一个notifyDataSetChanged()方法,当数据有更新时一般会调用此方法通知listview重新渲染 ,此方法的缺陷是会导致listview视图重新回到最上面.
	C. ListView内部有缓存实现机制，但Adapter的getView实现还是需要自己判断convertView是否是null来做分支处理
	D. 在getView方法内是不允许做耗时操作的.
	
	正确答案: B
	
	解析：


## 18、

	关于布局容器,下列说法错误的是
	
	A. orientation属性只有LinearLayout才会用到,标识了子控件的摆放顺序.(横向还是纵向)
	B. ViewGroup是绝大多数布局容器的父类,一般复杂的自定义容器都会继承ViewGroup来做特殊修改.
	C. 一般情况下,子容器的大小是不可以超过父容器的,但是当属性clipChildren设置成false的时候除外.
	D. 当某一个子view被成功创建后,是可用通过addview方法被添加到多个不同的布局容器中去的.
	
	正确答案: D
	
	解析：

## 19、

	关于EditText的使用,下列说法错误的是:
	
	A. 可以通过setTypeface方法设置文字的字体
	B. addTextChangedListener方法可以为EditText设置输入过程的监听.
	C. android:digits属性限制EditText的输入字符,所有输入的字符必须在digits给出的范围内,否则无法输入到EditText文本框.
	D. EditText可以使用setEllipsize方法设置MARQUEE效果
	
	正确答案: D
	
	解析：

## 20、

	Android工程大部分使用gradle进行构建.下列关于gradle脚本相关说法错误的是	
	
	A. 一般在dependencies内添加各种三方引用,包括jar,module,aar,maven等.
	B. signingConfigs内用来配置签名文件,一般分release和debug两种配置.
	C. gradle的主体打包apk流程是：编译代码和资源，生成dex，生成apk，zipalign，签名
	D. defaultConfig内用来指定APP的版本号,最低运行版本,等
	
	正确答案: C
	
	解析：首先是编译过程，编译的内容包括本工程的文件以及依赖的各种库文件，编译的输出包括dex文件和编译后的资源文件。然后是打包过程。配合Keystore对第一步的输出进行签名对齐，生成最终的apk文件。