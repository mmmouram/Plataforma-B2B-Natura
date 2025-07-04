namespace MyApp.Models
{
    public class PedidoStatusResponse
    {
        /// <summary>
        /// Indica se o pedido existe
        /// </summary>
        public bool Existe { get; set; }

        /// <summary>
        /// Se o pedido possui pagamento pendente
        /// </summary>
        public bool PagamentoPendente { get; set; }

        /// <summary>
        /// Status atual do pedido
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// Previsão de entrega do pedido
        /// </summary>
        public string PrevisaoEntrega { get; set; }

        /// <summary>
        /// Último evento logístico registrado
        /// </summary>
        public string UltimoEventoLogistico { get; set; }

        /// <summary>
        /// Mensagem complementar (ex: mensagens de alerta)
        /// </summary>
        public string Mensagem { get; set; }
    }
}
