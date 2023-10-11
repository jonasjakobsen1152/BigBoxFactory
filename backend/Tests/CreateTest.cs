

using System.Net.Http.Json;
using Dapper;
using FluentAssertions;
using Newtonsoft.Json;

namespace Tests;

public class CreateTest
{
    
    [TestCase("Darts","Large")]
    public async Task BoxCanSuccessfullyBeCreatedFromHttpRequest(string content, string size)
    {
        //Arrange
        var testBox = new Box()
        {
            Id = 1,
        Content = content, 
        Size = size
        };

        //ACT
        var httpResponse = await new HttpClient().PostAsJsonAsync(Helper.ApiBaseUrl + "boxes", testBox);
        var json = await httpResponse.Content.ReadAsStringAsync();
        Box box = JsonConvert.DeserializeObject<Box>(json);
    
        await using (var conn = Helper.DataSource.OpenConnection())
        {
            var query = $@"SELECT
                    boxes.id as {nameof(Box.Id)},
                    boxcontent as {nameof(Box.Content)},
                    boxsize as {nameof(Box.Size)}
                  FROM boxfactory.boxes
                  ORDER BY id DESC;";

            var exp = conn.QueryFirst<Box>(query);
            exp.Should().BeEquivalentTo(box, because: JsonConvert.SerializeObject(box) + " eq to : " + JsonConvert.SerializeObject(exp));
        }
        
    }
    
}