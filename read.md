```
import org.apache.spark.graphx.*;
import org.apache.spark.sql.*;
import scala.Tuple2;
import scala.reflect.ClassTag$;

public class FindAncestors {

    public static void main(String[] args) {

        SparkSession spark = SparkSession.builder().appName("FindAncestors").getOrCreate();

        // 构造测试数据集
        Dataset<Row> data = spark.createDataFrame(
                Arrays.asList(
                        new Tuple2<Integer, Integer>(1, null),
                        new Tuple2<Integer, Integer>(2, 1),
                        new Tuple2<Integer, Integer>(3, 2),
                        new Tuple2<Integer, Integer>(4, 2),
                        new Tuple2<Integer, Integer>(5, 3),
                        new Tuple2<Integer, Integer>(6, 4)
                ),
                Encoders.tuple(Encoders.INT(), Encoders.INT())
        ).toDF("childID", "parentID");

        // 将数据集转换为边的形式
        JavaRDD<Edge<Integer>> edges = data.toJavaRDD().map(row ->
                new Edge<>(row.getInt(1), row.getInt(0), 1)
        );

        // 创建图对象
        Graph<Integer, Integer> graph = Graph.fromEdges(edges.rdd(), 1, StorageLevel.MEMORY_ONLY(),
                StorageLevel.MEMORY_ONLY(), ClassTag$.MODULE$.apply(Integer.class),
                ClassTag$.MODULE$.apply(Integer.class));

        // 遍历图并更新每个节点的最终祖先信息
        Graph<Integer, Integer> result = graph.ops().pregel(null, Integer.MAX_VALUE, EdgeDirection.Out(),
                new VertexProgram<Integer>() {
                    @Override
                    public void sendMsg(VertexId vertexId, Integer vertexData, Integer message) {
                        if (vertexData == null) {
                            // 如果节点没有最终祖先信息，则向其邻居发送消息
                            sendToDst(new Tuple2<>(vertexId, message));
                        }
                    }

                    @Override
                    public void apply(VertexId vertexId, Integer vertexData, Integer message) {
                        if (vertexData == null) {
                            // 如果节点没有最终祖先信息，则将消息中的最终祖先信息更新为自己的最终祖先信息
                            if (message == null) {
                                vertexData = (int) vertexId;
                            } else {
                                vertexData = message;
                            }
                            setVertexAttr(vertexId, vertexData);
                        }
                    }

                    @Override
                    public MergeEdge<Integer> mergeEdge(VertexId vertexId, Edge<Integer> edge, Integer vertexData) {
                        // 将邻居的最终祖先信息合并到节点的最终祖先信息中
                        if (edge.dstAttr() != null) {
                            if (vertexData == null || edge.dstAttr() < vertexData) {
                                return new MergeEdge<>(edge.srcId(), edge.srcAttr(), edge.dstAttr());
                            }
                        }
                        return null;
                    }
                }, new SendToSrc<>(), new MergeMessage<>(), ClassTag$.MODULE$.apply(Integer.class),
                ClassTag$.MODULE$.apply
   ```
   
