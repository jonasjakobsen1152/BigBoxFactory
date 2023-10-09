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

    [HttpDelete]
    [Route("/boxes/{id}")]
    public void DeleteBox([FromRoute] int id)
    {
        _boxService.DeleteBox(id);
    }
    
    [HttpPost]
    [Route("/boxes")]
    public Box PostBox([FromBody] Box box)
    {
        return _boxService.CreateBox(box.Content, box.Size); //size matter
    }

    [HttpGet]
    [Route("/boxes")]
    public IEnumerable<Box> getBoxFeed()
    {
        return _boxService.getBoxFeed();
    }

    [HttpGet]
    [Route("/boxes/{id}")]
    public Box getFullBox(int id)
    {
        return _boxService.getFullBox(id);
    }
    
    [HttpPut]
    [Route("/updatebox/{id}")]
    public Box updateBox(int id, [FromBody] Box box)
    {
        return _boxService.updateBox(id, box.Content, box.Size);
    }

    [HttpGet]
    [Route("/searchBoxes")]
    public IEnumerable<Box> searchBox([FromQuery] Search parameters)
    {
        return _boxService.searchBox(parameters);
    }
    
}