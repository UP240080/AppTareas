import { View, Text, Button, Pressable } from 'react-native'
import { Task } from "../tipos/Task"
import { useRouter } from 'expo-router';
import { deleteTask, updateTask } from '../API/tasks';
import { StyleSheet } from 'react-native';

interface Props {
    task : Task,
    reload: () => void;
}

export default function TaskItem({task, reload}: Props) {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.status}>{task.completed ? "Completada" : "Pendiente"}</Text>

        <View style={styles.containerBotones}>
                <Pressable
        style={styles.botonVer}
        onPress={() => router.push(`/detalles/${task.id}`)}
    >
        <Text style={styles.botonText}>Ver</Text>
    </Pressable>

    <Pressable        style={styles.botonEditar}
    
        onPress={() => router.push(`/editar/${task.id}`)}
    >
        <Text style={styles.botonText}>Editar</Text>
    </Pressable>

    <Pressable        style={styles.botonEliminar}
    
        onPress={async () => {
            await deleteTask(task.id);
            reload();

        }}
        >
        <Text style={styles.botonText}>Eliminar</Text>
        </Pressable>

    <Pressable        style={styles.botonCompletar}
    
        onPress={async () => {
            await updateTask(task.id, {
                ...task,
                completed: !task.completed,
            });
            reload();
        }}
    >
        <Text style={styles.botonText}>Completar</Text>
    </Pressable>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        
    },
    containerBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    status: {
        fontSize: 14,
        color: '#666',
    },
    botonVer: {
        backgroundColor: '#0099cc',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 6,
        width: '22%',

    },
    botonEditar: {
        backgroundColor: '#339900',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 6,
        width: '22%',
    },
    botonEliminar: {
        backgroundColor: '#cc0000',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 6,
        width: '22%',
    },
    botonCompletar: {
        backgroundColor: '#ff9900',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 6,
        width: '22%',
    },
    botonText: {
        color: '#fff',
        textAlign: 'center',
    },

});
