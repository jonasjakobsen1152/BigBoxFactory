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
    [Route("/boxes")]
    public Box PostBox([FromBody] Box box)
    {
        return _boxService.CreateBox(box.Content, box.Size); //size matters
    }

    [HttpGet]
    [Route("/boxes")]
    public IEnumerable<Box> getBoxFeed()
    {
        return _boxService.getBoxFeed();
    }

    [HttpGet]
    [Route("/Boxes/{id}")]
    public Box getFullBox(int id)
    {
        return _boxService.getFullBox(id);
    }
    
}