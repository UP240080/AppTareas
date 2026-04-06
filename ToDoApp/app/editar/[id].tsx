import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { getTask, updateTask } from '../../src/API/tasks';
import { StyleSheet } from 'react-native';

export default function EditarTarea() {
    const router = useRouter();
    const {id} = useLocalSearchParams(); // Obtener el ID de la tarea desde los parámetros de búsqueda local
  
  const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    const loadTask = async () => {
        try {
            const task = await getTask(Number(id)); // Cargar la tarea usando el ID
            setTitle(task.title);
            setDescription(task.description);
            setCompleted(task.completed);
        } catch (error) {
            console.log("Error al cargar tarea para editar:", error);
            alert("No se pudo cargar la tarea");
        }
    };

    useEffect(() => {
        if (id) {
            loadTask();
        }
    }, [id]);

    const handleSave = async () => {
        if (!title.trim() || !description.trim()) {
            alert("Completa título y descripción");
            return;
        }

        try {
            await updateTask(Number(id), {
                title,
                description,
                completed,
            });
            alert("Tarea actualizada");
            router.push(`/`);
        } catch (error) {
            console.log("Error al actualizar tarea:", error);
            alert("No se pudo actualizar la tarea");
        }};

        const handleToggleCompleted = () => { // Función para alternar el estado de completado
            setCompleted(!completed);
        }


    return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar tarea</Text>

      <Text style={styles.description}>Titulo</Text>
        <TextInput
            style={styles.inputStyle}
            value={title}
            onChangeText={setTitle}
            />

        <Text style={styles.description}>Descripción</Text>
        <TextInput
            style={styles.inputStyle}
            value={description}
            onChangeText={setDescription}
            />

        <Text style={styles.status}>Estado</Text>
        <Pressable onPress={handleToggleCompleted} style={styles.botonCompletar}>
            <Text style={styles.botonText}>{completed ? "Completada" : "Pendiente"}</Text>
        </Pressable>
            <View style={styles.containerBotones}>
                <Pressable onPress={handleSave} style={styles.botonGuardar}
                    >
                    <Text style={styles.botonText}>Guardar cambios</Text>
                </Pressable>

                <Pressable onPress={() => router.push(`/detalles/${id}`)} style={styles.botonCancelar}>
                    <Text style={styles.botonText}>Cancelar</Text>
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
        containerBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    title: {    
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
    },
    status: {
        fontSize: 14,
        marginBottom: 10,
    },
    botonGuardar: {
        backgroundColor: "#66cc00",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "30%",
    },
    botonCancelar: {
        backgroundColor: "#cc3300",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "30%",
    },
    botonVolver: {
        backgroundColor: "#0099cc",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "30%",
    },
    botonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    botonCompletar: {
        backgroundColor: "#8004d2",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "20%",
    },
});