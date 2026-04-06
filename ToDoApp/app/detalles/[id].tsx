import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { getTask } from '../../src/API/tasks';
import { StyleSheet } from 'react-native';

export default function Detalle() {
    const router = useRouter();
    const {id} = useLocalSearchParams(); // Obtener el ID de la tarea desde los parámetros de búsqueda local
    
    const [task, setTask] = useState<any>(null); //el any y null ayudan para que no de error al cargar la tarea, ya que inicialmente es null y luego se actualiza con los datos de la tarea
    
    const loadTask = async () => {
        try {
            const data = await getTask(Number(id)); // Cargar la tarea usando el ID
            setTask(data);
        } catch (error) {
            console.log("Error al cargar detalle:", error);
            alert("No se pudo cargar la tarea");
        }
    };

    useEffect(() => { 
        if (id) { // Verificar que el ID esté disponible antes de cargar la tarea
            loadTask();
        }
    }, [id]);
    if (!task) { // Mostrar un mensaje de carga mientras se obtiene la tarea
        return (
            <View>
                <Text>Cargando...</Text>
            </View>
        );
    }


    return (
    <View style={styles.container}>
        <Text style={styles.title}>Detalle de la tarea</Text>

        <Text style={styles.description}>Titulo</Text>
        <Text style={styles.informacion}>{task.title}</Text>

        <Text style={styles.description}>ID</Text>
        <Text style={styles.informacion}>{task.id}</Text>

        <Text style={styles.description}>Descripción</Text>
        <Text style={styles.informacion}>{task.description}</Text>

        <Text style={styles.status}>Estado</Text>
        <Text style={styles.informacion}>{task.completed ? "Completada" : "Pendiente"}</Text>

            <View style={styles.containerBotones}>
                <Pressable onPress={() => router.push(`/editar/${task.id}`)} style={styles.botonEditar}>
                    <Text style={styles.botonText}>Editar tarea</Text>
                </Pressable>

                <Pressable onPress={() => router.push(`/`)} style={styles.botonVolver}>
                    <Text style={styles.botonText}>Volver al inicio</Text>
                </Pressable>
            </View>

    </View>
  )
}

const styles = StyleSheet.create({ 
    container: {
        backgroundColor: "#fff",
        padding: 20,
        marginBottom: 10,
        height: "100%",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    description: {
        fontSize: 14,
        color: "#666",
        fontWeight: "bold",
        },
        status: {
            fontSize: 14,
            color: "#666",
            fontWeight: "bold",
        },
        botonEditar: {
            backgroundColor: "#dc0586",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            width: "45%",
        },
            botonVolver: {
        backgroundColor: "#8004d2",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "45%",
    },
        botonText: {
            color: "#fff",
            textAlign: "center",
            
        },
        informacion: {
            fontSize: 14,
            marginBottom: 10,
            borderColor: "#ccc",
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
        },
        containerBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
