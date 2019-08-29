namespace Blazor.Client
{
    using System.Net.Http;
    using Allors.Blazor;
    using Allors.Workspace;
    using Allors.Workspace.Domain;
    using Allors.Workspace.Meta;
    using Allors.Workspace.Remote;
    using Microsoft.AspNetCore.Components;
    using Microsoft.AspNetCore.Components.Builder;
    using Microsoft.Extensions.DependencyInjection;

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<RemoteDatabase>((serviceProvider) =>
            {
                var http = serviceProvider.GetRequiredService<HttpClient>();
                var database = new RemoteDatabase(http);
                return database;
            });
            services.AddSingleton<IDatabase>(provider => provider.GetRequiredService<RemoteDatabase>());

            services.AddSingleton<Workspace>((serviceProvider) =>
            {
                var objectFactory = new Allors.Workspace.ObjectFactory(MetaPopulation.Instance, typeof(User));
                var workspace = new Workspace(objectFactory);
                return workspace;
            });

            var implementationInstance = new AllorsAuthenticationStateProviderConfig
            {
                AuthenticationUrl = "/TestAuthentication/Token",
            };
            services.AddSingleton(implementationInstance);
            services.AddScoped<AllorsAuthenticationStateProvider>();
            services.AddScoped<AuthenticationStateProvider>(provider => provider.GetRequiredService<AllorsAuthenticationStateProvider>());
            services.AddAuthorizationCore();
        }

        public void Configure(IComponentsApplicationBuilder app)
        {
            app.AddComponent<App>("app");
        }
    }
}