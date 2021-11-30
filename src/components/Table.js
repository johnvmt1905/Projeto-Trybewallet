import React from 'react';

class Table extends React.Component {
  render() {
    const trArr = ['Descrição', 'Tag',
      'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <tr>
          {trArr.map((tr) => <th key={ tr }>{tr}</th>)}
        </tr>
      </table>
    );
  }
}

export default Table;
