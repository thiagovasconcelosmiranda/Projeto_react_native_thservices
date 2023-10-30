import { createContext} from "react";
import { API} from "../Api";
export const PhotoContext = createContext({});
 
 function PhotoProvider({children}){
      return(
          <PhotoContext.Provider value={{link:`${API}/storage/`}}>
                {children}
          </PhotoContext.Provider>
      )
 }
 export default PhotoProvider;