using System;

public class Notificacao
{
    public int Id { get; set; }
    public int PedidoId { get; set; }
    public string Mensagem { get; set; }
    public DateTime DataEnvio { get; set; }
    public bool Enviada { get; set; }
}
