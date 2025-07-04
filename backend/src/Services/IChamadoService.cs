using System.Threading.Tasks;

public interface IChamadoService
{
    Task<Chamado> AbrirChamadoAutomaticoAsync(int pedidoId);
}
