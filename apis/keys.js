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
    "AIzaSyAIMQ8rU-hO7e6gJ1FsluQBhDh54diCOlk", //sheets_token
    "18R94YiYe3035ng9NPtfdk7PJQABlgvCRfOobvQA-IbE", // sheets_id
    { //firebaseConfig JSON
    apiKey: "AIzaSyAIj24HKHoZ1m6rXT7QIiyPJFHZpKN3uG4",
    authDomain: "friendme-3cb2a.firebaseapp.com",
    projectId: "friendme-3cb2a",
    storageBucket: "friendme-3cb2a.appspot.com",
    messagingSenderId: "367045694611",
    appId: "1:367045694611:web:49bee45cc952c8c599a966",
    measurementId: "G-KXYNKVHP3S"
  })

export default ks;