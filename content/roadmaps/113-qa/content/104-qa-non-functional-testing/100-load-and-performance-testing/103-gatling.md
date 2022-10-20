# Gatling

Gatling是一个高能力的负载测试工具。它被设计成易于使用、可维护和高性能。

开箱即用，Gatling对HTTP协议有很好的支持，这使它成为对任何HTTP服务器进行负载测试的首选工具。由于核心引擎实际上是与协议无关的，因此完全可以实现对其他协议的支持。例如，Gatling目前也支持JMS。

Gatling的架构是异步的，只要底层协议，如HTTP，能够以非阻塞的方式实现。这种架构让我们可以把虚拟用户作为消息来实现，而不是专门的线程，这使得它们非常节省资源。因此，运行成千上万个并发的虚拟用户不是问题。

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Official Website' href='https://gatling.io/'>Gatling Website</BadgeLink>
<BadgeLink badgeText='Course' colorScheme='green' href='https://www.youtube.com/playlist?list=PLJ9A48W0kpRJE6s8I1MjWm-z8BGbUYNCw'>Learn Gatling</BadgeLink>
