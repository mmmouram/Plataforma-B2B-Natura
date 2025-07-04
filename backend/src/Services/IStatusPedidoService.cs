using System.Threading.Tasks;
using MyApp.Models;

namespace MyApp.Services
{
    public interface IStatusPedidoService
    {
        Task<PedidoStatusResponse> ConsultarStatusPedidoAsync(string numeroPedido);
    }
}
