# Memcached

Memcached（发音为mem-cash-dee或mem-cashed）是一个通用的分布式内存缓存系统。它经常被用来加速动态数据库驱动的网站，通过在RAM中缓存数据和对象来减少必须读取外部数据源（如数据库或API）的次数。Memcached是免费的开源软件，在修订的BSD许可证下授权。Memcached可以在类Unix操作系统（Linux和macOS）和微软Windows上运行。它依赖于`libevent`库。

Memcached的API提供了一个分布在多台机器上的非常大的哈希表。当表满的时候，后续的插入会导致较旧的数据按照最近使用最少的顺序（LRU）被清除。使用Memcached的应用程序通常会将请求和添加的数据分层到RAM中，然后再回落到一个较慢的备份存储，如数据库。

Memcached没有内部机制来跟踪可能发生的失误。然而，一些第三方的工具提供了这个功能。

<ResourceGroupTitle>Free Content</ResourceGroupTitle>

<BadgeLink colorScheme='yellow' badgeText='Read' href='https://en.wikipedia.org/wiki/Memcached'>Memcached, From Wikipedia</BadgeLink>

<BadgeLink colorScheme='yellow' badgeText='Read' href='https://github.com/memcached/memcached#readme'>Memcached, From Official Github</BadgeLink>

<BadgeLink colorScheme='green' badgeText='Course' href='https://www.tutorialspoint.com/memcached/index.htm'>Memcached Tutorial</BadgeLink>
