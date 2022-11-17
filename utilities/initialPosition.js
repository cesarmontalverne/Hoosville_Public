import { getRandomInt } from "./getRandomInt";
export function initialPosition(numPlayers){
    let playerIndByPosition = new Map()
    let toret = [[0,0]]
    while(toret.length<numPlayers){
      let temp = [getRandomInt(0,10), getRandomInt(0,10)]
      if(!playerIndByPosition.has(temp)){
        toret.push(temp)
        playerIndByPosition.set(temp, toret.length - 1)
      } 
    }
    return toret
  }