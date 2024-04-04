import { View, Text, StyleSheet, FlatList, } from 'react-native'
import { useSharedValue } from 'react-native-reanimated';
import React, { useState } from 'react'
import CmpHscreen from '../../Components/CmpHscreen';

const data = new Array(50).fill(0).map((_, index) => ({ id: index }))

const MainScreen = () => {
    const viewableItems = useSharedValue([]);

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                contentContainerStyle={{ paddingTop: 20 }}
                onViewableItemsChanged={({ viewableItems: singleitem }) => {
                    viewableItems.value = singleitem
                }}
                renderItem={({ item }) => {
                    return <CmpHscreen item={item} viewableItems={viewableItems} />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
export default MainScreen