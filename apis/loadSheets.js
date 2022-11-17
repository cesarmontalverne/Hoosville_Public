import sheets from "./sheets"
import keys from "./keys"
export default async function loadSheets(range){
    try{
      return(await sheets(keys.get_sheets_url(range)))
    }
    catch{
      console.warn("error loading loadSheets")
    }
  }
  
