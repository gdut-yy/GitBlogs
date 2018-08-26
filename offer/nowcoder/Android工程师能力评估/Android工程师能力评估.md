# Android工程师能力评估

## 1
	使用AIDL完成远程service方法调用下列说法不正确的是
	
	正确答案: A   你的答案: A (正确)
	
	A. aidl对应的接口名称不能与aidl文件名相同
	B. aidl的文件的内容类似java代码
	C. 创建一个Service（服务），在服务的onBind(Intent intent)方法中返回实现了aidl接口的对象
	D. aidl对应的接口的方法前面不能加访问权限修饰符

## 2
	关于ServiceConnection接口的onServiceConnected()方法的触发条件描述正确的是？
	
	正确答案: B   你的答案: B (正确)
	
	A. bindService()方法执行成功后
	B. bindService()方法执行成功同时onBind()方法返回非空IBinder对象
	C. Service的onCreate()方法和onBind()方法执行成功后
	D. Service的onCreate()和onStartCommand()方法启动成功后

## 3
	阅读代码回答运行结果
	
		public classMainActivity extends Activity implements OnClickListener
		{
		   private Button mBtnLogin = (Button) findViewById(R.id.btn_login);
		   private TextView mTextViewUser;
		  
		   @Override
		   protected void onCreate(BundlesavedInstanceState)
		   {
		        super.onCreate(savedInstanceState);
		        setContentView(R.layout.activity_main);
		        mTextViewUser = (TextView) findViewById(R.id.textview_user);
		        mBtnLogin.setOnClickListener(this);
		        new Thread()
		        {
		            @Override
		            public void run()
		            {
		                mTextViewUser.setText(10);
		            }
		        }.start();
		   }
		  
		   @Override
		   public void onClick(View v)
		   {
		        mTextViewUser.setText(20);
		   }
		}
	
	正确答案: C   你的答案: C (正确)
	
	A. Resources$NotFoundException
	B. ViewRootImpl$CalledFromWrongThreadException
	C. NullPointerException
	D. 运行正常，mTextViewUser组件上显示内容为10

## 4

	遇到下列哪种情况时需要把进程移到前台?
	
	正确答案: D   你的答案: D (正确)
	
	A. 进程正在运行一个与用户交互的Activity ，它的onResume()方法被调用
	B. 进程有一正在运行的BroadcastReceiver，它的onReceive()方法正在执行
	C. 进程有一个Service，并且在Service的某个回调函数（onCreate()、onStart()、或onDestroy()）内有正在执行的代码
	D. 所有选项均正确
	E. 进程有一个Service，该Service对应的Activity正在与用户交互


## 5
	关于广播以下陈述正确的是( ).
	
	正确答案: D   你的答案: D (正确)
	
	A. 广播接收器只能在配置文件中注册
	B. 广播接收器注册后不能注销
	C. 广播接收器只能接收自定义的广播消息
	D. 广播接收器可以在Activity中单独注册与注销

## 6
	使用Toast提示时,关于提示时长,下面说法正确的是( ).
	
	正确答案: A   你的答案: A (正确)
	
	A. 显示时长默认只有2种设置
	B. 可以自定义显示时长
	C. 传入30时,提示会显示30秒钟
	D. 当自定义显示时长时,比如传入30,程序会抛出异常
## 7
	在一个布局文件中,对一个EditText进行设置,以下哪项设置能实现输入框默认提示内容的效果( ).
	
	正确答案: B   你的答案: B (正确)
	
	A. android:capitalize
	B. android:hint
	C. android:singleLine
	D. android:text
## 8
	关于AlertDialog描述错误的是( ).
	
	正确答案: D   你的答案: D (正确)
	
	A. show()方法创建并显示对话框
	B. AlertDialog.Builder的create() 和show()方法都返回AlertDialog对象
	C. AlertDialog不能直接用new关键字构建对象,而必须使用其内部类Builder
	D. create()方法创建并显示对话框
## 9
	Intent传递数据时，下列的数据类型哪些可以被传递
	
	正确答案: A B C D   你的答案: A B C D (正确)
	
	A. Serializable
	B. CharSequence
	C. Parcelable
	D. Bundle
## 10
	在android中使用Menu时可能需要重写的方法有?
	
	正确答案: A C   你的答案: A C D (错误)
	
	A. onCreateOptionsMenu()
	B. onCreateMenu()
	C. onOptionsItemSelected()
D. onItemSelected()	
## 11
	android中使用SQLiteOpenHelper这个辅助类时，可以生成一个数据库，并可以对数据库进行管理的方法可以是?
	
	正确答案: A B   你的答案: A B (正确)
	
	A. getWriteableDatabase()
	B. getReadableDatabase()
	C. getDatabase()
	D. getAbleDatabase()
## 12
	android 关于service生命周期的onCreate()和onStart()说法正确的是?
	
	正确答案: A D   你的答案: A D (正确)
	
	A. 当第一次启动的时候先后调用onCreate()和onStart()方法
	B. 当第一次启动的时候只会调用onCreate()方法
	C. 如果service已经启动，将先后调用onCreate()和onStart()方法
	D. 如果service已经启动，只会执行onStart()方法，不在执行onCreate()方法
## 13
	下列对android NDK的理解正确的是
	
	正确答案: A B C D   你的答案: A B C D (正确)
	
	A. NDK是一系列工具的集合
	B. NDK 提供了一份稳定、功能有限的 API 头文件声明
	C. 使 “Java+C” 的开发方式终于转正，成为官方支持的开发方式
	D. NDK 将是 Android 平台支持 C 开发的开端
## 14
	有关Activity生命周期描述正确的是
	
	正确答案: B C   你的答案: A C (错误)
	
	A. 设置Activity的android:screenOrientation="portrait"属性时，切换屏幕横纵方向时不会重新调用各个生命周期，只会执行onConfigurationChanged方法
	B. 未设置Activity的android:configChanges属性，切换屏幕横纵方向时会重新调用onCreate()方法
	C. 当再次启动某个launchMode设置为singletask的Activity，它的onNewIntent()方法会被触发
	D. 用户正在操作某个Activity，这时如果其他应用程序需要内存，系统会将用户当前操作的Activity强制关闭
## 15
	下列哪些情况下系统会程序抛出异常，强制退出
	
	正确答案: B C   你的答案: B C (正确)
	
	A. 应用运行时，Main线程进行了耗时操作
	B. 应用运行时抛出了OutOfMemoryError
	C. 应用运行时抛出了RuntimeException
	D. 应用运行时，用户操作过于频繁
## 16
	Android系统对下列哪些对象提供了资源池
	
	正确答案: A C   你的答案: A C (正确)
	
	A. Message
	B. Thread
	C. AsyncTask
	D. Looper
## 17
	下列关于IntentService与Service的关系描述错误的是
	
	正确答案: C D   你的答案: C D (正确)
	
	A. IntentService是Service的子类
	B. IntentService在运行时会启动新的线程来执行任务
	C. 启动方式不同
	D. 没有区别
## 18
	下面关于Android中定义style和theme的描述正确的是？
	
	正确答案: A B D   你的答案: A B C (错误)
	
	A. 都可以减少重复属性设置
	B. style可以作用在Activity上
	C. Theme类可以继承
	D. 一个TextView的style中定义了textColor属性，TextView本身也设置textColor属性，那么TextView本身定义的优先级较高

## 19
	在一个ListView中，显示的行布局有多种不同形式，例如某些行只有ImageView，而另外一些行只有TextView，需要重写哪几个方法？
	
	正确答案: A B C D   你的答案: A B C D (正确)
	
	A. getCount()
	B. getItemId()
	C. getItemViewType()
	D. getViewTypeCount()
## 20
	使用SimpleAdapter作为 ListView的适配器，行布局中支持下列哪些组件？
	
	正确答案: A C D   你的答案: A D (错误)
	
	A. TextView
	B. ProgressBar
	C. CompoundButton
	D. ImageView