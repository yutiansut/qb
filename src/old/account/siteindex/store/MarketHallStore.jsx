import {observable} from "mobx";
import {RequestStore} from "../../../store/request.jsx";

class MarketHallStore extends RequestStore{
   @observable marketType = 0;
   @observable marketData = '';
}

export default MarketHallStore
