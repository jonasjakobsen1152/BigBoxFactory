using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace backend.Tests;

public class PlaywrightTest : PageTest
{

    [Test]
    public async Task CanSuccessfullyWriteInSearch()
    {
        await Page.GotoAsync("http://localhost:4200/box-window");

        var locator = Page.GetByPlaceholder("Search");
        await Expect(locator).ToBeEditableAsync();
    }

    [Test]
    public async Task HomeButtonIsEnabled()
    {
        await Page.GotoAsync("http://localhost:4200/box-window");

        var locator = Page.GetByRole(AriaRole.Tab, new() { Name = "Box Window" });

        await Expect(locator).ToBeEnabledAsync();
    }
    
}