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
    
    await Page.Locator("ion-card").Filter(new()).GetByRole(AriaRole.Button).First.ClickAsync();
    
    await Page.GetByRole(AriaRole.Button, new() { Name = "Delete Box" }).ClickAsync();
    
    
}

}