
let load_events = (arr)=>{
  let json_events = ""
  for (let i = 0; i < arr.length; i++) {
    let occup_name = arr[i].splice(0,1)[0]
    let event_array = arr[i]
    if(i!=0) json_events = [json_events,","].join("")
    json_events = [json_events,'"',occup_name,'"',":",JSON.stringify(event_array)].join("")
  }
  //console.log(["{",json_events,"}"].join(""))
  return(JSON.parse(["{",json_events,"}"].join("")))
}
const sheets = async (url) => {
  try {
    let values = await fetch(url).then((res)=>res.json())
    return load_events(values.values);
  } catch {
    console.warn("Error loading sheets");
  }
};
export default sheets;
