import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const SettingsScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://free-currency-converter.herokuapp.com/list")
      .then((response) => response.json())
      .then((results) => {
        let correct = results.currency_values.map((val) => {
          let main = {
            label: val.name,
            value: val.name,
          };
          return main;
        });
        return correct;
      })
      .then((final) => setItems(final));
  }, []);
  return (
    <View>
      <Text style={{
        margin: 10,
        fontSize: 15,
        color: "#ed1186"
      }}>Select a currency you wish to apply</Text>
      {items.length > 0 && (
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      )}
    </View>
  );
};

export default SettingsScreen;
