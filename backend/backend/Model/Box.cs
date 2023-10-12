using System.ComponentModel.DataAnnotations;

namespace backend.Model;

public class Box
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(20, MinimumLength = 3, ErrorMessage = "Content must be between 3 and 20 characters")]
    public string Content { get; set; }
    
    public string Size { get; set; }
    
}
public class BoxSizeValidationAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value != null)
        {
            string size = value.ToString();
            if (size != "Small" && size != "Medium" && size != "Large")
            {
                return new ValidationResult("Size must be 'Small', 'Medium', or 'Large'.");
            }
        }

        return ValidationResult.Success;
    }
}