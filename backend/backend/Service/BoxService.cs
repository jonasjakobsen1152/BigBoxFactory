using backend.DAL;
using backend.Model;

namespace backend.Service;

public class BoxService
{
    private readonly BoxDAL _boxDal;

    public BoxService(BoxDAL boxDal)
    {
        _boxDal = boxDal;
    }
    
    public void DeleteBox(int id)
    {
        _boxDal.DeleteBox(id);
    }
    
    public Box CreateBox(string content, string size)
    {
        return _boxDal.CreateBox(content, size);
    }


    public IEnumerable<Box> getBoxFeed()
    {
        return _boxDal.getBoxFeed();
    }


    public Box getFullBox(int id)
    {
        return _boxDal.getFullBox(id);
    }

    public Box updateBox(int id, string boxContent, string boxSize)
    {
        return _boxDal.updateBox(id, boxContent, boxSize);
    }


    public IEnumerable<Box> searchBox(Search parameters)
    {
        return _boxDal.searchBox(parameters);
    }
}