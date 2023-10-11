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

    [Test]
    public async Task DisabledCreateButton()
    {
        await Page.GotoAsync("http://localhost:4200/box-window");
        
        var locator = Page.GetByRole(AriaRole.Button, new() { Name = "Create a box" });

        await Expect(locator).ToBeDisabledAsync();
        
    }

    [Test]
    public async Task EnabledCreateButton()
    {
        await Page.GotoAsync("http://localhost:4200/box-window");
        
        await Page.GetByLabel("", new() { Exact = true }).FillAsync("Test123");

        var locator = Page.GetByRole(AriaRole.Button, new() { Name = "Create a box" });

        await Expect(locator).ToBeEnabledAsync();
    }
    
    
    
}