using System;
using System.Threading.Tasks;

public class PedidoService : IPedidoService
{
    private readonly IPedidoRepository _pedidoRepository;

    public PedidoService(IPedidoRepository pedidoRepository)
    {
        _pedidoRepository = pedidoRepository;
    }

    public async Task<Pedido> ConsultarStatusPedidoAsync(int pedidoId)
    {
        // Simulação da integração com o sistema logístico
        try
        {
            var pedido = await _pedidoRepository.ObterPedidoPorIdAsync(pedidoId);
            if (pedido == null)
                throw new Exception("Pedido não encontrado");
            
            // Aqui poderia ser implementada a lógica de integração para atualizar o status
            return pedido;
        }
        catch (Exception ex)
        {
            // Se ocorrer erro na integração com o sistema logístico
            if (ex.Message.Contains("integrac"))
                throw new Exception("Status temporariamente indisponível, tente novamente mais tarde");
            throw;
        }
    }
}
