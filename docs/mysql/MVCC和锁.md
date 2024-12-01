通过线上真实案例，提出问题。

要搞懂这个问题，我们需要从事务开始讲起，因为行级锁就是了保证事务的隔离性的。

1. 提问：事务的四大特性是什么？
2. 事务并发执⾏遇到的问题？事务的四个隔离级别是什么？演示各种现象。
脏写：如果⼀个事务修改了另⼀个未提交事务修改过的数据
脏读：如果⼀个事务读到了另⼀个未提交事务修改过的数据
不可重复读：在一个事务内多次读取同一个数据，如果出现前后两次读到的数据不一样的情况
幻读：在一个事务内同一个查询在不同的时间产生不同的结果集
3. 提问：在可重复读级别下是否存在幻读？演示幻读在可重复读级别下的现象
4. mysql怎么实现这些隔离级别的，通过MVCC和锁。【查看undo日志图】，讲解MVCC原理
5. 解决脏读、不可重复读、幻读的方式有MVCC或者加锁
- 事务利⽤MVCC进⾏的读取操作称之为⼀致性读[快照读]
- 事务利⽤for update读取操作称之为锁定读[当前读]
6. 锁结构
锁其实是⼀个内存中的数据结构，当⼀个事务想对这某条记录做修改时，⾸先会检查内存中有没有与这条记录关联的锁结构，当没有的时候就会在内存中⽣成⼀个锁结构与之关联。
锁的内存结构
  trx信息
  索引信息
  type_mode:32位的数，被分成了:
     lock_mode:锁的模式,IS锁,IX锁,S锁,X锁,AUTO-INC锁
     lock_type:表级锁,⾏级锁
     rec_lock_type:⾏锁的具体类型,next-key锁,gap锁,记录锁,插⼊意向锁
     is_waiting：是否锁成功

全局锁
flush tables with read lock
unlock tables

表级锁
- 表锁
lock tables t_stuent write;
unlock tables
- 元数据锁MDL，举例锁等待
对一张表进行 CRUD 操作时，加的是 MDL 读锁；
对一张表做结构变更操作的时候，加的是 MDL 写锁；
【事务a】 begin;
【事务a】 select * from oc_customer where customer_id=53;
【事务b】 select * from oc_customer where customer_id=53;
【事务c】 alter table oc_customer add age int  default 0;
【事务b】 select * from oc_customer where customer_id=53;

- AUTO_INCR锁
- 表意向锁
在InnoDB 引擎的表里对某些记录加上锁」之前，需要先在表级别加上一个表意向锁

行级锁
- record lock
- gap lock
- next-key lock
行锁例子
- 查询主键（等值查询/不存在，范围查询/不存在）
- 唯一索引（等值查询/不存在，范围查询/不存在）
- 二级索引查询（等值查询/不存在，范围查询/不存在）
- join查询
- 子查询
- 索引合并情况查询

7. 问题：yzc库的隔离级别为什么是RC


