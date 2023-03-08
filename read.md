```
// 构建关系图，从叶子节点开始向上查找祖先节点
       Dataset<Row> graph = data.select(col("childID"), col("parentID").alias("parent"))
                                .dropDuplicates();
       Dataset<Row> ancestorLeaves = null;
       while (graph.count() > 0) {
           Dataset<Row> leaves = graph.join(data.filter(col("level").equalTo(2)), graph.col("parent").equalTo(data.col("childID")), "inner")
                                      .select(graph.col("childID"), data.col("childID").alias("ancestorID"));
           if (leaves.count() == 0) {
               break;
           }
           if (ancestorLeaves == null) {
               ancestorLeaves = leaves;
           } else {
               ancestorLeaves = ancestorLeaves.union(leaves);
           }
           graph = graph.join(leaves, graph.col("childID").equalTo(leaves.col("childID")), "left_anti");
       }

       // 输出结果
       ancestorLeaves.show();
   }
}
在上述代码中，我们首先创建SparkSession并加载数据集。然后，我们使用select和dropDuplicates函数创建一个名为graph的新Dataset，该Dataset仅包含childID和其对应的parentID。接下来，我们在一个while循环中对graph进行迭代，直到所有叶子节点都找到其祖先节点为止。在每次迭代中，我们使用join函数将graph和level为2的节点合并，并从中找到每个叶子节点的祖先节点。我们使用left_anti join函数将新找到的叶子节点从graph中删除，因为它们已经被处理过了。最后，我们将所有的祖先节点和其叶子节点存储到ancestorLeaves中，并输出结果。

请注意，在上述代码中，我们假设每个祖先节点都只有一个叶子节点，因此我们将每个叶子节点的祖先节点存储为一个Dataset，而不是将其与原始数据集合并。如果每个祖先节点具有多个叶子节点，则需要对结果进行适当的修改。






   ```
   
