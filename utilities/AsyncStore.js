import { Text, View, Button, Modal } from "react-native";
import React, { Component, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRandomInt } from "./getRandomInt";

class AsyncStore {
    createAccount(rid){
        let rand_control = getRandomInt(0,4) //selects random number from 0 - 3 inclusive
        this.load("rid").then(res =>{
            if(res==null){
                this.save("rid", rid)
                this.save("num_games", "0")
                this.save("rand_control", String(rand_control)) 
                this.save("time_played", "0") 
                this.save("seen_debrief", "0")
            }
            else{
                console.warn("Trying to overwrite account")
            }
        })
        
    }
    incrementGames(){
        this.load("num_games").then(res=>{
            if(res!=null){
                let cur_num_games = parseInt(res)
                this.save("num_games", String(cur_num_games + 1))
            }
            else{
                console.warn("create and account first")
            }
        })
    }
    
    async save(key,value){
        try {
            await AsyncStorage.setItem(key, value)
        } catch (err) {
            console.warn(e)
        }
    }

    async clearAll(){
        try {
            await AsyncStorage.multiRemove(["rid","num_games","rand_control", "time_played","seen_debrief"]);
        } catch (e) {
            console.warn(e)
        }
    }

    async load(key){ 
        try {
            return await AsyncStorage.getItem(key);
        } catch (e) {
            console.warn(e)
        }
    }
}

export default new AsyncStore()