using System;
using System.Collections.Generic;

public class Pedido
{
    public int Id { get; set; }
    public DateTime DataPedido { get; set; }
    public DateTime DataUltimaAtualizacao { get; set; }
    public string Status { get; set; }
    public List<ItemPedido> Itens { get; set; }
}
