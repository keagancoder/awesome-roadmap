# 同步框架

python中的同步框架以同步的方式处理数据的流动。在s̲y̲c̲h̲r̲o̲o̲u̲̲s请求中，你提出请求并停止执行你的程序，直到你得到HTTP服务器的响应（如果服务器无法到达，则会出现错误，如果服务器需要很长时间来回复，则会出现超时）。解释器被封锁，直到请求完成（直到你得到请求发生的确切答案：进展顺利吗？).

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://blog.miguelgrinberg.com/post/sync-vs-async-python-what-is-the-difference'>Sync vs. Async Python: What is the Difference?</BadgeLink>
