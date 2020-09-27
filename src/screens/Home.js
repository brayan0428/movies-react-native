import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { Title } from 'react-native-paper'
import { getNewMoviesApi } from '../api/movies'
import CarouselVertical from '../components/CarouselVertical'
import GenresList from '../components/GenresList'

export default function Home({navigation}) {
    const [newMovies, setNewMovies] = useState([])

    useEffect(() => {
        getNewMoviesApi().then(movies => setNewMovies(movies.results))
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                newMovies.length > 0 && (
                    <View style={styles.news}>
                        <Title style={styles.newsTitle}>Nuevas Películas</Title>
                        <CarouselVertical movies={newMovies} navigation={navigation}/>
                    </View>
                )
            }
            <GenresList navigation={navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    news: {
        marginVertical: 12
    },
    newsTitle: {
        marginBottom: 10,
        marginHorizontal: 16,
        fontWeight: "bold",
        fontSize: 22
    }
})
