
namespace Angular.Html
{
    using OpenQA.Selenium.Support.PageObjects;
    using System.Diagnostics.CodeAnalysis;
    using OpenQA.Selenium;

    public class Input : Component
    {
        public Input(IWebDriver driver, params By[] selectors)
            : base(driver)
        {
            this.Selector = selectors.Length == 1 ? selectors[0] : new ByChained(selectors);
        }

        public Input(IWebDriver driver, string kind, string value, params string[] scopes)
            : base(driver)
        {
            switch (kind.ToLowerInvariant())
            {
                case "formcontrolname":
                    this.Selector = By.XPath($"//input[@formControlName='{value}'{ByScopesAnd(scopes)}]");
                    break;

                case "formcontrol":
                    this.Selector = By.XPath($"//input[@[formControl]='{value}'{ByScopesAnd(scopes)}]");
                    break;

                case "ngmodel":
                    this.Selector = By.XPath($"//input[@[ngModel]='{value}'{ByScopesAnd(scopes)}]");
                    break;

                default:
                    this.Selector = By.XPath($"//input{ByScopesPredicate(scopes)}");
                    break;
            }
        }

        public By Selector { get; }

        public string Value
        {
            get
            {
                this.Driver.WaitForAngular();
                var element = this.Driver.FindElement(this.Selector);
                return element.GetAttribute("value");
            }

            set
            {
                this.Driver.WaitForAngular();
                var element = this.Driver.FindElement(this.Selector);
                this.ScrollToElement(element);
                element.Clear();
                element.SendKeys(value);
                element.SendKeys(Keys.Tab);
            }
        }
    }

    [SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1402:FileMayOnlyContainASingleClass", Justification = "Reviewed. Suppression is OK here.")]
    public class Input<T> : Input where T : Component
    {
        public Input(T page, params By[] selectors)
            : base(page.Driver, selectors)
        {
            this.Page = page;
        }

        public T Page { get; }

        public T Set(string value)
        {
            this.Value = value;
            return this.Page;
        }
    }
}