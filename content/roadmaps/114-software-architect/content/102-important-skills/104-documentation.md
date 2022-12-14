# 文档

建筑文件有时更重要，有时不那么重要。重要的文件包括架构决策或代码指南。最初的文档通常在编码开始前就需要，并且需要不断完善。其他文档可以自动生成，因为代码也可以是文档，例如UML类图。

**干净的代码**。如果做得好的话，代码是最好的文档。一个好的架构师应该有能力分辨出好的和坏的代码。了解好的和坏的代码的一个非常好的资源是Robert C. Martin的 "Clean Code "一书。
**尽可能地生成文档**。系统变化很快，很难更新文档。无论是关于API还是CMDB（配置管理数据库）形式的系统景观。底层信息往往变化太快，无法通过手工来保持相应的文档更新。例如。对于API，如果你是模型驱动的，你可以根据定义文件自动生成文档，或者直接从源代码生成。有很多这样的工具，我认为Swagger和RAML是一个很好的起点，可以了解更多。
**尽量多，尽量少**。无论你需要记录什么，例如决策文件，尽量一次只关注一件事，只包括这一件事的必要信息。广泛的文件难以阅读和理解。额外的信息应该储存在附录中。特别是对于决策文件，更重要的是讲述一个令人信服的故事，而不是仅仅抛出大量的论据。此外，这可以为你和你的同事节省大量的时间，因为他们必须阅读它。看一下你过去做的一些文件（源代码、模型、决策文件等），并问自己以下问题。"是否包括了所有必要的信息来理解它？"，"哪些信息是真正需要的，哪些可以省略？"以及 "文档是否有红线？"。
**了解更多关于架构框架的信息**。这一点也可以适用于所有其他 "技术 "点。我把它放在这里，因为像TOGAF或Zachmann这样的框架提供的 "工具 "感觉在文档方面很重，尽管它们的附加价值并不限于文档。获得这样一个框架的认证，可以教你更系统地处理架构问题。
