import {MANAGEMENT_USERS_URLS} from "../utils/service";
import usersMocks from "./usersMock"
import oneUserMock from "./oneUserMock";
import accessMock from "./accessMock"
import modulesMocks from "./modulesMocks"

export default function mockManagementUsers(mock){

  mock.onGet(MANAGEMENT_USERS_URLS.GET).reply(() => {
    return [200, usersMocks]
  })

  mock.onGet(new RegExp(MANAGEMENT_USERS_URLS.GET_ONE("1"))).reply(() => {
    return [200, oneUserMock]
  })

  mock.onGet(new RegExp(MANAGEMENT_USERS_URLS.GET_ACCESS("1"))).reply(() => {
    return [200, accessMock]
  })

  mock.onGet(MANAGEMENT_USERS_URLS.GET_MODULES).reply(() => {
    return [200, modulesMocks]
  })
}