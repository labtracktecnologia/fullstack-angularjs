export default class ClienteService {
  constructor($http) {
    this.http = $http;
    this.url = "http://localhost:3000/clientes";
  }

  findByPesquisa(pesquisa) {
    return this.http
      .get(this.url + "-pesquisa", { params: { pesquisa: pesquisa } })
      .then(function(response) {
        return response.data;
      });
  }

  findById(id) {
    return this.http.get(this.url + "/" + id).then(function(response) {
      return response.data;
    });
  }

  findAll() {
    return this.http.get(this.url).then(function(response) {
      return response.data;
    });
  }

  insert(registro) {
    return this.http.post(this.url, registro).then(function(response) {
      return response.data;
    });
  }

  update(registro) {
    return this.http
      .put(this.url + "/" + registro._id, registro)
      .then(function(response) {
        return response.data;
      });
  }

  remove(id) {
    return this.http.delete(this.url + "/" + id).then(function(response) {
      return response.data;
    });
  }
}

ClienteService.$inject = ["$http"];
