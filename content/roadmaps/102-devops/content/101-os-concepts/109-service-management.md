# 服务管理（systemd）

`systemd`是一个**系统**管理的**D**aemon，它取代了sysvinit进程，成为PID=1的第一个进程，在Linux启动过程中在用户空间被执行。这是一个专门为Linux内核设计的系统。它现在被用作init.d的**替代物，以克服它的缺点。它使用`systemctl`命令来执行相关操作。

例如：`$ systemctl start [service-name]`, `$ systemctl poweroff`。

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/linux-systemd-and-its-components/'>What is systemd? and its commands</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://uace.github.io/learning/init-vs-systemd-what-is-an-init-daemon'>init.d vs systemd</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.tecmint.com/systemd-replaces-init-in-linux/'>Why Systemd as a replacement of init.d?</BadgeLink>