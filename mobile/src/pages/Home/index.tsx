import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Image, ImageBackground, StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import api from '../../services/api';

const Home = () => {
  
  interface IBGEUf {
    label: string,
    value: string,
  }

  interface IBGECity {
    label: string,
    value: string,
  }

  interface ResponseUF {
    sigla: string;
  }

  interface ResponseCity {
    nome: string,
  }

  const [selectedUF, setSelectedUF] = useState<string>()
  const [selectedCity, setSelectedCity] = useState<string>()
  const [ufs, setUfs] = useState<IBGEUf[]>();
  const [cities, setCities] = useState<IBGECity[]>();

  const navigation = useNavigation();

  
  useEffect(() => {
    api.get<ResponseUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const initialsUF = response.data.map(uf => ({
        label: uf.sigla,
        value: uf.sigla
      }))

      setUfs(initialsUF)
    })
  },[])

  useEffect(() => {
    api.get<ResponseCity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(response => {
      const cities = response.data.map(city => ({
        label: city.nome,
        value: city.nome
      }))

      setCities(cities)
    })
  },[selectedUF])
  

  return (
    <ImageBackground
      source={require('../../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368}}
    >
      <View style={styles.main}>
        <Image source={require('../../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
      </View>

      <View style={styles.footer}>
        
      {ufs !== undefined && (
         <RNPickerSelect       
         placeholder={{ label:"Selecione seu estado" }}
         style={pickerSelectedStyles}
         onValueChange={(value) => setSelectedUF(value)}
         value={selectedUF}
         items={ufs}           
      />
      )}

      {cities !== undefined && (
              <RNPickerSelect       
              placeholder={{ label:"Selecione sua cidade" }}
              style={pickerSelectedStyles}
              onValueChange={(value) => setSelectedCity(value)}
              value={selectedCity}
              items={cities}           
            />
            )}


        <RectButton style={styles.button} onPress={() => navigation.navigate('Points', {
          city: selectedCity,
          uf: selectedUF
        })}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#fff" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},
  

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

const pickerSelectedStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingRight: 30, 
    marginBottom: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingRight: 30, 
    marginBottom: 30,
  },
})
export default Home;