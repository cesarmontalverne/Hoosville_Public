//Altered for safety reasons

class keys{
    constructor(sheets_token, sheets_id, firebaseConfig){
        this.sheets_token = sheets_token
        this.sheets_id = sheets_id
        this.firebaseConfig = firebaseConfig
    }  
    get_sheets_url = (range)=> {
        return ["https://sheets.googleapis.com/v4/spreadsheets/",this.sheets_id,"/values/",range,"?majorDimension=COLUMNS&valueRenderOption=UNFORMATTED_VALUE&key=",this.sheets_token].join('')
    }
}

const ks = new keys(
    "", //sheets_token
    "", // sheets_id
    { //firebaseConfig JSON
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  })

export default ks;