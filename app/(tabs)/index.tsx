import {useState, useEffect} from "react";
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import {StyleSheet, TextInput} from 'react-native';
import {Text, View} from '../../components/Themed';
import {Goal} from "../../components/ToDoList/types";
import List from "../../components/ToDoList/List";
import CustomButton from "../../components/ToDoList/CustomButton";

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

    const allGoals = () => {
        setFilteredGoals([...goals])
    }

    const completedGoals = () => {
        setFilteredGoals(goals.filter((goal => goal.isChecked)))
    }

    useEffect(() => {
        setFilteredGoals([...goals])
    }, [goals])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Goals</Text>
            <View style={styles.inputContainer}>
                <TextInput value={value} onChangeText={(prev => setValue(prev))} style={styles.input}/>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton text='Add new goal' onPress={addGoal}/>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton text='All' onPress={allGoals}/>
                <CustomButton text='Completed' onPress={completedGoals}/>
            </View>
            <List filteredGoals={filteredGoals} deleteGoal={deleteGoal} completeGoal={completeGoal}/>
            <Toast/>
        </View>
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
        borderColor: 'black',
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
});
