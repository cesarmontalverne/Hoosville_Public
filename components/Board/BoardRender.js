import { View, TouchableOpacity, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
//import { LinearGradient } from "expo-linear-gradient";

// export default function BoardRender({ input, player }) {
export default function BoardRender({ input, create }) {
  // ara

  return (
    <View style={{ alignSelf: "center", justifyContent: "center" }}>
      <View style={{ zIndex: 999 }}>{create()}</View>
      <SquareRender sus={input} />
      <SquareRender sus={!input} />
      <SquareRender sus={input} />
      <SquareRender sus={!input} />
      <SquareRender sus={input} />
      {/* {players.createPlayers(squares, xaxis, yaxis)} */}
      {/* <TileOne />*/}
    </View>
  );
}

function SquareRender(props) {
  const sus = props.sus;
  if (sus == 0) {
    return <TileZero />;
  }
  return <TileOne />;
}

function SquareOne() {
  return (
    <View
      style={{
        width: 70,
        height: 70,
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        alignSelf: "center",
      }}
    >
      {/* <LinearGradient colors={["blue", "orange"]}></LinearGradient> */}
    </View>
  );
}
function SquareZero() {
  return (
    <View
      style={{
        width: 70,
        height: 70,
        backgroundColor: "black",
        alignSelf: "center",
      }}
    >
      {/* <LinearGradient colors={["blue", "orange"]}></LinearGradient> */}
    </View>
  );
}

function TileOne() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <SquareZero />
      <SquareOne />
      <SquareZero />
      <SquareOne />
      <SquareZero />
    </View>
  );
}

function TileZero() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <SquareOne />
      <SquareZero />
      <SquareOne />
      <SquareZero />
      <SquareOne />
    </View>
  );
}

function BoardOne() {
  return (
    <View>
      <TileOne />
      <TileZero />
    </View>
  );
}
// export default function BoardRender({ input, players, squares, xaxis, yaxis }) {
//   // ara

//   return (
//     <View style={{ alignSelf: "center", justifyContent: "center" }}>
//       <Tile inp={input} />
//       <Tile inp={!input} />
//       <Tile inp={input} />
//       <Tile inp={!input} />
//       <Tile inp={input} />
//       {/* {players.createPlayers(squares, xaxis, yaxis)} */}
//       {/* <TileOne />*/}
//     </View>
//   );
// }

// function Tile(inp) {
//   let s = [styles.type0, styles.type1]
//   return (
//     <View style={{ flexDirection: "row", justifyContent: "center" }}>
//       <View styles={s[inp?1:0]} />
//       <View styles={s[inp?0:1]} />
//       <View styles={s[inp?1:0]} />
//       <View styles={s[inp?0:1]} />
//       <View styles={s[inp?1:0]} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   type0: {
//     width: 70,
//     height: 70,
//     backgroundColor: "#ffffff",
//     alignSelf: "center",
//   },
//   type1: {
//     width: 70,
//     height: 70,
//     backgroundColor: "#000000",
//     alignSelf: "center",
//   },
// });
