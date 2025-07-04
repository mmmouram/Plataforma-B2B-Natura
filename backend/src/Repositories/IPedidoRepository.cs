using System.Threading.Tasks;

public interface IPedidoRepository
{
    Task<Pedido> ObterPedidoPorIdAsync(int id);
    Task AtualizarPedidoAsync(Pedido pedido);
}
