### 课程名称： SQL Server 数据库应用
### 考试时间：2018年4月23日

# 一、简单题（每小题 10 分，共 40 分）
1. 数据库技术产生于六十年代末，是数据管理的最新技术，是计算机科学的重要分支。请简述数据库系统的四个基本概念：数据，数据库，数据库管理系统，数据库系统。
2. 数据管理技术的发展过程经历过三个时期：人工管理阶段（20 世纪 40 年代中——50 年代中），文件系统阶段（20 世纪 50 年代末——60 年代中）与数据库系统阶段（20 世纪 60 年代末——现在）。请简述数据库系统（第三阶段）的主要特点，必要时请结合文件系统阶段（第二阶段）进行描述。
3. 请简述 SQL，高级编程语言（例如 C/C++，Python），数据库，数据库连接程序（ODBC/JDBC）等四者的概念与关联。
4. 试着画出并说明数据库的三级模式结构，并且简述三级模式之间的关系，以及 SQL 与三级模式的关系。

# 二、判断题（每小题 1 分，共 10 分）
1. （ ）数据库技术产生是20世纪60年代末，是数据管理（Management of Data）的最新技术，是计算机科学的重要分支。
2. （ ）关系型数据库是当今最大数据库公司 Oracle 于 1970 年提出的。
3. （ ）全码（All-Key）代表某一属性组的值能唯一地标示所有元组
4. （ ）主码（Primary Key）必须是唯一值但是可以为空
5. （ ）SQL 是 Microsoft（微软）公司的数据库语言标准，采用的是记录操作方式
6. （ ）数据库可以有多种模式（Schema）与外模式（External Schema），但是只能有一种内模式（Internal Schema）
7. （ ）视图（View）经常被用于储存中间临时数据，所以视图是比表更高级的数据存储方式
8. （ ）SQL 的字符串匹配中，“%”代表匹配一个字符，“_”代表匹配0个或者多个字符
9. （ ）下列查询语句（查询所有成绩为空的学生学号）是否正确：SELECT distinct(Sno) FROM SC WHERE grade = NULL;
10. （ ）HAVING 短语与 WHERE 短语作用对象不同，前者作用于组（Group），后者作用于表（Table）或者视图（View）

参考答案：

1. 正确。
2. 错误。IBM 公司。
3. 错误。
4. 错误。主码不可为 NULL。
5. 错误。
6. 错误。
7. 错误。
8. 错误。
9. 错误。NULL 时 “IS” 不能用 （=） 代替。
10. 正确。

# 三、分析题（每小题 5 分，共 10 分）
1. 请根据以下情况给出 E-R 图并给出你所理解的关系描述：

	a）部门与总经理的关系   
	b）部门与员工的关系    
	c）工程与员工的关系

2. 试着画出一个实际情况的 E-R 图，要求有三个实体型，三个实体类型选之间有多对多的联系。解释相关的联系。

# 四、SQL 语句题目（每小题 5 分，共 40 分）
在学生选课信息系统的数据库设计中，三种基本表如下：

学生表：student（<u>Sno</u>,Sname,Ssex,Sage,Sdept）

课程表：Course（<u>Cno</u>,Cname,Cpno,Ccredit）

学生选课表：SC（<u>Sno,Cno</u>,Grade）

分别代表学生，课程与选课三种数据，其数据内容如下：

### Student 表
| 学号 Sno | 姓名 Sname | 性别 Ssex | 年龄 Sage | 所在系 Sdept |
| - | :-: | :-: | :-: | :-: |
| 200215121 | 李勇 | 男 | 20 | CS |
| 200215122 | 刘晨 | 女 | 19 | CS |
| 200215123 | 王敏 | 女 | 18 | MA |
| 200215125 | 张立 | 男 | 19 | IS |
| 200215126 | 刘翔 | 男 | 30 | SPORT |
| 200215127 | 刘亦菲 | 女 | 25 | ART |

### Course 表
| 课程号 Cno | 课程名 Cname | 先行课 Cpno | 学分 Ccredit |
| :-: | :-: | :-: | :-: |
| 1 | 数据库 | 5 | 4 |
| 2 | 数学 | 1 | 2 |
| 3 | 信息系统 | 6 | 4 |
| 4 | 操作系统 | 7 | 3 |
| 5 | 数据结构 | 6 | 4 |
| 6 | 数据处理 |  | 2 |
| 7 | PASCAL 语言 |  | 4 |
| 8 | SQL_Server |  | 4 |

### SC 表
| 学号 Sno | 课程号 Cno | 成绩 Grade |
| :-: | :-: | :-: |
| 200215121 | 1 | 92 |
| 200215121 | 2 | 85 |
| 200215121 | 3 | 88 |
| 200215122 | 2 | 90 |
| 200215122 | 3 | 80 |

1. SQL 创建语句，写出三种表格的创建语句（SQL 格式或者 MYSQL 格式皆可）。<u>**要求如下**</u>：

	a）Student 表：（1）以学号为主码（2）姓名为非空并且<u>**被索引**</u>   
	b）Course 表：（1）课程号为主码（2）课程名为非空并且<u>**被索引**</u>（3）课程表先修课号为外码，参照引用自身的课程号   
	c）SC 表：（1）学号与课程号为主码（2）学号与课程号都为外码，分别参照引用 Student 表的学号与 Course 表的课程号

2. 字符串操作

	a）写出 SQL 语句，找到 Student 表中的刘姓学生且姓名长度不超过3（姓名长度包括 2 或者 3）。   
	b）找到 Course 表中课程名包含“SQL_”的课程

3. 分组查询：

	a）查询所有选修人数超过了 40 人的课程号   
	b）将课程的课程号以及该课程号的平均成绩定义为<u>**一个视图**</u>，假设 SC 表中的 Grade 为数字型

4. 连接嵌套查询：找出信息系统系（IS）的学生以及所有女生

	a）使用 UNION 语法    
	b）使用 OR 条件语法

5. 子查询：

	a）查询艺术系（ART）年纪所有的女生年纪都小的<u>**女生姓名与年龄**</u>。   
	b）查询与“刘亦菲”在同一门课程学习的<u>**其他学生**</u>。

----

参考答案：
### 1 SQL 创建语句，写出三种表格的创建语句（SQL 格式或者 MYSQL 格式皆可）。
	CREATE TABLE `student` (
	  `Sno` int(11) NOT NULL,
	  `Sname` varchar(45) NOT NULL,
	  `Ssex` varchar(45) DEFAULT NULL,
	  `Sage` int(11) DEFAULT NULL,
	  `Sdept` varchar(45) DEFAULT NULL,
	  PRIMARY KEY (`Sno`),
	  UNIQUE KEY `Stusname` (`Sname`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;

----
	
	CREATE TABLE `course` (
	  `Cno` int(11) NOT NULL,
	  `Cname` varchar(45) NOT NULL,
	  `Cpno` int(11) DEFAULT NULL,
	  `Ccredit` varchar(45) DEFAULT NULL,
	  PRIMARY KEY (`Cno`),
	  KEY `Coucname` (`Cname`),
	  KEY `Cpno_idx` (`Cpno`),
	  CONSTRAINT `Cpno` FOREIGN KEY (`Cpno`) REFERENCES `course` (`Cno`) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;

----
	
	CREATE TABLE `sc` (
	  `Sno` int(11) NOT NULL,
	  `Cno` int(11) NOT NULL,
	  `Grade` int(11) DEFAULT NULL,
	  PRIMARY KEY (`Sno`,`Cno`),
	  KEY `SCcno_idx` (`Cno`),
	  CONSTRAINT `SCcno` FOREIGN KEY (`Cno`) REFERENCES `course` (`Cno`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT `SCsno` FOREIGN KEY (`Sno`) REFERENCES `student` (`Sno`) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;

### 2 字符串操作

	SELECT * 
	FROM ggg.student 
	WHERE Sname like '刘%' AND (Sname)<=3*3;		/*MySQL 5.+ 中 UTF－8：一个汉字＝3个字节 GBK：一个汉字＝2个字节*/
	
---

	SELECT * 
	FROM ggg.course
	where Cname like '%SQL\_%' escape '\\';		/*MySQL 中'\'本身即为转义字符*/

	SELECT * 
	FROM ggg.course
	where Cname like '%SQL\_%';

	SELECT * 
	FROM ggg.course
	where Cname like '%SQL/_%' escape '/';

### 3 分组查询
	select cno
	from sc
	group by cno
	having count(*)>40;

----

	create view scview as
		select cno,avg(grade)
		from sc
		group by cno;

### 4 连接嵌套查询：找出信息系统系（IS）的学生以及所有女生

	SELECT * 
	FROM ggg.student 
	WHERE Sdept='IS'
	union 
	SELECT * 
	FROM ggg.student 
	WHERE Ssex='女';

----
	
	SELECT * 
	FROM ggg.student 
	WHERE Sdept='IS' OR Ssex='女';

### 5 子查询

？

----
	select *
	from ggg.student
	where sno in(
		select distinct sno
		from ggg.sc
		where cno in (
			select cno
			from ggg.sc
			where sno=(
				SELECT sno
				FROM ggg.student 
				WHERE Sname='刘亦菲')));