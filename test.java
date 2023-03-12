
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.spark.MongoSpark;
import com.mongodb.spark.config.ReadConfig;
import com.mongodb.spark.config.WriteConfig;
import de.flapdoodle.embed.mongo.MongodExecutable;
import de.flapdoodle.embed.mongo.MongodProcess;
import de.flapdoodle.embed.mongo.MongodStarter;
import de.flapdoodle.embed.mongo.config.IMongodConfig;
import de.flapdoodle.embed.mongo.config.MongodConfigBuilder;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.runtime.Network;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

public class SparkMonoTestV {
    public static void main(String[] args) throws IOException {

        MongodStarter starter = MongodStarter.getDefaultInstance();
        String bindIp = "localhost";
        int port = 12345;
        IMongodConfig mongodConfig = new MongodConfigBuilder()
                .version(Version.Main.PRODUCTION)
                .net(new de.flapdoodle.embed.mongo.config.Net(bindIp, port, Network.localhostIsIPv6()))
                .build();
        MongodExecutable mongodExecutable = starter.prepare(mongodConfig);
        MongodProcess mongod = mongodExecutable.start();

        // 使用Spark写入数据
        SparkSession spark = SparkSession.builder()
                .appName("EmbeddedMongo Example")
                .master("local[*]")
                .config("spark.mongodb.input.uri", "mongodb://localhost:12345")
                .config("spark.mongodb.output.uri", String.format("mongodb://%s:%d/test.outputCollection", bindIp, port))
                .config("spark.mongodb.input.database", "test")
                .config("spark.mongodb.input.collection", "outputCollection")
                .getOrCreate();
        Dataset<Row> data = spark.createDataFrame(Collections.singletonList(new MyObject("Hello", "World")), MyObject.class);
        MongoSpark.write(data).mode("overwrite").option("collection", "outputCollection").save();

        // 从MongoDB中读取数据
        JavaSparkContext  jsc= new JavaSparkContext(spark.sparkContext());

        Dataset<Row> result = MongoSpark.load(jsc).toDF();
        result.show();

        // 关闭MongoDB和Spark
        mongod.stop();
        mongodExecutable.stop();
        spark.close();
    }

    public static class MyObject {
        private String field1;
        private String field2;

        public MyObject() {}

        public MyObject(String field1, String field2) {
            this.field1 = field1;
            this.field2 = field2;
        }

        public String getField1() {
            return field1;
        }

        public void setField1(String field1) {
            this.field1 = field1;
        }

        public String getField2() {
            return field2;
        }

        public void setField2(String field2) {
            this.field2 = field2;
        }

        public DBObject toDBObject() {
            BasicDBObject obj = new BasicDBObject();
            obj.put("field1", field1);
            obj.put("field2", field2);
            return obj;
        }
    }
}
