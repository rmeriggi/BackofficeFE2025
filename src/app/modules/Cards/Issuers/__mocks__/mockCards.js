import { PRODUCTS_URLS } from "../utils/service";
import productMock from "./productMock";

export default function mockCardsProduct(mock) {

    mock.onGet(PRODUCTS_URLS.GET_ALL_PRODUCTS).reply(() => {
        return [200, productMock]
      })

}