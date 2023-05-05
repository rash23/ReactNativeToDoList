import {FC} from "react";
import {Text, View} from "../Themed";
import {FlatList, ListRenderItemInfo, Pressable, StyleSheet} from "react-native";
import {Goal} from "./types";
import {ListPropsType} from "./types";
import BouncyCheckbox from "react-native-bouncy-checkbox";
const List: FC<ListPropsType> = (props) => {
    return (
        <View style={styles.toDoListContainer}>
            {props.filteredGoals.length ?
                <FlatList data={props.filteredGoals} renderItem={(goal: ListRenderItemInfo<Goal>) => {
                    return (
                        <View style={styles.toDoListItem}>
                            <BouncyCheckbox
                                isChecked={goal.item.isChecked}
                                size={25}
                                fillColor="grey"
                                unfillColor="white"
                                text={goal.item.text}
                                iconStyle={{borderColor: "orangered"}}
                                innerIconStyle={{borderWidth: 1}}
                                textStyle={styles.toDoListItemText}
                                onPress={() => props.completeGoal(goal.item.id)}
                            />
                            <Pressable onPress={() => props.deleteGoal(goal.item.id)}>
                                <View>
                                    <Text style={styles.toDoListItemText}>
                                        &#10006;
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    )
                }} keyExtractor={(item: Goal) => item.id} alwaysBounceVertical={false}
                /> : <Text style={styles.noGoalsText}>
                    Please add first goal...
                </Text>}
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    toDoListContainer: {
        width: 400,
        height: '70%',
        borderRadius: 10,
        margin: 20,
        padding: 10,
        backgroundColor: 'grey',
    },
    toDoListItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        marginBottom: 10,
        padding: 6
    },
    toDoListItemText: {
        padding: 10,
        fontSize: 20,
        maxWidth: 300,
        color: 'grey'
    },
    noGoalsText: {
        color: 'black'
    }
})