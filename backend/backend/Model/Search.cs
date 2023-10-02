using System.ComponentModel.DataAnnotations;

namespace backend.Model;

public class Search
{
    public int PageSize { get; set; }
    
    public string SearchTerm { get; set; }
}