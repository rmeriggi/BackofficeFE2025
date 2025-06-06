import { useIdleTimer } from 'react-idle-timer';
import { useHistory } from "react-router";
import { useSelector, shallowEqual } from "react-redux";
import { useLocation  } from "react-router-dom"




export const useIdle = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const history = useHistory();

    const { exp } = useSelector((state) => state.auth.user, shallowEqual);
  
    const handleOnIdle = () => {
      if(currentPath.includes('/investments')){
        console.log('keep running')
        reset();
      } else {
        history.push('/logout')
      }
      
    }
  
    const handleOnAction = () => {
      const  date = new Date();
      const tokenExp = new Date(exp*1000);
  
      if(date >= tokenExp) {
        console.log('keep running')
        if(currentPath.includes('/investments')){
          reset();
        } else {
          history.push('/logout')
        }
        
      }
    }
    const { reset } =useIdleTimer({
      timeout: 1000 * 60 *15, 
      onIdle: handleOnIdle,
      onAction: handleOnAction,
      debounce: 500
    })
    
}