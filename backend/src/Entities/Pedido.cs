using System;

namespace MyApp.Entities
{
    public class Pedido
    {
        public int Id { get; set; }

        // Identificador do pedido conforme sistema externo
        public string NumeroPedido { get; set; }

        // Status atual do pedido (ex: "Enviado", "Aguardando pagamento", etc.)
        public string Status { get; set; }

        // Previsão de entrega
        public DateTime? PrevisaoEntrega { get; set; }

        // Último evento logístico registrado
        public string UltimoEvento { get; set; }

        // Indica se o pedido está com pagamento pendente
        public bool PagamentoPendente { get; set; }
    }
}
