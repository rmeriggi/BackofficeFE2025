import { format } from "date-fns";
import {SECTIONA_URLS} from "../utils/service";
import sectionAMocks from "./sectionAMocks";

const date = format(new Date() , "yyyy/MM/dd")

export default function mockSectionA(mock){

  mock.onPost(SECTIONA_URLS.GET, {fromDate: date, toDate: date}).reply(() => {
    return [200, sectionAMocks]
  })
}