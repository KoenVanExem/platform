using Nuke.Common;
using Nuke.Common.IO;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.DotNet;
using Nuke.Common.Tools.MSBuild;
using Nuke.Common.Tools.Npm;
using static Nuke.Common.IO.FileSystemTasks;
using static Nuke.Common.Tools.DotNet.DotNetTasks;
using static Nuke.Common.Tools.MSBuild.MSBuildTasks;
using static Nuke.Common.Tools.Npm.NpmTasks;

partial class Build
{
    Target BaseResetDatabase => _ => _
        .Executes(() =>
        {
            var database = "Base";
            using (var sqlServer = new SqlServer())
            {
                sqlServer.Restart();
                sqlServer.Drop(database);
                sqlServer.Create(database);
            }
        });

    private Target BaseDatabaseTest => _ => _
         .DependsOn(BaseDatabaseTestDomain);

    private Target BaseMerge => _ => _
        .Executes(() =>
        {
            DotNetRun(s => s
                .SetProjectFile(Paths.CoreDatabaseMerge)
                .SetApplicationArguments($"{Paths.CoreDatabaseResourcesCore} {Paths.BaseDatabaseResourcesBase} {Paths.BaseDatabaseResources}"));
        });

    private Target BaseDatabaseTestDomain => _ => _
         .DependsOn(BaseGenerate)
         .Executes(() =>
         {
             DotNetTest(s => s
                 .SetProjectFile(Paths.BaseDatabaseDomainTests)
                 .SetLogger("trx;LogFileName=BaseDatabaseDomain.trx")
                 .SetResultsDirectory(Paths.ArtifactsTests));
         });

    private Target BaseGenerate => _ => _
         .After(Clean)
         .DependsOn(BaseMerge)
         .Executes(() =>
         {
             DotNetRun(s => s
                 .SetProjectFile(Paths.PlatformRepositoryGenerate)
                 .SetApplicationArguments($"{Paths.BaseRepositoryDomainRepository} {Paths.PlatformRepositoryTemplatesMetaCs} {Paths.BaseDatabaseMetaGenerated}"));
             DotNetRun(s => s
                 .SetWorkingDirectory(Paths.Base)
                 .SetProjectFile(Paths.BaseDatabaseGenerate));
         });

    private Target BasePublishCommands => _ => _
         .DependsOn(BaseGenerate)
         .Executes(() =>
         {
             var dotNetPublishSettings = new DotNetPublishSettings()
                 .SetWorkingDirectory(Paths.BaseDatabaseCommands)
                 .SetOutput(Paths.ArtifactsBaseCommands);
             DotNetPublish(dotNetPublishSettings);
         });

    private Target BasePublishServer => _ => _
             .DependsOn(BaseGenerate)
         .Executes(() =>
         {
             var dotNetPublishSettings = new DotNetPublishSettings()
                 .SetWorkingDirectory(Paths.BaseDatabaseServer)
                 .SetOutput(Paths.ArtifactsBaseServer);
             DotNetPublish(dotNetPublishSettings);
         });

    private Target BaseSetup => _ => _
        .Executes(() =>
        {
            NpmInstall(s => s
                .SetEnvironmentVariable("npm_config_loglevel", "error")
                .SetWorkingDirectory(Paths.BaseWorkspaceTypescript));
        });

    private Target BaseWorkspaceScaffold => _ => _
         .DependsOn(BaseGenerate)
         .Executes(() =>
         {
             NpmRun(s => s
                 .SetEnvironmentVariable("npm_config_loglevel", "error")
                 .SetWorkingDirectory(Paths.BaseWorkspaceTypescript)
                 .SetCommand("scaffold"));

             DotNetRun(s => s
                 .SetWorkingDirectory(Paths.Base)
                 .SetProjectFile(Paths.BaseWorkspaceScaffoldGenerate));
         });

    private Target BaseWorkspaceTypescriptDomain => _ => _
         .DependsOn(BaseGenerate)
         .DependsOn(EnsureDirectories)
         .Executes(() =>
         {
             NpmRun(s => s
                 .SetEnvironmentVariable("npm_config_loglevel", "error")
                 .SetWorkingDirectory(Paths.BaseWorkspaceTypescript)
                 .SetCommand("domain:test"));
         });

    private Target BaseWorkspaceTypescriptIntranet => _ => _
         .DependsOn(BaseGenerate)
         .DependsOn(BasePublishServer)
         .DependsOn(BasePublishCommands)
         .DependsOn(BaseResetDatabase)
         .Executes(async () =>
         {
             using (var sqlServer = new SqlServer())
             {
                 sqlServer.Restart();
                 sqlServer.Populate(Paths.ArtifactsBaseCommands);

                 using (var server = new Server(Paths.ArtifactsBaseServer))
                 {
                     await server.Ready();
                     NpmRun(
                         s => s
                             .SetEnvironmentVariable("npm_config_loglevel", "error")
                             .SetWorkingDirectory(Paths.BaseWorkspaceTypescriptIntranet)
                             .SetArguments("--watch=false", "--reporters", "trx")
                             .SetCommand("test"));
                     CopyFileToDirectory(
                         Paths.BaseWorkspaceTypescriptIntranetTrx,
                         Paths.ArtifactsTests,
                         FileExistsPolicy.Overwrite);
                 }
             }
         });

    private Target BaseWorkspaceTypescriptIntranetGenericTests => _ => _
         .DependsOn(this.BaseWorkspaceScaffold)
         .DependsOn(BasePublishServer)
         .DependsOn(BasePublishCommands)
         .DependsOn(BaseResetDatabase)
         .Executes(async () =>
         {
             using (var sqlServer = new SqlServer())
             {
                 sqlServer.Restart();
                 sqlServer.Populate(Paths.ArtifactsBaseCommands);
                 using (var server = new Server(Paths.ArtifactsBaseServer))
                 {
                     using (var angular = new Angular(Paths.BaseWorkspaceTypescriptIntranet))
                     {
                         await server.Ready();
                         await angular.Init();
                         DotNetTest(
                             s => s
                                 .SetProjectFile(Paths.BaseWorkspaceTypescriptIntranetTests)
                                 .SetLogger("trx;LogFileName=BaseWorkspaceTypescriptIntranetTests.trx")
                                 .SetFilter("Category=Generic")
                                 .SetResultsDirectory(Paths.ArtifactsTests));
                     }
                 }
             }
         });

    private Target BaseWorkspaceTypescriptIntranetSpecificTests => _ => _
        .DependsOn(this.BaseWorkspaceScaffold)
        .DependsOn(BasePublishServer)
        .DependsOn(BasePublishCommands)
        .DependsOn(BaseResetDatabase)
        .Executes(async () =>
        {
            using (var sqlServer = new SqlServer())
            {
                sqlServer.Restart();
                sqlServer.Populate(Paths.ArtifactsBaseCommands);
                using (var server = new Server(Paths.ArtifactsBaseServer))
                {
                    using (var angular = new Angular(Paths.BaseWorkspaceTypescriptIntranet))
                    {
                        await server.Ready();
                        await angular.Init();
                        DotNetTest(
                            s => s
                                .SetProjectFile(Paths.BaseWorkspaceTypescriptIntranetTests)
                                .SetLogger("trx;LogFileName=BaseWorkspaceTypescriptIntranetTests.trx")
                                .SetFilter("Category=Other")
                                .SetResultsDirectory(Paths.ArtifactsTests));
                    }
                }
            }
        });

    private Target BaseWorkspaceTypescriptRelationSpecificTests => _ => _
        .DependsOn(this.BaseWorkspaceScaffold)
        .DependsOn(BasePublishServer)
        .DependsOn(BasePublishCommands)
        .DependsOn(BaseResetDatabase)
        .Executes(async () =>
        {
            using (var sqlServer = new SqlServer())
            {
                sqlServer.Restart();
                sqlServer.Populate(Paths.ArtifactsBaseCommands);
                using (var server = new Server(Paths.ArtifactsBaseServer))
                {
                    using (var angular = new Angular(Paths.BaseWorkspaceTypescriptIntranet))
                    {
                        await server.Ready();
                        await angular.Init();
                        DotNetTest(
                            s => s
                                .SetProjectFile(Paths.BaseWorkspaceTypescriptIntranetTests)
                                .SetLogger("trx;LogFileName=BaseWorkspaceTypescriptRelationTests.trx")
                                .SetFilter("Category=Relation")
                                .SetResultsDirectory(Paths.ArtifactsTests));
                    }
                }
            }
        });

    private Target BaseWorkspaceTypescriptOrderSpecificTests => _ => _
        .DependsOn(this.BaseWorkspaceScaffold)
        .DependsOn(BasePublishServer)
        .DependsOn(BasePublishCommands)
        .DependsOn(BaseResetDatabase)
        .Executes(async () =>
        {
            using (var sqlServer = new SqlServer())
            {
                sqlServer.Restart();
                sqlServer.Populate(Paths.ArtifactsBaseCommands);
                using (var server = new Server(Paths.ArtifactsBaseServer))
                {
                    using (var angular = new Angular(Paths.BaseWorkspaceTypescriptIntranet))
                    {
                        await server.Ready();
                        await angular.Init();
                        DotNetTest(
                            s => s
                                .SetProjectFile(Paths.BaseWorkspaceTypescriptIntranetTests)
                                .SetLogger("trx;LogFileName=BaseWorkspaceTypescriptOrderTests.trx")
                                .SetFilter("Category=Order")
                                .SetResultsDirectory(Paths.ArtifactsTests));
                    }
                }
            }
        });

    private Target BaseWorkspaceTypescriptInvoiceSpecificTests => _ => _
        .DependsOn(this.BaseWorkspaceScaffold)
        .DependsOn(BasePublishServer)
        .DependsOn(BasePublishCommands)
        .DependsOn(BaseResetDatabase)
        .Executes(async () =>
        {
            using (var sqlServer = new SqlServer())
            {
                sqlServer.Restart();
                sqlServer.Populate(Paths.ArtifactsBaseCommands);
                using (var server = new Server(Paths.ArtifactsBaseServer))
                {
                    using (var angular = new Angular(Paths.BaseWorkspaceTypescriptIntranet))
                    {
                        await server.Ready();
                        await angular.Init();
                        DotNetTest(
                            s => s
                                .SetProjectFile(Paths.BaseWorkspaceTypescriptIntranetTests)
                                .SetLogger("trx;LogFileName=BaseWorkspaceTypescriptInvoiceTests.trx")
                                .SetFilter("Category=Invoice")
                                .SetResultsDirectory(Paths.ArtifactsTests));
                    }
                }
            }
        });

    private Target BaseWorkspaceTypescriptProductSpecificTests => _ => _
        .DependsOn(this.BaseWorkspaceScaffold)
        .DependsOn(BasePublishServer)
        .DependsOn(BasePublishCommands)
        .DependsOn(BaseResetDatabase)
        .Executes(async () =>
        {
            using (var sqlServer = new SqlServer())
            {
                sqlServer.Restart();
                sqlServer.Populate(Paths.ArtifactsBaseCommands);
                using (var server = new Server(Paths.ArtifactsBaseServer))
                {
                    using (var angular = new Angular(Paths.BaseWorkspaceTypescriptIntranet))
                    {
                        await server.Ready();
                        await angular.Init();
                        DotNetTest(
                            s => s
                                .SetProjectFile(Paths.BaseWorkspaceTypescriptIntranetTests)
                                .SetLogger("trx;LogFileName=BaseWorkspaceTypescriptProductTests.trx")
                                .SetFilter("Category=Product")
                                .SetResultsDirectory(Paths.ArtifactsTests));
                    }
                }
            }
        });

    private Target BaseWorkspaceTypescriptShipmentSpecificTests => _ => _
        .DependsOn(this.BaseWorkspaceScaffold)
        .DependsOn(BasePublishServer)
        .DependsOn(BasePublishCommands)
        .DependsOn(BaseResetDatabase)
        .Executes(async () =>
        {
            using (var sqlServer = new SqlServer())
            {
                sqlServer.Restart();
                sqlServer.Populate(Paths.ArtifactsBaseCommands);
                using (var server = new Server(Paths.ArtifactsBaseServer))
                {
                    using (var angular = new Angular(Paths.BaseWorkspaceTypescriptIntranet))
                    {
                        await server.Ready();
                        await angular.Init();
                        DotNetTest(
                            s => s
                                .SetProjectFile(Paths.BaseWorkspaceTypescriptIntranetTests)
                                .SetLogger("trx;LogFileName=BaseWorkspaceTypescriptShipmentTests.trx")
                                .SetFilter("Category=Shipment")
                                .SetResultsDirectory(Paths.ArtifactsTests));
                    }
                }
            }
        });

    private Target BaseWorkspaceTypescriptWorkEffortSpecificTests => _ => _
        .DependsOn(this.BaseWorkspaceScaffold)
        .DependsOn(BasePublishServer)
        .DependsOn(BasePublishCommands)
        .DependsOn(BaseResetDatabase)
        .Executes(async () =>
        {
            using (var sqlServer = new SqlServer())
            {
                sqlServer.Restart();
                sqlServer.Populate(Paths.ArtifactsBaseCommands);
                using (var server = new Server(Paths.ArtifactsBaseServer))
                {
                    using (var angular = new Angular(Paths.BaseWorkspaceTypescriptIntranet))
                    {
                        await server.Ready();
                        await angular.Init();
                        DotNetTest(
                            s => s
                                .SetProjectFile(Paths.BaseWorkspaceTypescriptIntranetTests)
                                .SetLogger("trx;LogFileName=BaseWorkspaceTypescriptWorkEffortTests.trx")
                                .SetFilter("Category=WorkEffort")
                                .SetResultsDirectory(Paths.ArtifactsTests));
                    }
                }
            }
        });

    private Target BaseWorkspaceTypescriptTest => _ => _
        .DependsOn(BaseWorkspaceTypescriptDomain)
        .DependsOn(BaseWorkspaceTypescriptIntranet);

    private Target BaseTest => _ => _
        .DependsOn(BaseDatabaseTest)
        .DependsOn(BaseWorkspaceTypescriptTest);

    private Target Base => _ => _
        .DependsOn(Clean)
        .DependsOn(BaseTest);
}
