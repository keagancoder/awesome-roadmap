# Chef

兴起于2009年的[Chef](https://en.wikipedia.org/wiki/Progress_Chef)（现在被称为Progress Chef）是最早得到普及的配置管理工具之一。Chef的 "食谱 "是用Ruby编写的，主要是[声明式](https://en.wikipedia.org/wiki/Declarative_programming)风格。

Chef要求在被管理的服务器上安装一个客户端。 这个客户端定期轮询Chef-Server，以确定其配置应该是什么。Chef-Solo也是可用的，它是Chef的一个版本，允许通过在本地运行Chef来配置单个节点。

厨师配方设计的一个关键原则是[idempotence]（https://en.wikipedia.org/wiki/Idempotence）的概念。所有的Chef配方应该可以多次运行并产生相同的结果--这在使用上述客户/服务器模式的情况下尤其必要。这种配置管理模式对未来的声明式工具如Terraform和Cloud Formation有很大的影响。


<BadgeLink colorScheme='blue' badgeText='Official Website' href='https://www.chef.io/products/chef-infra'>Chef Website</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.tutorialspoint.com/chef/index.htm'>Chef Tutorial</BadgeLink>
