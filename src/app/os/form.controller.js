export default class FormController {
  constructor($state, $stateParams, clienteService, itemService, osService) {
    this.record = {};
    this.record.valorTotal = 0;
    this.cliente = {};
    this.cliente.nome = null;
    this.item = {};
    this.clientes = [];
    this.itens = [];
    this.itensAdicionados = [];
    this._$state = $state;
    this._id = $stateParams.id;
    this._clienteService = clienteService;
    this._itemService = itemService;
    this._osService = osService;
    if (this._id) {
      this.findById();
    }
    this.findClientes();
    this.findItens();
    this.cols = [
      {
        label: "Descrição",
        value: "descricao",
        type: "text"
      },
      {
        label: "Valor",
        value: "valor",
        type: "number"
      }
    ];
  }

  async save() {
    this.record.cliente = {};
    this.record.itens = [];
    this.record.cliente = this.cliente;
    this.itensAdicionados.forEach(value => {
      let item = {}
      item.id = value.id
      item.descricao = value.descricao
      item.valor = value.valor
      this.record.itens.push(item)
    })
    this.record.itens = this.itensAdicionados;
    if (this._id) {
      await this._osService.update(this.record);
    } else {
      await this._osService.insert(this.record);
    }
    this._$state.go("app.os.list");
  }

  findById() {
    return this._osService.findById(this._id).then(response => {
      this.record = response;
      this.record.dataEntrada = new Date(response.dataEntrada);
      this.record.dataSaida = new Date(response.dataSaida);
      this.cliente = response.cliente;
      this.record.itens.forEach(item => {
        this._itemService.findById(item.id).then(response => {
          this.itensAdicionados.push(response);
        });
      });
    });
  }

  findClientes() {
    return this._clienteService.findAll().then(response => {
      this.clientes = response;
    });
  }

  findItens() {
    return this._itemService.findAll().then(response => {
      this.itens = response;
    });
  }

  incluirItem() {
    this.itensAdicionados.push(this.item);
    this.record.valorTotal += this.item.valor;
  }

  removerItem(item) {
    this.itensAdicionados.pop(item);
    this.record.valorTotal -= item.valor;
  }
}

FormController.$inject = [
  "$state",
  "$stateParams",
  "clienteService",
  "itemService",
  "osService"
];
