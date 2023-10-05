using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace backend.Tests;

[TestFixture]
public class CreateTest : PageTest
{


    [Test]
    public async Task CanSuccessfullyCreate()
    {

        var text = new Random().NextInt64() + "";
        
        await Page.GotoAsync("http://localhost:4200");
        await Page.GetByText("Box Window").ClickAsync();

        await Page.Locator("#ion-input-0").ClickAsync();

        await Page.Locator("#ion-input-0").FillAsync(text);

        await Page.Locator("#ion-input-0").PressAsync("Tab");

        await Page.Locator("#ion-input-1").FillAsync(text);

        await Page.GetByRole(AriaRole.Button, new() { Name = "Create a box" }).ClickAsync();

        await Page.GetByText("Containing: " + text).ClickAsync();
    }
    
}