using System.Threading.Tasks;

public interface IChamadoRepository
{
    Task CriarChamadoAsync(Chamado chamado);
}
