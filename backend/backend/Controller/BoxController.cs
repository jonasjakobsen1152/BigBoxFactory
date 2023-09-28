using backend.Model;
using backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

public class BoxController : ControllerBase
{
    private readonly BoxService _boxService;

    public BoxController(BoxService boxService)
    {
        _boxService = boxService;
    }

    [HttpPost]
    [Route("/Boxes")]
    public Box PostBox([FromBody] Box box)
    {
        return _boxService.CreateBox(box.Content, box.Size); //size matters
    }
}