```
import org.apache.spark.graphx.Edge;
import org.apache.spark.graphx.Graph;
import org.apache.spark.graphx.GraphLoader;
import org.apache.spark.graphx.VertexRDD;
import org.apache.spark.graphx.lib.GraphOps;
import org.apache.spark.graphx.lib.TriangleCount;
import org.apache.spark.graphx.lib.TriangleCount$;
import org.apache.spark.graphx.util.GraphGenerators;
import org.apache.spark.rdd.RDD;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import scala.Tuple2;
import scala.reflect.ClassManifestFactory;

public class SparkGraphXExample {

  public static void main(String[] args) {

    // 创建SparkSession
    SparkSession spark = SparkSession.builder().appName("SparkGraphXExample").getOrCreate();

    // 创建数据集，包含两个字段，分别是child和parent
    Dataset<Row> dataset = spark.read().option("header", true).csv("path/to/dataset");

    // 将数据集转换为一个图
    RDD<Edge<Object>> edgesRDD = JavaRDD.fromRDD(dataset.toJavaRDD().map(row -> new Edge<>(row.get(1), row.get(0), null)), ClassManifestFactory$.MODULE$.fromClass(Object.class));
    Graph<Object, Object> graph = Graph.apply(edgesRDD, null, null);

    // 对图进行拓扑排序
    Graph<Object, Object> sortedGraph = GraphOps.apply(graph).topologicalSort();

    // 初始化每个节点的祖先节点为null
    VertexRDD<Object> ancestorsRDD = sortedGraph.vertices().mapValues(v -> null);

    // 从每个叶子节点开始向上遍历，将每个节点的祖先节点标记为该节点的父节点，直到找到根节点
    ancestorsRDD = ancestorsRDD.join(sortedGraph.outDegrees().filter(v -> v._2 == 0).mapValues(v -> null), ClassManifestFactory$.MODULE$.fromClass(Object.class)).mapValues(v -> v._1);
    for (int i = 0; i < sortedGraph.vertices().count(); i++) {
      ancestorsRDD = ancestorsRDD.join(sortedGraph.aggregateMessages(
          ctx -> ctx.sendToDst(ctx.srcAttr()), (a, b) -> a, TripletFields.Src), ClassManifestFactory$.MODULE$.fromClass(Object.class)).mapValues(v -> v._2 == null ? v._1 : v._2);
    }
    Dataset<Row> result = ancestorsRDD.toJavaRDD().map(t -> RowFactory.create(t._1, t._2)).toDF("child", "ancestor");
```
