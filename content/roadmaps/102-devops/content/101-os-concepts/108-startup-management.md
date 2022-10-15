# 启动管理(init.d)

`init.d`是一个守护进程，是Linux系统的**第一个进程**（PID=1）。然后其他进程、服务、守护进程和线程都由init启动。人们可以在*'/etc/init.d'*位置编写自己的脚本，在系统启动时自动启动服务。服务可以通过使用 "service "命令手动启动和停止。

它的语法如下。`$ service [service_name] [action]` 例如：`$ service ssh start`。

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.freecodecamp.org/news/the-linux-booting-process-6-steps-described-in-detail/'>Linux Booting Process</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/what-is-init-d-in-linux-service-management/'>What is init.d?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://itsfoss.com/linux-daemons/'>What are Daemons in Linux?</BadgeLink>