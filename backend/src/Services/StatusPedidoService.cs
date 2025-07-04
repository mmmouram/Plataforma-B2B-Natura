using System.Threading.Tasks;
using MyApp.Models;
using MyApp.Repositories;

namespace MyApp.Services
{
    public class StatusPedidoService : IStatusPedidoService
    {
        private readonly IStatusPedidoRepository _repository;

        public StatusPedidoService(IStatusPedidoRepository repository)
        {
            _repository = repository;
        }

        public async Task<PedidoStatusResponse> ConsultarStatusPedidoAsync(string numeroPedido)
        {
            var pedido = await _repository.ObterPedidoPorNumeroAsync(numeroPedido);

            if (pedido == null)
            {
                // Cenário: Pedido inexistente
                return new PedidoStatusResponse { Existe = false };
            }

            if (pedido.PagamentoPendente)
            {
                // Cenário: Regra de negócio – Pedido pendente de pagamento
                return new PedidoStatusResponse
                {
                    Existe = true,
                    PagamentoPendente = true,
                    Mensagem = "Aguardando pagamento",
                    Status = pedido.Status,
                    PrevisaoEntrega = pedido.PrevisaoEntrega?.ToString("dd/MM/yyyy"),
                    UltimoEventoLogistico = pedido.UltimoEvento
                };
            }

            // Cenário: Consulta bem-sucedida de status
            return new PedidoStatusResponse
            {
                Existe = true,
                PagamentoPendente = false,
                Status = pedido.Status,
                PrevisaoEntrega = pedido.PrevisaoEntrega?.ToString("dd/MM/yyyy"),
                UltimoEventoLogistico = pedido.UltimoEvento
            };
        }
    }
}
