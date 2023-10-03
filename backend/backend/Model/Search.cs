using System.ComponentModel.DataAnnotations;

namespace backend.Model;

public class Search
{
    public string Size { get; set; }
    
    public string SearchTerm { get; set; }
    
    public string Content { get; set; }
}