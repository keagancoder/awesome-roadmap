# Screen

Screen是一个全屏窗口管理器，在几个进程（通常是交互式外壳）之间复用一个物理终端。每个虚拟终端提供DEC VT100终端的功能，此外还有ISO 6429（ECMA 48，ANSI X3.64）和ISO 2022标准中的一些控制功能（如插入/删除行和支持多种字符集）。每个虚拟终端都有一个回卷历史缓冲区，还有一个复制和粘贴机制，可以在窗口之间移动文本区域。

更多信息见`man screen`或`screen -h`。

<BadgeLink badgeText='Read' colorScheme='yellow' href='https://kapeli.com/cheat_sheets/screen.docset/Contents/Resources/Documents/index'>Screen Cheat Sheet</BadgeLink>
<BadgeLink badgeText='Read' colorScheme='yellow' href='https://www.gnu.org/software/screen/manual/screen.html'>Screen User's Manual</BadgeLink>
