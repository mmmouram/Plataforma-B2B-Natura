using System;
using System.Threading.Tasks;

public class ChamadoService : IChamadoService
{
    private readonly IChamadoRepository _chamadoRepository;
    private readonly IPedidoRepository _pedidoRepository;

    public ChamadoService(IChamadoRepository chamadoRepository, IPedidoRepository pedidoRepository)
    {
        _chamadoRepository = chamadoRepository;
        _pedidoRepository = pedidoRepository;
    }

    public async Task<Chamado> AbrirChamadoAutomaticoAsync(int pedidoId)
    {
        var pedido = await _pedidoRepository.ObterPedidoPorIdAsync(pedidoId);
        if (pedido == null) 
            throw new Exception("Pedido não encontrado");

        // Verifica se houve atualização nos últimos 48 horas
        if ((DateTime.Now - pedido.DataUltimaAtualizacao).TotalHours < 48)
            throw new Exception("Chamado não necessário, pedido atualizado recentemente");

        var chamado = new Chamado
        {
            PedidoId = pedidoId,
            DataAbertura = DateTime.Now,
            Status = "Aberto",
            Mensagem = "Chamado aberto automaticamente devido à ausência de atualização",
            Prioritario = true
        };

        try
        {
            await _chamadoRepository.CriarChamadoAsync(chamado);
        }
        catch (Exception)
        {
            // Em caso de falha, os dados podem ser persistidos para retentativa posteriormente
            throw new Exception("Falha ao abrir chamado, tente novamente");
        }

        return chamado;
    }
}
