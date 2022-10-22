# 贡献

首先，感谢您考虑捐款。请看下面的细节。

* [新路标](#新路标)
* [现有路线图](#existing-roadmaps)
* [添加内容](#adding-content)
* [指导原则](#指导原则)

## 新路标

对于新的路线图，请在一个问题中提供[与此路线图类似的文本路线图](https://gist.github.com/kamranahmedse/98758d2c73799b3a6ce17385e4c548a5)，以提交路线图。

## 现有路线图

对于现有的路线图，请按照所列出的贡献性质进行详细说明。

**修正错别字** - 在[路线图JSON文件](https://github.com/kamranahmedse/developer-roadmap/tree/master/public/project)中进行修改。
**添加或删除节点** - 请在问题中提出您的建议。

**注意：**请注意，我们的目标不是要有最大的项目列表。我们的目标是列出今天最相关的项目或技能。

## 添加内容

找到[相关路线图里面的内容目录]（https://github.com/kamranahmedse/developer-roadmap/tree/master/content/roadmaps）。

请注意，markdown有一个特定的格式。请遵循这里给出的markdown的样本格式。

* 文件的标题来代表节点项目。
* 添加描述路线图节点的简短摘要（最好不超过200个字符）
* 使用`ResourceGroupTitle`标签来表示资源标题

  ```html
  <ResourceGroupTitle>免费内容</ResourceGroupTitle>。
  ```

* 使用`BadgeLink`标签作为资源的链接，其准则如下

  ``html
  <! -- 官方网站和文档的蓝色配色方案 -->
  <BadgeLink colorScheme='blue' badgeText='Official Website' href='https://reactjs.org/'>React Website</BadgeLink>。

  <！--课程的绿色配色方案 --->
  <BadgeLink badgeText='Course' colorScheme='green' href='https://example.com'>The Beginner's Guide to React</BadgeLink>。

  <！--视频链接没有配色方案 --->
  <BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=i793Qm6kv3U'>Understanding React's UI Rendering Process</BadgeLink>。

  <！--博客文章和可读文本的黄色配色方案 -->
  <BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.cloudflare.com/en-gb/learning/dns/what-is-dns/'>What is DNS? </BadgeLink>

  ```

## Guidelines

- <p><strong>增加现有的一切不是目标！</strong><br /> 
  路线图代表了当今最有价值的技能组合，也就是说，如果你今天进入所列的任何一个领域，你会学到什么？可能有一些东西当然是今天正在使用的，但要优先考虑今天最需要的东西，例如，同意很多人今天正在使用angular.js，但你不会想学这个而不是React、Angular或Vue。用你的批判性思维来过滤掉非必要的东西。诚实地论证为什么该资源应该被包括在内。
- <p><strong>不要添加你没有亲自评估过的东西!</strong><br /> 
  用你的批判性思维来过滤掉非必要的东西。诚实地论证为什么应该包括该资源。你读过这本书吗？你能给出一篇短文吗？</p>
- <p><strong>为内容添加创建一个单一的PR</strong></p>
  如果你打算通过向路线图添加内容来做出贡献，我建议你克隆版本库，将内容添加到[路线图的内容目录](./content/roadmaps/)，并创建一个单一的PR，以方便我审查和合并PR。
- 编写有意义的提交信息
- 在打开新的问题/拉取请求之前，先看看现有的问题/拉取请求
