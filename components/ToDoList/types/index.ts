export type Goal = {
    id: string,
    text: string
    isChecked: boolean
}

export type ButtonPropsType = {
    onPress: () => void,
    text: string
}

export type ListPropsType = {
    filteredGoals: Goal[]
    completeGoal: (string) => void,
    deleteGoal: (string) => void,
}