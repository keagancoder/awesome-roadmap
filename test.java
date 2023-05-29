import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import org.apache.arrow.memory.RootAllocator;
import org.apache.arrow.vector.FieldVector;
import org.apache.arrow.vector.VectorSchemaRoot;
import org.apache.arrow.vector.VarCharVector;
import org.apache.arrow.vector.ipc.ArrowFileWriter;
import org.apache.arrow.vector.ipc.ArrowWriter;
import org.apache.arrow.vector.types.pojo.Field;
import org.apache.arrow.vector.types.pojo.FieldType;
import org.apache.arrow.vector.types.pojo.Schema;
import org.apache.arrow.vector.types.pojo.SchemaBuilder;
import org.apache.parquet.column.ParquetProperties;
import org.apache.parquet.hadoop.ParquetFileWriter;
import org.apache.parquet.hadoop.metadata.CompressionCodecName;
import org.apache.parquet.schema.MessageType;
import org.apache.parquet.schema.MessageTypeParser;
import org.apache.parquet.schema.PrimitiveType;
import org.apache.parquet.schema.Type;
import org.apache.parquet.schema.Types;

public class OracleToParquetExample {

    public static void main(String[] args) {
        String jdbcUrl = "jdbc:oracle:thin:@localhost:1521:your_database";
        String username = "your_username";
        String password = "your_password";
        String tableName = "your_table";
        String outputPath = "output.parquet";

        // 创建连接
        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {
            // 创建语句
            Statement statement = connection.createStatement();

            // 执行查询
            ResultSet resultSet = statement.executeQuery("SELECT * FROM " + tableName);

            // 构建Arrow Schema
            SchemaBuilder schemaBuilder = new SchemaBuilder();
            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();
            for (int i = 1; i <= columnCount; i++) {
                String columnName = metaData.getColumnName(i);
                int columnType = metaData.getColumnType(i);
                int precision = metaData.getPrecision(i);
                int scale = metaData.getScale(i);

                Field field = schemaBuilder.field(columnName,
                        FieldType.nullable(getArrowDataType(columnType, precision, scale)));
                schemaBuilder.addField(field);
            }
            Schema schema = schemaBuilder.build();

            // 创建Arrow Vector
            RootAllocator allocator = new RootAllocator();
            VectorSchemaRoot vectorSchemaRoot = VectorSchemaRoot.create(schema, allocator);
            ArrowWriter arrowWriter = new ArrowFileWriter(vectorSchemaRoot, null, new ParquetFileWriter(new org.apache.hadoop.fs.Path(outputPath),
                    ParquetFileWriter.Mode.CREATE, ParquetProperties.builder().build()), schema);

            // 将查询结果写入Arrow Vector
            while (resultSet.next()) {
                for (int i = 1; i <= columnCount; i++) {
                    FieldVector fieldVector = vectorSchemaRoot.getVector(i - 1);
                    if (fieldVector instanceof VarCharVector) {
                        VarCharVector varCharVector = (VarCharVector) fieldVector;
                        byte[] value = resultSet.getBytes(i);
                        varCharVector.setSafe(vectorSchemaRoot.getCurrentRecordIndex(), value);
                    } else {
                        // 处理其他数据类型
                    }
                }
                vectorSchemaRoot.setRowCount(vectorSchemaRoot.getRowCount() + 1);
            }

            // 写入Parquet文件
            arrowWriter.writeBatch();、
              vectorSchemaRoot.close();
arrowWriter.close();

System.out.println("Parquet file created successfully.");

// 关闭连接和资源
resultSet.close();
statement.close();
connection.close();
} catch (Exception e) {
e.printStackTrace();
}
}

private static org.apache.arrow.vector.types.pojo.ArrowType getArrowDataType(int sqlType, int precision, int scale) {
switch (sqlType) {
case Types.BIT:
case Types.BOOLEAN:
return org.apache.arrow.vector.types.pojo.ArrowType.Bool.INSTANCE;
case Types.TINYINT:
return org.apache.arrow.vector.types.pojo.ArrowType.Int(8, true);
case Types.SMALLINT:
return org.apache.arrow.vector.types.pojo.ArrowType.Int(16, true);
case Types.INTEGER:
return org.apache.arrow.vector.types.pojo.ArrowType.Int(32, true);
case Types.BIGINT:
return org.apache.arrow.vector.types.pojo.ArrowType.Int(64, true);
case Types.FLOAT:
return org.apache.arrow.vector.types.pojo.ArrowType.FloatingPoint(org.apache.arrow.vector.types.FloatingPointPrecision.SINGLE);
case Types.DOUBLE:
return org.apache.arrow.vector.types.pojo.ArrowType.FloatingPoint(org.apache.arrow.vector.types.FloatingPointPrecision.DOUBLE);
case Types.DECIMAL:
case Types.NUMERIC:
return org.apache.arrow.vector.types.pojo.ArrowType.Decimal(precision, scale);
case Types.CHAR:
case Types.VARCHAR:
case Types.LONGVARCHAR:
case Types.CLOB:
return org.apache.arrow.vector.types.pojo.ArrowType.Utf8.INSTANCE;
default:
return org.apache.arrow.vector.types.pojo.ArrowType.Binary.INSTANCE;
}
}
}
