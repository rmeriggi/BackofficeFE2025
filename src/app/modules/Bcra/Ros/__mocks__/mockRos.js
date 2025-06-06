import {ROS_URLS} from "../utils/service";
import rosMocks from "./rosMocks";

export default function mockRos(mock){

  mock.onGet(ROS_URLS.GET).reply(() => {
    return [200, rosMocks]
  })
}