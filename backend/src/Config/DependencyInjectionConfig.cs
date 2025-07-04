using Microsoft.Extensions.DependencyInjection;
using MyApp.Services;
using MyApp.Repositories;
using MyApp.Data;
using Microsoft.EntityFrameworkCore;

namespace MyApp.Config
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection AddDependencies(this IServiceCollection services, string connectionString)
        {
            // Configura o Entity Framework com SQL Server
            services.AddDbContext<ApplicationDbContext>(options => 
                options.UseSqlServer(connectionString));

            // Injeta as dependências dos repositórios e serviços
            services.AddScoped<IStatusPedidoRepository, StatusPedidoRepository>();
            services.AddScoped<IStatusPedidoService, StatusPedidoService>();

            return services;
        }
    }
}
