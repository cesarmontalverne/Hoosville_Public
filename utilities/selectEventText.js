import { getRandomInt } from "./getRandomInt";

export default function selectEventText(occ, events){
    let temp =""
    switch(occ) { //used case to avoid errors (if sheets is changed inappropriately, it should cause an error)
        case "doctor":
            temp = events.doctor
            break
        case "plumber":
            temp = events.plumber
            break
        case "lawyer":
            temp = events.lawyer
            break
        case "farmer":
            temp = events.farmer
            break
        case "actor":
            temp = events.actor
            break
        case "architect":
            temp = events.architect
            break
        case "artist":
            temp = events.artist
            break
        case "athlete":
            temp = events.athlete
            break
        case "banker":
            temp = events.banker
            break
        case "ceo":
            temp = events.ceo
            break
        case "chef":
            temp = events.chef
            break
        case "chemist":
            temp = events.chemist
            break
        case "dentist":
            temp = events.dentist
            break
        default:
            temp = "An Event Happened;"
        }
        try{
            return temp[getRandomInt(0, temp.length)].split(";")
        }
        catch{
            //console.warn("there's something wrong with the AppData Google Spreadsheet")
            return ["An Event Happened",""]
        }
}