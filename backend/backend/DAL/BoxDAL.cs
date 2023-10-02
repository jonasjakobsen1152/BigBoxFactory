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

    public void DeleteBox(int id)
    {
        var sql = $@"DELETE FROM boxfactory.boxes WHERE id = @id;";

        using (var conn = _dataSource.OpenConnection())
        {
            conn.Execute(sql);
        }
    }

    public Box CreateBox(string content, string size)
    {
        var sql = $@"INSERT INTO boxfactory.boxes(boxcontent, boxsize)
            VALUES (@content, @size)
            RETURNING boxes.id as {nameof(Box.Id)},
            boxcontent as {nameof(Box.Content)},
            boxsize as {nameof(Box.Size)};";
        
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Box>(sql, new {content, size});
        }
    }


    public IEnumerable<Box> getBoxFeed()
    {
        var sql =
            $@"SELECT * FROM boxfactory.boxes";
        using (var conn = _dataSource.OpenConnection())
        {
            IEnumerable<Box> allBoxes = conn.Query<Box>(sql);
            
            return allBoxes;
        }
    }
}