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
        await Page.GotoAsync("http://localhost:4200/");

        var textBox = Page.Locator("ion-title slot");

        await Expect(textBox).ToBeHiddenAsync();
    }
    
}