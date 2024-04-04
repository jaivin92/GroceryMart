import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { myColors } from '../Utils/MyColors'
import { Ionicons } from "@expo/vector-icons";

const CmpInputText = ({
  label,
  onError,
  handleTextChange,
  name,
  password,
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View>
      <Text style={Styles.label}>{label}</Text>
      <View
        style={{ flexDirection: 'row', }}
      >
        <TextInput
          name='email'
          style={[Styles.input, { borderColor: onError ? 'red' : isFocused ? myColors.darkblue : myColors.lightblue }]}
          onChangeText={(e) => handleTextChange(e, name)}
          onBlur={() => setIsFocused(false)}
          onFocus={() => {
            setIsFocused(true);
          }}
          secureTextEntry={hidePassword}
          {...props}
        />
        {password &&
          <Ionicons onPress={() => setHidePassword(!hidePassword)} name={hidePassword === true ? 'eye-off-outline' : 'eye-outline'} size={24} color='black'
            style={{
              position: 'absolute',
              right: 0,
              padding: 10,
              justifyContent: 'center',
              alignSelf: 'center'
            }}
          />
        }
      </View>
      <Text style={{ color: 'red' }} >{onError}</Text>

    </View>
  )
}


const Styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    fontSize: 16,
    marginTop: 5,
    borderRadius: 10,
    padding: 10
  }
})

export default CmpInputText