import {FC} from "react";
import {Text, View} from "../Themed";
import {Pressable, StyleSheet} from "react-native";
import {ButtonPropsType} from "./types";
const CustomButton: FC<ButtonPropsType> = (props)=>{
    return (
            <Pressable style={styles.button} onPress={props.onPress}>
                <View>
                    <Text style={styles.buttonText}>
                        {props.text}
                    </Text>
                </View>
            </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 40,
        padding: 5,
        borderRadius: 10,
        textTransform: "uppercase",
        backgroundColor: 'orangered',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
    },
    buttonText: {
        backgroundColor: 'orangered',
        color: 'white',
        fontWeight: "bold",
    },
})