using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace backend.Tests;
[TestFixture]
public class StartPageTest : PageTest
{
    
    [Test]
    public async Task ShowStartButtonTest()
    {
        await Page.GotoAsync("http://localhost:4200/");

        var textBox = Page.Locator("div")

        await Expect(textBox).ToBeVisibleAsync();
    }
    
}