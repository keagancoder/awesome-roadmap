# Mutex

Go允许我们使用goroutines来并发地运行代码。然而，当并发的进程访问同一块数据时，可能会导致[竞赛条件](https://www.sohamkamani.com/golang/data-races/)。Mutexes是由[sync](https://pkg.go.dev/sync/)包提供的数据结构。它们可以帮助我们在不同的数据段上放置一个锁，以便在同一时间只有一个goroutine可以访问它。

<BadgeLink colorScheme="yellow" badgeText="Read" href="https://www.sohamkamani.com/golang/mutex/"> Using a Mutex in Go with Examples</BadgeLink>
