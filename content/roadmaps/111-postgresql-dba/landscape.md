本指南的目的是给你一个关于DBA的概念，如果你感到困惑，可以帮助指导你的学习。路线图是非常有主见的--既不需要知道路线图中列出的所有内容，也不需要为了成为一名DBA而遵循路线图中给出的项目顺序。

## 学习基本的RDBMS术语和概念
对Postgres的关键术语和基本的RDBMS概念有基本了解。

- **对象模型**：数据类型，列，行，表，模式，数据库，查询。
- **关系模型**：域、属性、图元、关系、约束、NULL。
- **数据库的高级概念**。ACID、MVCC、事务、写头日志、查询处理。
- **链接**:
  - [Postgres术语](https://www.postgresql.org/docs/13/glossary.html) 
  - SQL和关系理论 - Christopher J. Date, 2009
  - 数据库设计和关系理论 - Christopher J. Date, 2012

## 学习如何安装和运行PostgreSQL
获得如何设置和运行Postgres的实际技能，为进一步学习获得一个工作环境。

- 使用软件包管理器(APT, YUM, 等)
- 使用`docker`。
- 使用`systemd`管理Postgres服务（启动、停止、重启、重新加载）。
- 使用`pg_ctl`或操作系统特定工具（如`pg_ctlcluster`）管理Postgres服务。
- 使用`psql`连接到Postgres。
- 在云环境中部署数据库服务（AWS, GCE, Azure, Heroku, DigitalOcean, etc...）。
- **链接**:
  - [官方下载和安装说明](https://www.postgresql.org/download/) 
  - [官方Docker图像](https://hub.docker.com/_/postgres) 

## 学习SQL概念
获得如何创建和操作数据库对象的实际技能，以及如何使用`psql`客户端执行查询。
- 理解基本的数据类型。
- **DML查询**：查询数据、修改数据、过滤数据、连接表。
  - **高级主题**：事务，CTE，子查询，横向连接，分组，集合操作。
- **DDL查询**：管理表和模式（创建、更改、删除）。
- 使用 "COPY "导入和导出数据。
- **链接**:
  - [DB Fiddle](https://www.db-fiddle.com/) 
  - [PostgreSQL教程](https://www.postgresqltutorial.com/) 
  - [PostgreSQL SQL入门](https://www.postgresql.org/docs/current/tutorial-sql.html)  
  - [The SQL Language](https://www.postgresql.org/docs/current/sql.html)

## 学习如何配置Postgres
了解如何配置Postgres的主要方面。这里还不需要对Postgres的内部结构有深入的了解。

- postgresql.conf:
  - 资源的使用
  - 写在前面的日志
  - 检查点和后台写程序
  - 基于成本的真空和自动真空
  - 复制
  - 查询计划器
  - 报告、日志和统计
  - 添加额外的扩展
  - ...继续探索其他配置选项
- **链接**。
  - [Postgresqlco.nf](http://postgresqlco.nf/) 

## 学习Postgres安全概念
了解基本的安全概念和如何部署安全配置的常用方法。
- 认证模型、角色、pg_hba.conf、SSL设置。
- **对象的权限**：授予/撤销，默认权限。
- **高级主题** - 行级安全，selinux。
- **链接**:
  - [客户端认证](https://www.postgresql.org/docs/current/client-authentication.html)  
  - [角色和用户管理](https://www.postgresql.org/docs/current/user-manag.html)

## 开发基础设施DBA技能
获得关于如何部署、扩展、维护和支持Postgres安装和第三方Postgres生态系统软件的实际技能。
- **复制**：流复制，逻辑复制
- **备份/恢复工具**。
  - 内置：`pg_dump`, `pg_dumpall`, `pg_restore`, `pg_basebackup`。
  - 第三方的。`barman`, `pgbackrest`, `pg_probackup`, `WAL-G`.
  - 备份验证程序
- **升级程序**
  - 使用`pg_upgrade`进行小的和大的升级
  - 使用逻辑复制进行升级
- **连接池**:
  - `Pgbouncer'.
  - 替代方案。`Pgpool-II`, `Odyssey`, `Pgagroal`.
- **基础设施监控**: `Prometheus', `Zabbix', 其他喜欢的监控解决方案
- **高可用性和集群管理工具**:
  - `Patroni`.
  - **替代方案**: `Repmgr`, `Stolon`, `pg_auto_failover`, `PAF`。
- **应用程序的负载平衡和服务发现**: `Haproxy`, `Keepalived`, `Consul`, `Etcd`.
- **在`Kubernetes`上部署Postgres**: 简单的 "StatefulSet "设置，"HELM"，运营商
- 资源使用和配置，容量规划

## 学习如何实现常规的自动化
获得实用的技能，学习自动化工具，使现有的常规任务自动化。
- 使用shell脚本或任何其他喜欢的语言（`Bash', `Python', `Perl', 等）实现自动化。
- 配置管理：`Ansible', `Salt', `Chef', `Puppet'.

## 开发应用DBA技能
学习理论并获得实际技能，了解应用程序应如何与Postgres一起工作。
- **迁移**。
  - 实用模式和反模式
  - 工具。`liquibase`，`sqitch`，特定语言的工具
- 数据导入/导出，批量加载和处理
- **队列**。
  - 实用模式和反模式
  - `Skytools PGQ
- 数据分区和分片模式。
- 数据库规范化和正常形式。
- 书籍。
  - The Art of PostgreSQL - Dimitri Fontaine, 2020

## 学习Postgres高级主题
在这里，不断扩展和发展关于Postgres的现有知识是很重要的。
- **低级别的内部结构**。
  - 进程和内存结构
  - 真空处理
  - 缓冲区管理
  - 锁定管理
  - [物理存储和文件布局](https://www.postgresql.org/docs/current/storage.html) 
  - [系统目录](https://www.postgresql.org/docs/current/catalogs.html) 
- **细粒度的调整**。
  - 每个用户、每个数据库的设置
  - [存储参数](https://www.postgresql.org/docs/current/sql-createtable.html#SQL-CREATETABLE-STORAGE-PARAMETERS) 
  - 与工作负载有关的调整。oltp, olap, htap
- **高级SQL主题**。
  - PL/pgSQL，程序和函数，触发器
  - 聚合和窗口函数
  - 递归CTE
- **链接**:
  - 用于数据库管理员和系统开发人员的[The Internals of PostgreSQL](http://www.interdb.jp/pg/index.html)
  - [PL/pgSQL指南](https://www.postgresql.org/docs/current/plpgsql.html)

## 学习Postgres故障排除技术
获得对故障排除工具的基本了解，并获得如何检测和解决问题的实际技能。
- **操作系统工具**
  - `top` (`htop`, `atop`)
  - `sysstat
  - `IOTOP'.
- **Postgres系统视图**
  - `pg_stat_activity`(活动)
  - `pg_stat_statements'（报表）。
- **Postgres工具**
  - `pgcenter` - *个人建议*.
- **查询分析**。
  - [EXPLAIN](https://www.postgresql.org/docs/current/sql-explain.html)
  - [Depesz](https://explain.depesz.com/) 在线EXPLAIN可视化工具
  - [PEV](https://tatiyants.com/pev/#/plans) 在线EXPLAIN可视化工具
  - [Tensor](https://explain.tensor.ru/) 在线EXPLAIN可视化工具，仅适用于RU语言。
- **日志分析**。
  - `pgBadger
  - 使用 "grep"、"awk"、"sed "等进行特别分析。
- **外部跟踪/归档工具**: `gdb`, `strace`, `perf-tools`, `ebpf`, core dumps
- **故障排除方法**。使用、红色、金色信号
- **链接**:
  - [Linux性能](http://www.brendangregg.com/linuxperf.html) 作者：Brendan Gregg
  - [USE方法](http://www.brendangregg.com/usemethod.html)

## 学习SQL优化技术
了解并掌握如何优化SQL查询的实用技巧。
- **索引，以及它们的使用情况**。B-tree, Hash, GiST, SP-GiST, GIN, BRIN
- SQL查询模式和反模式
- SQL模式的设计模式和反模式
- **链接**。
  - Use the Index, Luke](https://use-the-index-luke.com/) - a Guide to Database Performance for Developers
- **书**:
  - SQL Antipatterns: 避免数据库编程的陷阱 - Bill Karwin，2010年 

## 开发架构师技能
深入了解Postgres的使用案例，以及Postgres在哪些方面适合，哪些方面不适合。
- **Postgres的分叉和扩展**。`Greenplum`, `Timescaledb`, `Citus`, `Postgres-XL`, 等等。
- 一般的RDBMS，好处和限制
- Postgres与其他RDBMS和NoSQL数据库之间的区别

## 开发Postgres黑客技能
参与Postgres社区，为Postgres做出贡献；成为Postgres和开源社区的有用成员；利用个人经验帮助他人。
- 每天在[邮件列表]中阅读和回答(https://www.postgresql.org/list/)
  - pgsql-general
  - pgsql-admin
  - pgsql-performance
  - pgsql-hackers
  - pgsql-bug
- Reviewing patches
- Writing patches, attending in [Commitfests](https://commitfest.postgresql.org/)

<br />
<br />
<br />
