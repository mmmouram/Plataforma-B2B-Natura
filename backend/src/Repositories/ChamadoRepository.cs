using System.Threading.Tasks;

public class ChamadoRepository : IChamadoRepository
{
    private readonly AppDbContext _context;

    public ChamadoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task CriarChamadoAsync(Chamado chamado)
    {
        await _context.Chamados.AddAsync(chamado);
        await _context.SaveChangesAsync();
    }
}
