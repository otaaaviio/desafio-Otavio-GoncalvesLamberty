import valoresMenu from "./valores-menu";

function processarItens(item) {
  const [codigo, quantidade] = item.split(",");

  return {
    codigo: codigo,
    quantidade: parseInt(quantidade),
  };
}

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    var valorTotal = 0;
    var valorDePagamento;
    let message = "";

    if (itens.length === 0) return "Não há itens no carrinho de compra!";

    for (let item of itens) {
      let resultado = processarItens(item);

      if (!valoresMenu.has(resultado.codigo)) {
        return "Item inválido!";
      }

      if (resultado.codigo == "chantily" || resultado.codigo == "queijo") {
        const itemPrincipal = itens.find((itemPrincipal) => {
          const resultadoItem = processarItens(itemPrincipal);

          if (resultado.codigo == "chantily") {
            return (
              resultadoItem.codigo == "cafe" || resultadoItem.codigo == "combo2"
            );
          }

          if (resultado.codigo == "queijo") {
            return (
              resultadoItem.codigo == "sanduiche" ||
              resultadoItem.codigo == "combo1" ||
              resultadoItem.codigo == "combo2"
            );
          }
        });

        if (!itemPrincipal) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      const valorItem = valoresMenu.get(resultado.codigo);

      if (resultado.quantidade < 1) return "Quantidade inválida!";

      valorTotal += valorItem * resultado.quantidade;
    }

    switch (metodoDePagamento) {
      case "dinheiro":
        valorDePagamento = valorTotal * 0.95;
        break;
      case "debito":
        valorDePagamento = valorTotal;
        break;
      case "credito":
        valorDePagamento = valorTotal * 1.03;
        break;
      default:
        return "Forma de pagamento inválida!";
    }

    message = `R$ ${valorDePagamento.toFixed(2).replace(".", ",")}`;

    return message;
  }
}

export { CaixaDaLanchonete };
