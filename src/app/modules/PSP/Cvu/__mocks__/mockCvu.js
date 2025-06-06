import { format } from "date-fns";
import {CVU_URLS} from "../utils/service";
import cvuMocks from "./cvuMocks";

const date = format(new Date() , "yyyy/MM/dd")

export default function mockCvu(mock){

  mock.onPost(CVU_URLS.GET, {fromDate: date, toDate: date}).reply(() => {
    return [200, cvuMocks]
  })
}