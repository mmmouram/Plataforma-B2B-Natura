using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PedidoController : ControllerBase
{
    private readonly IPedidoService _pedidoService;

    public PedidoController(IPedidoService pedidoService)
    {
        _pedidoService = pedidoService;
    }

    /// <summary>
    /// Endpoint para consulta de status de pedido
    /// </summary>
    /// <param name="id">Identificador do pedido</param>
    /// <returns>Dados do pedido com status atualizado e itens</returns>
    [HttpGet("{id}")]
    public async Task<IActionResult> ObterPedido(int id)
    {
        try
        {
            var pedido = await _pedidoService.ConsultarStatusPedidoAsync(id);
            if (pedido == null)
                return NotFound(new { mensagem = "Pedido não encontrado" });
            
            return Ok(new
            {
                id = pedido.Id,
                status = pedido.Status,
                dataUltimaAtualizacao = pedido.DataUltimaAtualizacao,
                itens = pedido.Itens
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { mensagem = ex.Message });
        }
    }
}
