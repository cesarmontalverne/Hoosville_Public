import { Alert } from 'react-native';
import { createStore } from 'redux';
import db from './apis/firebase';
import { initialPosition } from './utilities/initialPosition';
import { get, child, set, update } from 'firebase/database';
const event_initialState = { loadFailure: ["title of event;description of event"] }
const initialState = {
  squares: initialPosition(10),
  miniMap: false,
  gameOn: false,
  board: 0,
  energy: 100,
  rid: "",
  numGames:"",
  totalTimePlayed:"",
  seenDebrief:"",
  events: event_initialState,
  save:{
    time:[],
    money:[],
    energy:[],
    friends:[],
    position:[]
  },
  //settings controllables
  //basic settings
  initialTime: 1800,
  time: 1800,
  numPlayers: 10, //if numplayers is greater than the number of occupations we have saved (so 24 atm) it could cause bugs
  lumpSum: 1000,
  payments: 0,
  maxMoney: 1000,
  //friendmeter and energy
  friendMeterSpeed: 2.5, //decay still happens(so take that into account!)
  friendMeterDecay: 0.2,
  energyFriendDrain: 0.2, //still recoup energy
  energyRecoup: 0.2,
  energyCostMoving: 2,
  acquaintanceDiscount: 10,
  friendDiscount: 20,
  bestfriendDiscount: 30,
  //events
  price: 10,
  priceSd: 1,
  probUnfriend: 40,
  averageTimeEvent: 5,
  standardDevTimeEvent: 1,
}
const reducer = (state, action) => {
  //change-> one for each var
  switch (action.type) {
    case 'NEW_MINIMAP':
      return { ...state, miniMap: action.newMiniMap }
    case 'NEW_SQUARES':
      return { ...state, squares: action.newSquares }
    case 'INC_ENERGY':
      return { ...state, energy: Math.max(Math.min(state.energy + action.energyInc, 100), 0) }
    case 'NEW_GAMEON':
      return { ...state, gameOn: action.newGameOn }
    case 'NEW_RID':
      return { ...state, rid: action.rid }
    case 'NEW_NUMGAMES':
      return {...state, numGames:action.numGames}
    case 'NEW_TOTALTIME':
      return {...state, totalTimePlayed:action.newTotalTimePlayed}
    case 'NEW_SEENDEBRIEF':
      return {...state, seenDebrief:action.newSeenDebrief}
    case 'NEW_EVENTS':
      return { ...state, events: action.data }
    //if(state.events!=event_initialState) return {...state, events:sheets()}
    case 'NEW_TIME':
      return { ...state, time: action.newTime }
    case 'NEW_BOARD':
      return { ...state, board: (state.board + 1) % 2 }
    case 'RESTART':
      return {
        squares: initialPosition(state.numPlayers),
        miniMap: false,
        gameOn: false,
        board: 0,
        energy: 100,
        rid: "",
        totalTimePlayed:"",
        seenDebrief:"",
        events: event_initialState,
        save:{
          time:[],
          money:[],
          energy:[],
          friends:[],
          position:[]
        },
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
        price: state.price,
        priceSd: state.priceSd,
        probUnfriend: state.probUnfriend,
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
      return { ...state, payments: action.newVar }
    case 'NEW_MAXMONEY':
      return { ...state, maxMoney: action.newVar }
    //friendmeter and energy
    case 'NEW_FRIENDMETERSPEED':
      return { ...state, friendMeterSpeed: action.newVar }
    case 'NEW_FRIENDMETERDECAY':
      return { ...state, friendMeterDecay: action.newVar }
    case 'NEW_ENERGYFRIENDDRAIN':
      return { ...state, energyFriendDrain: action.newVar }
    case 'NEW_ENERGYRECOUP':
      return { ...state, energyRecoup: action.newVar }
    case 'NEW_ENERGYCOSTMOVING':
      return { ...state, energyCostMoving: action.newVar }
    case 'NEW_ACQUAINTANCEDISC':
      return { ...state, acquaintanceDiscount: action.newVar }
    case 'NEW_FRIENDDISC':
      return { ...state, friendDiscount: action.newVar }
    case 'NEW_BESTFRIENDDISC':
      return { ...state, bestfriendDiscount: action.newVar }
    //events
    case 'NEW_PRICE':
      return { ...state, price: action.newVar }
    case 'NEW_PRICESD':
      return { ...state, priceSd: action.newVar }
    case 'NEW_PROBUNFRIEND':
      return { ...state, prob: action.newVar }
    case 'NEW_AVERAGETIMEEVENT':
      return { ...state, averageTimeEvent: action.newVar }
    case 'NEW_STANDARDDEVTIMEEVENT':
      return { ...state, standardDevTimeEvent: action.newVar }
    case "NEW_EVERY_CONTROLLABLE": //also includes squares, even though not controllable, because it depends on a controllable
      //console.log(action.numPlayers)
      return {
        ...state,
        squares:initialPosition(action.numPlayers),
        //basic settings
        initialTime: action.initialTime,
        time: action.initialTime,
        numPlayers: action.numPlayers,
        lumpSum: action.lumpSum,
        payments: action.payments,
        maxMoney: action.maxMoney,
        //friendmeter and energy
        friendMeterSpeed: action.friendMeterSpeed, //decay still happens(so take that into account!)
        friendMeterDecay: action.friendMeterDecay,
        energyFriendDrain: action.energyFriendDrain, //still recoup energy
        energyRecoup: action.energyRecoup,
        energyCostMoving: action.energyCostMoving,
        acquaintanceDiscount: action.acquaintanceDiscount,
        friendDiscount: action.friendDiscount,
        bestfriendDiscount: action.bestfriendDiscount,
        //events
        price: action.price,
        priceSd: action.priceSd,
        probUnfriend: action.probUnfriend,
        averageTimeEvent: action.averageTimeEvent,
        standardDevTimeEvent: action.standardDevTimeEvent
      }
    ///////////////////////////////////////////////////////////////////
    case 'NEW_SAVE':
      state.save.time.push(action.time)
      state.save.money.push(action.player.money/state.maxMoney*100)
      state.save.energy.push(state.energy)
      state.save.friends.push(JSON.stringify(action.player.friends).slice(3, -1))
      state.save.position.push(JSON.stringify(action.squares))
      return state
    case 'WRITE':
      set(child(db, state.rid+";"+state.numGames), {
        rid:state.rid,
        numGames:state.numGames,
        seenDebrief: state.seenDebrief,
        totalTimePlayed: state.totalTimePlayed,
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
        price: state.price,
        priceSd: state.priceSd,
        probUnfriend: state.probUnfriend,
        averageTimeEvent: state.averageTimeEvent,
        standardDevTimeEvent: state.standardDevTimeEvent,
        //metadata
        metadata:state.save
      })
      return state

    default:
      return state
  }
};
const storeRedux = createStore(reducer, initialState)
export default storeRedux