using System.Threading.Tasks;

public interface IPedidoService
{
    Task<Pedido> ConsultarStatusPedidoAsync(int pedidoId);
}
