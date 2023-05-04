import {Pressable, StyleSheet, TextInput, FlatList, ListRenderItemInfo} from 'react-native';
import Toast from 'react-native-toast-message';
import {Text, View} from '../../components/Themed';
import {useState, useEffect} from "react";
import uuid from 'react-native-uuid';
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Goal = {
    id: string,
    text: string
    isChecked: boolean
}

export default function TabOneScreen() {
    const [value, setValue] = useState<string>('')
    const [goals, setGoals] = useState<Goal[]>([])
    const [filteredGoals, setFilteredGoals] = useState<Goal[]>([])


    const showToast = () => {
        Toast.show({
            type: 'error',
            text1: 'The field is empty',
            text2: 'Please write some text',
            position: 'top',
            topOffset: 0,
        });
    }
    const addGoal = (): void => {
        if (!value.length) {
            showToast()
            return
        }
        setGoals((currentGoals) => [...currentGoals, {
            id: uuid.v4().toString(),
            text: value,
            isChecked: false
        }])


        setValue('')
    }

    const deleteGoal = (id: string) => {
        setGoals((currentGoals) => [...currentGoals.filter(item => item.id !== id)
        ])
    }

    const completeGoal = (id: string) => {
        setGoals((currentGoals) => currentGoals.map(goal => {
            if (goal.id === id) {
                goal.isChecked = !goal.isChecked
            }
            return goal
        }))
    }

    const allGoals =()=>{
        setFilteredGoals([...goals])
    }

    const completedGoals =()=>{
        setFilteredGoals(goals.filter((goal=> goal.isChecked)))
    }

    useEffect(()=>{
        setFilteredGoals([...goals])
    },[goals])

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Goals</Text>
                <View style={styles.inputContainer}>
                    <TextInput value={value} onChangeText={(prev => setValue(prev))} style={styles.input}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={addGoal}>
                        <View>
                            <Text style={styles.buttonText}>
                                Add new goal
                            </Text>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={allGoals}>
                        <View>
                            <Text style={styles.buttonText}>
                               All
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.button} onPress={completedGoals}>
                        <View>
                            <Text style={styles.buttonText}>
                               Completed
                            </Text>
                        </View>
                    </Pressable>
                </View>

                <View style={styles.toDoListContainer}>
                    {filteredGoals.length ? <FlatList data={filteredGoals} renderItem={(goal: ListRenderItemInfo<Goal>) => {
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
                                    onPress={() => completeGoal(goal.item.id)}
                                />
                                <Pressable onPress={() => deleteGoal(goal.item.id)}>
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
                <Toast/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'orangered',
        textTransform: "uppercase",
    },
    inputContainer: {
        marginTop: 10,
        borderRadius: 10,
    },
    input: {
        borderColor:'black',
        borderWidth: 1,
        backgroundColor: 'white',
        width: 400,
        height: 40,
        padding: 5,
        borderRadius: 10,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        marginTop: 20,
        borderRadius: 10,
    },
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
    toDoListContainer: {
        width: 400,
        height: '70%',
        borderRadius: 10,
        margin: 20,
        padding: 10,
        backgroundColor: 'grey'
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
});
