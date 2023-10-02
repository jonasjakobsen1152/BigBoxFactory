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
        var sql = @"DELETE FROM boxfactory.boxes WHERE id = @id;";
        
        using (var conn = _dataSource.OpenConnection())
        {
            conn.Execute(sql, new {id});
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
            $@"SELECT id as {nameof(Box.Id)},
                boxcontent as {nameof(Box.Content)},
                boxsize as {nameof(Box.Size)}
                FROM boxfactory.boxes;";
        using (var conn = _dataSource.OpenConnection())
        {
            
            return conn.Query<Box>(sql);
        }
    }


    public Box getFullBox(int id)
    {
        var sql =
            $@"SELECT * FROM boxfactory.boxes WHERE id = {id}";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Box>(sql);
        }
    }

    public Box updateBox(int id, string boxContent, string boxSize)
    {
        var sql =
            $@"UPDATE boxfactory.boxes
            SET boxcontent = @boxContent, boxsize = @boxSize
            WHERE id = @id
            returning id as {nameof(Box.Id)},
            boxcontent as {nameof(Box.Content)},
            boxsize as {nameof(Box.Size)}";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Box>(sql, new { boxContent, boxSize });
        }
    }

    public IEnumerable<Box> searchBox(Search parameters)
    {
        var sql =
            $@"SELECT * FROM boxfactory.boxes
            WHERE boxcontent LIKE '%' || @SearchTerm";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<Box>(sql, parameters);
        }
    }
}