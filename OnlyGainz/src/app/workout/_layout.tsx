import { Stack } from "expo-router";

export function WorkoutPageLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen 
                name="create-workout-page"
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="workout-page"
                options={{headerShown: false}}
            />
        </Stack>
    )
}