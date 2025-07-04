using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

// Import dos namespaces dos nossos módulos
using backend.src.Data;
using backend.src.Repositories;
using backend.src.Services;
using backend.src.Middlewares;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        // Configurar o Entity Framework com SQL Server
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
        );

        // Injeção de dependências para repositórios e serviços
        services.AddScoped<IPedidoRepository, PedidoRepository>();
        services.AddScoped<IPedidoService, PedidoService>();
        services.AddScoped<IChamadoRepository, ChamadoRepository>();
        services.AddScoped<IChamadoService, ChamadoService>();

        // Swagger para documentação da API
        services.AddSwaggerGen();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // Middleware de tratamento global de erros
        app.UseMiddleware<ErrorHandlingMiddleware>();

        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
        });

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
