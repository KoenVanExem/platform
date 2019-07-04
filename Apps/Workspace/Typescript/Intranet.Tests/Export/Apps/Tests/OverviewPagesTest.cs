using System.Diagnostics;

namespace Tests.ApplicationTests
{
    using System.Collections.Generic;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Support.PageObjects;
    using System.Reflection;
    using Components;
    using System;
    using System.Linq;
    using Xunit;
    using Allors;

    [Collection("Test collection")]
    public class OverviewPagesTest : Test
    {
        private readonly MethodInfo[] navigateTos;

        public OverviewPagesTest(TestFixture fixture)
            : base(fixture)
        {
            var navigateTos = this.Sidenav.GetType()
                .GetMethods()
                .Where(v => v.Name.StartsWith("NavigateTo"))
                .ToArray();

            // Uncomment next line to only test a certain page
            //navigateTos = navigateTos.Where(v => v.Name.Equals("NavigateToPeople")).ToArray();

            this.navigateTos = navigateTos;
        }

        [Fact]
        public async void Detail()
        {
            foreach (var page in this.OverviewPages())
            {
                var detailProperty = page.GetType().GetProperties().FirstOrDefault(v => v.Name.ToUpperInvariant().EndsWith("DETAIL"));
                dynamic detail = detailProperty.GetGetMethod().Invoke(page, null);
                detail.Click();
                Cancel(detail);
            }
        }

        [Fact]
        public async void PanelsCreate()
        {
            foreach (var page in this.OverviewPages())
            {
                var panelProperties = page.GetType().GetProperties().Where(v => v.Name.ToUpperInvariant().Contains("PANEL"));
                foreach (var panelProperty in panelProperties)
                {
                    var panel = (SelectorComponent)panelProperty.GetGetMethod().Invoke(page, null);
                    if (this.Driver.SelectorIsVisible(panel.Selector))
                    {
                        dynamic dynamicPanel = panel;
                        dynamicPanel.Click();

                        if (panel.GetType().GetProperties().Any(v => v.Name.Equals("Factory")))
                        {
                            var factory = (MatFactoryFab)dynamicPanel.Factory;

                            if (this.Driver.SelectorIsVisible(factory.Selector))
                            {
                                var classes = factory.Classes;

                                foreach (var @class in classes)
                                {
                                    factory.Create(@class);
                                    var dialog = this.Driver.GetDialog();
                                    Cancel(dialog);
                                }
                            }
                        }

                        this.Collapse(panel);
                    }
                }
            }
        }

        [Fact]
        public async void PanelsEdit()
        {
            foreach (var page in this.OverviewPages())
            {
                var panelProperties = page.GetType().GetProperties().Where(v => v.Name.ToUpperInvariant().Contains("PANEL"));
                foreach (var panelProperty in panelProperties)
                {
                    var panel = (SelectorComponent)panelProperty.GetGetMethod().Invoke(page, null);
                    if (this.Driver.SelectorIsVisible(panel.Selector))
                    {
                        dynamic dynamicPanel = panel;
                        dynamicPanel.Click();

                        var tableProperty = panel.GetType().GetProperties().FirstOrDefault(v => v.PropertyType == typeof(MatTable));
                        if (tableProperty != null)
                        {
                            var table = (MatTable)tableProperty?.GetGetMethod().Invoke(panel, null);
                            var action = table.Actions.FirstOrDefault(v => v.Equals("edit"));

                            if (action != null)
                            {
                                var objects = this.Session.Instantiate(table.ObjectIds);
                                foreach (IObject @object in objects)
                                {
                                    table.Action(@object, action);

                                    this.Driver.WaitForAngular();
                                    var dialogElement = this.Driver.FindElement(By.CssSelector("mat-dialog-container ng-component[data-test-scope]"));
                                    var testScope = dialogElement.GetAttribute("data-test-scope");
                                    var type = Assembly.GetExecutingAssembly().GetTypes().First(v => v.Name.Equals(testScope));
                                    var dialog = (Component)Activator.CreateInstance(type, this.Driver);

                                    Cancel(dialog);
                                }
                            }
                        }

                        this.Collapse(panel);
                    }
                }
            }
        }

        private IEnumerable<Component> OverviewPages()
        {
            this.Login();

            foreach (var navigateTo in this.navigateTos)
            {
                var listPage = (Component)navigateTo.Invoke(this.Sidenav, null);

                var tableProperty = listPage.GetType().GetProperties().FirstOrDefault(v => v.PropertyType == typeof(MatTable));
                if (tableProperty != null)
                {
                    var table = (MatTable)tableProperty?.GetGetMethod().Invoke(listPage, null);
                    var action = table.Actions.FirstOrDefault(v => v.Equals("overview"));

                    if (action != null)
                    {
                        var objects = this.Session.Instantiate(table.ObjectIds);
                        foreach (IObject @object in objects)
                        {
                            listPage = (Component)navigateTo.Invoke(this.Sidenav, null);
                            table.Action(@object, action);

                            this.Driver.WaitForAngular();
                            var dialogElement = this.Driver.FindElement(By.CssSelector("mat-sidenav-content ng-component[data-test-scope]"));
                            var testScope = dialogElement.GetAttribute("data-test-scope");
                            var type = Assembly.GetExecutingAssembly().GetTypes().First(v => v.Name.Equals(testScope));
                            var page = (Component)Activator.CreateInstance(type, this.Driver);

                            yield return page;
                        }
                    }
                }
            }
        }

        private void Collapse(SelectorComponent panel)
        {
            this.Driver.WaitForAngular();

            var byChained = new ByChained(panel.Selector, By.XPath($".//mat-icon[contains(text(), 'expand_less')]"));
            var collapse = this.Driver.FindElement(byChained);
            collapse.Click();
        }

        private static void Cancel(Component dialog)
        {
            var cancelProperty = dialog?.GetType().GetProperties().FirstOrDefault(v => v.Name.Equals("cancel", StringComparison.InvariantCultureIgnoreCase));
            dynamic cancel = cancelProperty?.GetGetMethod().Invoke(dialog, null);

            cancel?.Click();
        }
    }
}
