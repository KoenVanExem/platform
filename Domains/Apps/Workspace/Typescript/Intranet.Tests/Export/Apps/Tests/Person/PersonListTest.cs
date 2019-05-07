using src.allors.material.apps.objects.person.list;

namespace Tests.PersonTests
{
    using Allors.Domain;
    using Allors.Meta;
    using Xunit;

    [Collection("Test collection")]
    public class PersonListTest : Test
    {
        private PersonListComponent page;

        public PersonListTest(TestFixture fixture)
            : base(fixture)
        {
            this.Login();
            this.page = this.Sidenav.NavigateToPeople();
        }

        [Fact]
        public void Title()
        {
            Assert.Equal("People", this.Driver.Title);
        }

        [Fact]
        public void Table()
        {
            var person = new People(this.Session).FindBy(M.Person.FirstName, "John0");
            var row = this.page.Table.FindRow(person);
            var cell = row.FindCell("name");

            Assert.Equal("John0 Doe0", cell.Element.Text);
        }
    }
}
