import { Alert } from 'react-native';
import { createStore } from 'redux';
import db from './firebase/firebase';
import { initialPosition } from './utilities/initialPosition';
import { get, child, set, update } from 'firebase/database';
const initialState = {
    squares: initialPosition(10), 
    miniMap: false,
    gameOn: false,
    board:0,
    energy:100,
    rid:"",
    events:"",
    //settings controllables
    //basic settings
    initialTime:1800,
    time: 1800,
    numPlayers:10,
    lumpSum:1000,  
    payments:0, 
    maxMoney:1000,
    //friendmeter and energy
    friendMeterSpeed: 1.5, //decay still happens(so take that into account!)
    friendMeterDecay: 0.5,
    energyFriendDrain: 0.2, //still recoup energy
    energyRecoup: 0.1, 
    energyCostMoving:2,
    acquaintanceDiscount:10,
    friendDiscount:20,
    bestfriendDiscount:30,
    //events
    priceOne:10,
    priceOneSd:1,
    probOne: 40,
    priceTwo:15,
    priceTwoSd:1,
    probTwo:40,
    probZero:20,
    averageTimeEvent: 5,
    standardDevTimeEvent:1,
  }
  const reducer = (state, action) => {
    //change-> one for each var
    switch(action.type){
      case 'NEW_MINIMAP':
        return {...state, miniMap:action.newMiniMap}
      case 'NEW_SQUARES':
        return {...state, squares:action.newSquares}
      case 'INC_ENERGY':
        return {...state, energy:Math.max(Math.min(state.energy+action.energyInc,100),0)}
      case 'NEW_GAMEON':
        return {...state, gameOn:action.newGameOn}
      case 'NEW_RID':
        return {...state, rid:action.rid}
      case 'NEW_EVENTS':
        //https://spreadsheets.google.com/feeds/cells/1gf_pLlHzQ_3mnTxZ7QYKAItlwVMAyzwbYc4XfRnh0kI/1/public/full?alt=json
        if(state.events!="") return {...state, events:null}
      case 'NEW_TIME':
        return {...state, time:action.newTime}
      case 'NEW_BOARD':
        return {...state, board:(state.board+1)%2}
      case 'RESTART':
        return {
          squares: initialPosition(state.numPlayers),
          miniMap: false,
          gameOn: false,
          board:0,
          energy: 100,
          rid:"",
          events:"",
          //settings controllables
          //basic settings
          initialTime: state.initialTime,
          time: state.initialTime,
          numPlayers: state.numPlayers,
          lumpSum: state.lumpSum,
          payments: state.payments,
          maxMoney: state.maxMoney,
          //friendmeter and energy
          friendMeterSpeed: state.friendMeterSpeed, //decay still happens(so take that into account!)
          friendMeterDecay: state.friendMeterDecay,
          energyFriendDrain: state.energyFriendDrain, //still recoup energy
          energyRecoup: state.energyRecoup,
          energyCostMoving: state.energyCostMoving,
          acquaintanceDiscount: state.acquaintanceDiscount,
          friendDiscount: state.friendDiscount,
          bestfriendDiscount: state.bestfriendDiscount,
          //events
          priceOne: state.priceOne,
          priceOneSd: state.priceOneSd,
          probOne: state.probOne,
          priceTwo: state.priceTwo,
          priceTwoSd: state.priceTwoSd,
          probTwo: state.probTwo,
          probZero: state.probZero,
          averageTimeEvent: state.averageTimeEvent,
          standardDevTimeEvent: state.standardDevTimeEvent
        }
      //settings controllables
      ////////////////////////////////////////////////////////////////
      //basic
      case 'NEW_INITIALTIME':
        return { ...state, initialTime: action.newVar, time: action.newVar }
      case 'NEW_NUMPLAYERS':
        if (action.newVar >= 26 || action.newVar < 2) Alert.alert('input 2 to 20 players please')
        else return { ...state, numPlayers: Math.floor(action.newVar), squares: initialPosition(Math.floor(action.newVar)) }
      case 'NEW_LUMPSUM':
        return { ...state, lumpSum: action.newVar }
      case 'NEW_PAYMENTS':
        return {...state, payments:action.newVar}
      case 'NEW_MAXMONEY':
        return {...state, maxMoney:action.newVar}
      //friendmeter and energy
      case 'NEW_FRIENDMETERSPEED':
        return {...state, friendMeterSpeed:action.newVar}
      case 'NEW_FRIENDMETERDECAY':
        return {...state, friendMeterDecay:action.newVar}
      case 'NEW_ENERGYFRIENDDRAIN':
        return {...state, energyFriendDrain:action.newVar}
      case 'NEW_ENERGYRECOUP':
        return {...state, energyRecoup:action.newVar}
      case 'NEW_ENERGYCOSTMOVING':
        return {...state, energyCostMoving:action.newVar}
      case 'NEW_ACQUAINTANCEDISC':
        return {...state, acquaintanceDiscount:action.newVar}
      case 'NEW_FRIENDDISC':
        return {...state, friendDiscount:action.newVar}
      case 'NEW_BESTFRIENDDISC':
        return {...state, bestfriendDiscount:action.newVar}
      //events
      case 'NEW_PRICEONE':
        return {...state, priceOne:action.newVar}
      case 'NEW_PRICEONESD':
        return {...state, priceOneSd:action.newVar}
      case 'NEW_PROBONE':
        return {...state, probOne:action.newVar}
      case 'NEW_PRICETWO':
        return {...state, priceTwo:action.newVar}
      case 'NEW_PRICETWOSD':
        return {...state, priceTwoSd:action.newVar}
      case 'NEW_PROBTWO':
        return {...state, probTwo:action.newVar}
      case 'NEW_PROBZERO':
        return {...state, probZero:action.newVar}
      case 'NEW_AVERAGETIMEEVENT':
        return {...state, averageTimeEvent:action.newVar}
      case 'NEW_STANDARDDEVTIMEEVENT':
        return {...state, standardDevTimeEvent:action.newVar}
      ///////////////////////////////////////////////////////////////////
      case 'WRITE':
        set(child(db, '/games/' + action.id +"/"+ action.time),{
          money:Math.round(action.player.money*100)/100,
          friends:action.player.friends,
          position:state.squares[0]
        })
        return state
      default:
        return state
    }
  };
  const storeRedux = createStore(reducer,initialState)
  export default storeRedux