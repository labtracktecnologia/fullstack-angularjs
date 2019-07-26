export default class ListController {
  constructor($state, itemService) {
    this.records = [];
    this._$state = $state;
    this._itemService = itemService;
    this.findAll();
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

  buscar(pesquisa) {
    this.record = [];
    this.findByPesquisa(pesquisa);
  }

  findAll() {
    return this._itemService.findAll().then(response => {
      this.records = response;
      return this.records;
    });
  }

  findByPesquisa(pesquisa) {
    return this._itemService.findByPesquisa(pesquisa).then(response => {
      this.records = response;
      return this.records;
    });
  }

  async excluir(id) {
    await this._itemService.remove(id);
    this._$state.reload();
  }
}

ListController.$inject = ["$state", "itemService"];
