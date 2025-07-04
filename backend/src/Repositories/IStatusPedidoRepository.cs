using System.Threading.Tasks;
using MyApp.Entities;

namespace MyApp.Repositories
{
    public interface IStatusPedidoRepository
    {
        Task<Pedido> ObterPedidoPorNumeroAsync(string numeroPedido);
    }
}
