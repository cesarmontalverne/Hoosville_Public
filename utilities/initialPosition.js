import { getRandomInt } from "./getRandomInt";
export function initialPosition(numPlayers){
    let findInd = (arr,targetArr)=>{
      for(let i = 0; i<arr.length; i+=1){
        if(arr[i][0]==targetArr[0] && arr[i][1]==targetArr[1]) return i
      }
      return -1
    }
    let toret = [[0,0]]
    while(toret.length<numPlayers){
      let temp = [getRandomInt(0,10), getRandomInt(0,10)]
      if(findInd(toret, temp)==-1) toret.push(temp)
    }
    return toret
  }