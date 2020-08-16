import React, { useState, useEffect, Fragment } from 'react'

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import api from './services/api'

export default function App (){
  const [
    repositories,
    setRepositories,
  ] = useState([])

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data)
    })
  }, [])

  async function handleLikeRepository (id){
    // Implement "Like Repository" functionality

    const response = await api.post(
      `repositories/${id}/like`,
    )

    const repository = response.data

    const portfolioIndex = repositories.findIndex(
      (portfolio) => portfolio.id === repository.id,
    )

    let repositoriesPut = repositories

    let repositoryPut = repositoriesPut[portfolioIndex]

    repositoryPut.likes++
    // console.log('repo:', repositoriesPut)

    setRepositories(repositoriesPut.concat())
  }

  return (
    <Fragment>
      <StatusBar
        barStyle='light-content'
        backgroundColor='#7159c1'
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(repository) => repository.id}
          renderItem={({ item: repository }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>
                {repository.title}
              </Text>

              <View style={styles.techsContainer}>
                <FlatList
                  data={repository.techs}
                  keyExtractor={(item, index) =>
                    index.toString()}
                  renderItem={({ item: tech, index }) => (
                    <Text style={styles.tech}>{tech}</Text>
                  )}
                />
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}>
                  {repository.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}>
                <Text style={styles.buttonText}>
                  Curtir
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container           : {
    flex            : 1,
    backgroundColor : '#7159c1',
  },
  repositoryContainer : {
    marginBottom     : 15,
    marginHorizontal : 15,
    backgroundColor  : '#fff',
    padding          : 20,
  },
  repository          : {
    fontSize   : 32,
    fontWeight : 'bold',
  },
  techsContainer      : {
    flexDirection : 'row',
    marginTop     : 10,
  },
  tech                : {
    fontSize          : 12,
    fontWeight        : 'bold',
    marginRight       : 10,
    backgroundColor   : '#04d361',
    paddingHorizontal : 10,
    paddingVertical   : 5,
    color             : '#fff',
  },
  likesContainer      : {
    marginTop      : 15,
    flexDirection  : 'row',
    justifyContent : 'space-between',
  },
  likeText            : {
    fontSize    : 14,
    fontWeight  : 'bold',
    marginRight : 10,
  },
  button              : {
    marginTop : 10,
  },
  buttonText          : {
    fontSize        : 14,
    fontWeight      : 'bold',
    marginRight     : 10,
    color           : '#fff',
    backgroundColor : '#7159c1',
    padding         : 15,
  },
})
