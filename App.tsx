import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, StyleSheet } from 'react-native';

const Index: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [users, setUsers] = useState<{ id: number; nome: string }[]>([]);


  const handleRegister = async () => {
    try {
      const response = await fetch('http:/172.20.10.2:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Nome registrado com sucesso!');
        setNome(''); 
      } else {
        Alert.alert('Erro', 'Erro ao registrar o nome.');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Erro ao conectar com a API.');
    }
  };


  const handleVerify = async () => {
    try {
      const response = await fetch('http://172.20.10.2:3000/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data); 
      } else {
        Alert.alert('Erro', 'Erro ao buscar nomes.');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Erro ao conectar com a API.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Nomes</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={nome}
        onChangeText={setNome}
      />
      
      <Button title="Registrar" onPress={handleRegister} />
      <View style={{ marginTop: 10 }}>
        <Button title="Buscar Nomes" onPress={handleVerify} />
      </View>
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.userItem}>{item.nome}</Text>}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  list: {
    marginTop: 20,
  },
  userItem: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Index;
