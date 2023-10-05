using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace backend.Tests;

public class DeleteTest : PageTest
{

    [Test]
    public async Task CanSuccessfullyDelete()
    {

        await Page.GotoAsync("http://localhost:4200/");

        await Page.GetByText("Box Window").ClickAsync();

        await Page.Locator("ion-card")
            .Filter(new() { HasText = "Box Id: 64Containing: 123Size: 123 Delete boxOpen box window" })
            .GetByRole(AriaRole.Button).First.ClickAsync();
        
        
        
    }
}