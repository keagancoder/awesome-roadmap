# 错误/异常/恢复

为了代替添加异常处理程序，Go的创造者们利用Go的能力来返回多个值。最常用的Go发布错误的技术是将错误作为返回的最后一个值来返回。

异常通常意味着出现了意想不到的错误。多用于在正常操作中不应该发生的错误上快速失败，或者我们没有准备好优雅地处理这些错误。

Go中的恐慌恢复依赖于语言中的一个特性，即延迟函数。Go有能力保证在一个函数的父函数返回时执行该函数。无论父函数的返回原因是返回语句、函数块的结束，还是恐慌，都会发生这种情况。

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://go.dev/blog/error-handling-and-go'>Error handling and Go</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://go.dev/blog/defer-panic-and-recover'>Go Defer, Panic and Recover</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://earthly.dev/blog/golang-errors/'>Effective error handling in Go</BadgeLink>
