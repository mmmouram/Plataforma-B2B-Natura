using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyApp.Services;
using MyApp.Models;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatusPedidoController : ControllerBase
    {
        private readonly IStatusPedidoService _statusPedidoService;

        public StatusPedidoController(IStatusPedidoService statusPedidoService)
        {
            _statusPedidoService = statusPedidoService;
        }

        /// <summary>
        /// Consulta o status do pedido informado
        /// </summary>
        /// <param name="numeroPedido">Número do pedido a ser consultado</param>
        /// <returns>Detalhes do status do pedido ou mensagem de erro</returns>
        [HttpGet("{numeroPedido}")]
        public async Task<IActionResult> ObterStatusPedido(string numeroPedido)
        {
            var resultado = await _statusPedidoService.ConsultarStatusPedidoAsync(numeroPedido);

            if (!resultado.Existe)
            {
                // Cenário: Pedido inexistente
                return NotFound(new { mensagem = "Pedido não existe", opcaoBuscarOutro = true });
            }

            if (resultado.PagamentoPendente)
            {
                // Cenário: Regra de negócio – Pedido pendente de pagamento
                return Ok(new { mensagem = "Aguardando pagamento", detalhes = resultado });
            }

            // Cenário: Consulta bem-sucedida de status
            return Ok(resultado);
        }
    }
}
