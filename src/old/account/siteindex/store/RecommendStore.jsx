import {observable} from "mobx";
import {RequestStore} from "../../../store/request.jsx";

class RecommendStore extends RequestStore{
   @observable recommendData = '';
}

export default RecommendStore
