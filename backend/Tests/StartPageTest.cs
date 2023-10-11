using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace backend.Tests;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class StartPageTest : PageTest
{
    
    [Test]
    public async Task ShowStartButtonTest()
    {
        Assert.Pass();
    }
    
}