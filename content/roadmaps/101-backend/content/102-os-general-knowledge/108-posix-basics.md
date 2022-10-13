# POSIX 基础

POSIX（便携式操作系统接口）是一个用于保持操作系统之间兼容性的标准系列。它描述了符合标准的操作系统应该为软件提供的实用程序、API和服务，从而使程序从一个系统移植到另一个系统更加容易。

一个实际的例子：在类似Unix的操作系统中，有三个*标准流，`stdin`、`stdout`和`stderr`--它们是你在使用终端时可能会遇到的I/O连接，因为它们管理来自**标准输入**（stdin）、**标准输出**（stdout）和**标准错误**（stderr）的流。

因此，在这种情况下，当我们想与这些流中的任何一个进行交互时（例如通过一个进程），POSIX操作系统的API使之更容易--例如，在`<unistd.h>`C头中，stdin、stderr和stdout被定义为`STDIN_FILENO`、`STDERR_FILENO`和`STDOUT_FILENO`。

POSIX还为退出代码、文件系统语义和其他一些命令行实用程序接口惯例增加了一个标准。

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Official Documentation' href='https://linux.cn/article-14201-1.html'>什么是POSIX</BadgeLink>
<BadgeLink colorScheme='blue' badgeText='Official Documentation' href='https://pubs.opengroup.org/onlinepubs/9699919799/'>POSIX standard by IEEE</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://unix.stackexchange.com/a/220877'>Summary of some POSIX implementations</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.baeldung.com/linux/posix'>A guide to POSIX</BadgeLink>
