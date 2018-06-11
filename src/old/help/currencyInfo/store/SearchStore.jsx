import {observable} from "mobx";


class SearchStore {
  @observable query = '';
  @observable type = -1;

  constructor(allArray) {
    this.allArray = allArray;
  }
}

export default SearchStore
