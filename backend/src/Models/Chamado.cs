using System;

public class Chamado
{
    public int Id { get; set; }
    public int PedidoId { get; set; }
    public DateTime DataAbertura { get; set; }
    public string Status { get; set; }
    public string Mensagem { get; set; }
    public bool Prioritario { get; set; }
}
