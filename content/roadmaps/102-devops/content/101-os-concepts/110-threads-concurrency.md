# OS-线程

线程 "是一个活动的实体，它执行一个进程的**部分。它是一个进程中任务的顺序流。它也被称为轻量级进程，因为它们**共享公共资源**。一个进程可以包含多个线程。线程被用来提高应用程序的性能。
每个线程都有自己的程序计数器、堆栈和一组寄存器。但一个进程的线程可能共享相同的代码和数据/文件。

**关键术语：**
* "proc"(程序)
* "fork"(分叉)
* "join"(连接)


<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/introduction-of-process-synchronization/'>Process Synchronization</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/thread-in-operating-system/'>What is Thread in OS?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.scaler.com/topics/operating-system/threads-in-operating-system/'>Process vs Thread & Multi-Threading</BadgeLink>

# Concurrency in OS

`Concurrency` is the execution of the multiple instruction sequences at the same time. It happens in the operating system when there are several process threads running in parallel. It helps in techniques like **coordinating execution of processes**, memory allocation and execution scheduling for maximizing throughput. 

The running process threads always communicate with each other through shared memory or message passing. Concurrency results in sharing of resources result in problems like deadlocks and resources starvation.

**Key Terminologies:**
* mutex
* critical section
* Deadlock

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/concurrency-in-operating-system/'>What Concurrency in OS?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://medium.com/@azizomarck/how-is-concurrency-different-from-parallelism-334b6d5c869a'>Threads vs Concurrency</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://medium.com/@akhandmishra/operating-system-threads-and-concurrency-aec2036b90f8'>How Concurrency is achieved in Threads</BadgeLink>