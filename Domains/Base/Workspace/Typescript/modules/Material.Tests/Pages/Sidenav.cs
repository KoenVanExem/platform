namespace Tests
{
    using Angular;
    using Angular.Html;

    using OpenQA.Selenium;
    using OpenQA.Selenium.Support.PageObjects;

    public partial class Sidenav : Page
    {
        public Sidenav(IWebDriver driver)
        : base(driver)
        {
            this.Selector = By.CssSelector("mat-sidenav");
        }

        public By Selector { get; }

        public Button Toggle => new Button(this.Driver, By.CssSelector("a-mat-sidenavtoggle button"));

        private void Navigate(Anchor link)
        {
            this.Driver.WaitForAngular();

            if (!link.IsVisible)
            {
                this.Toggle.Click();
                this.Driver.WaitForCondition(driver => link.IsVisible);
            }

            link.Click();
        }

        private void Navigate(Element group, Anchor link)
        {
            this.Driver.WaitForAngular();

            if (!link.IsVisible)
            {
                if (!group.IsVisible)
                {
                    this.Toggle.Click();
                    this.Driver.WaitForCondition(driver => @group.IsVisible);
                }

                if (!link.IsVisible)
                {
                    group.Click();
                }
            }

            link.Click();
        }

        private Element Group(string name)
        {
            return new Element(this.Driver, new ByChained(this.Selector, By.XPath($"//span[contains(text(), '{name}')]")));
        }

        private Anchor Link(string href)
        {
            return new Anchor(this.Driver, this.ByHref(href));
        }

        private By ByHref(string href)
        {
            return new ByChained(this.Selector, By.CssSelector($"a[href='{href}']"));
        }
    }
}
