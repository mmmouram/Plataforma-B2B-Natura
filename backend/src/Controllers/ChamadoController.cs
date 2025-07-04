using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ChamadoController : ControllerBase
{
    private readonly IChamadoService _chamadoService;

    public ChamadoController(IChamadoService chamadoService)
    {
        _chamadoService = chamadoService;
    }

    /// <summary>
    /// Endpoint para abertura de chamado automático baseado na falta de atualização do pedido
    /// </summary>
    /// <param name="pedidoId">Identificador do pedido</param>
    /// <returns>Confirmação e detalhes do chamado aberto</returns>
    [HttpPost("{pedidoId}")]
    public async Task<IActionResult> AbrirChamado(int pedidoId)
    {
        try
        {
            var chamado = await _chamadoService.AbrirChamadoAutomaticoAsync(pedidoId);
            return Ok(new { mensagem = "Chamado aberto com sucesso", chamado });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { mensagem = ex.Message });
        }
    }
}
