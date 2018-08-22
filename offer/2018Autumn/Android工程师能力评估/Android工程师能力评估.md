使用AIDL完成远程service方法调用下列说法不正确的是
正确答案: A   你的答案: A (正确)

aidl对应的接口名称不能与aidl文件名相同
aidl的文件的内容类似java代码
创建一个Service（服务），在服务的onBind(Intent intent)方法中返回实现了aidl接口的对象
aidl对应的接口的方法前面不能加访问权限修饰符

2
关于ServiceConnection接口的onServiceConnected()方法的触发条件描述正确的是？
正确答案: B   你的答案: B (正确)

bindService()方法执行成功后
bindService()方法执行成功同时onBind()方法返回非空IBinder对象
Service的onCreate()方法和onBind()方法执行成功后
Service的onCreate()和onStartCommand()方法启动成功后

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

Resources$NotFoundException
ViewRootImpl$CalledFromWrongThreadException
NullPointerException
运行正常，mTextViewUser组件上显示内容为10

遇到下列哪种情况时需要把进程移到前台?
正确答案: D   你的答案: D (正确)

进程正在运行一个与用户交互的Activity ，它的onResume()方法被调用
进程有一正在运行的BroadcastReceiver，它的onReceive()方法正在执行
进程有一个Service，并且在Service的某个回调函数（onCreate()、onStart()、或onDestroy()）内有正在执行的代码
所有选项均正确
进程有一个Service，该Service对应的Activity正在与用户交互

关于广播以下陈述正确的是( ).
正确答案: D   你的答案: D (正确)

广播接收器只能在配置文件中注册
广播接收器注册后不能注销
广播接收器只能接收自定义的广播消息
广播接收器可以在Activity中单独注册与注销

使用Toast提示时,关于提示时长,下面说法正确的是( ).
正确答案: A   你的答案: A (正确)

显示时长默认只有2种设置
可以自定义显示时长
传入30时,提示会显示30秒钟
当自定义显示时长时,比如传入30,程序会抛出异常

在一个布局文件中,对一个EditText进行设置,以下哪项设置能实现输入框默认提示内容的效果( ).
正确答案: B   你的答案: B (正确)

android:capitalize
android:hint
android:singleLine
android:text

关于AlertDialog描述错误的是( ).
正确答案: D   你的答案: D (正确)

show()方法创建并显示对话框
AlertDialog.Builder的create() 和show()方法都返回AlertDialog对象
AlertDialog不能直接用new关键字构建对象,而必须使用其内部类Builder
create()方法创建并显示对话框

Intent传递数据时，下列的数据类型哪些可以被传递
正确答案: A B C D   你的答案: A B C D (正确)

Serializable
CharSequence
Parcelable
Bundle

在android中使用Menu时可能需要重写的方法有?
正确答案: A C   你的答案: A C D (错误)

onCreateOptionsMenu()
onCreateMenu()
onOptionsItemSelected()
onItemSelected()	

android中使用SQLiteOpenHelper这个辅助类时，可以生成一个数据库，并可以对数据库进行管理的方法可以是?
正确答案: A B   你的答案: A B (正确)

getWriteableDatabase()
getReadableDatabase()
getDatabase()
getAbleDatabase()

android 关于service生命周期的onCreate()和onStart()说法正确的是?
正确答案: A D   你的答案: A D (正确)

当第一次启动的时候先后调用onCreate()和onStart()方法
当第一次启动的时候只会调用onCreate()方法
如果service已经启动，将先后调用onCreate()和onStart()方法
如果service已经启动，只会执行onStart()方法，不在执行onCreate()方法

下列对android NDK的理解正确的是
正确答案: A B C D   你的答案: A B C D (正确)

NDK是一系列工具的集合
NDK 提供了一份稳定、功能有限的 API 头文件声明
使 “Java+C” 的开发方式终于转正，成为官方支持的开发方式
NDK 将是 Android 平台支持 C 开发的开端

有关Activity生命周期描述正确的是
正确答案: B C   你的答案: A C (错误)

设置Activity的android:screenOrientation="portrait"属性时，切换屏幕横纵方向时不会重新调用各个生命周期，只会执行onConfigurationChanged方法
未设置Activity的android:configChanges属性，切换屏幕横纵方向时会重新调用onCreate()方法
当再次启动某个launchMode设置为singletask的Activity，它的onNewIntent()方法会被触发
用户正在操作某个Activity，这时如果其他应用程序需要内存，系统会将用户当前操作的Activity强制关闭

下列哪些情况下系统会程序抛出异常，强制退出
正确答案: B C   你的答案: B C (正确)

应用运行时，Main线程进行了耗时操作
应用运行时抛出了OutOfMemoryError
应用运行时抛出了RuntimeException
应用运行时，用户操作过于频繁

Android系统对下列哪些对象提供了资源池
正确答案: A C   你的答案: A C (正确)

Message
Thread
AsyncTask
Looper

下列关于IntentService与Service的关系描述错误的是
正确答案: C D   你的答案: C D (正确)

IntentService是Service的子类
IntentService在运行时会启动新的线程来执行任务
启动方式不同
没有区别

下面关于Android中定义style和theme的描述正确的是？
正确答案: A B D   你的答案: A B C (错误)

都可以减少重复属性设置
style可以作用在Activity上
Theme类可以继承
一个TextView的style中定义了textColor属性，TextView本身也设置textColor属性，那么TextView本身定义的优先级较高

19
在一个ListView中，显示的行布局有多种不同形式，例如某些行只有ImageView，而另外一些行只有TextView，需要重写哪几个方法？
正确答案: A B C D   你的答案: A B C D (正确)

getCount()
getItemId()
getItemViewType()
getViewTypeCount()

使用SimpleAdapter作为 ListView的适配器，行布局中支持下列哪些组件？
正确答案: A C D   你的答案: A D (错误)

TextView
ProgressBar
CompoundButton
ImageView