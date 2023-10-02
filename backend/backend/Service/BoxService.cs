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

    public Box CreateBox(string content, string size)
    {
        return _boxDal.CreateBox(content, size);
    }

    public IEnumerable<Box> getBoxFeed()
    {
        return _boxDal.getBoxFeed();
    }
}