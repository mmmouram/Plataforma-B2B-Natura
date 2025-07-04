using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyApp.Entities;
using MyApp.Data;

namespace MyApp.Repositories
{
    public class StatusPedidoRepository : IStatusPedidoRepository
    {
        private readonly ApplicationDbContext _context;

        public StatusPedidoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Pedido> ObterPedidoPorNumeroAsync(string numeroPedido)
        {
            return await _context.Pedidos.FirstOrDefaultAsync(p => p.NumeroPedido == numeroPedido);
        }
    }
}
