using backend.Model;
using Dapper;
using Npgsql;


namespace backend.DAL;

public class BoxDAL
{
private readonly NpgsqlDataSource _dataSource;

public BoxDAL(NpgsqlDataSource dataSource)
{
    _dataSource = dataSource;
}

    public Box CreateBox(string content, string size)
    {
        var sql = $@"INSERT INTO boxfactory.box(content, size)
            VALUES (@content, @size)
            RETURNING boxId as {nameof(Box.Id)}
            content as {nameof(Box.Content)}
            size as {nameof(Box.Size)};";
        
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Box>(sql, new { content, size });
        }
    }
}