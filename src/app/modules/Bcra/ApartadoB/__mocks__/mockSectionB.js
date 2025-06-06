import { format } from "date-fns";
import {SECTIONB_URLS} from "../utils/service";
import sectionBMocks from "./sectionBMocks";

const date = format(new Date() , "yyyy/MM/dd")

export default function mockSectionB(mock){

  mock.onPost(SECTIONB_URLS.GET, {fromDate: date, toDate: date}).reply(() => {
    return [200, sectionBMocks]
  })
}