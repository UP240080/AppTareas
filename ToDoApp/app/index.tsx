import { View, Text, TextInput, Button, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { getTasks, createTask } from "../src/API/tasks";
import TaskItem from "../src/components/taskItem";
import { StyleSheet } from "react-native";


export default function HomeScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      console.log("Tareas cargadas:", data);
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error al cargar tareas:", error);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Completa título y descripción");
      return;
    }

    try {
      const response = await createTask({
        title,
        description,
        completed: false,
      });

      console.log("Respuesta createTask:", response);

      setTitle("");
      setDescription("");
      await loadTasks();
    } catch (error) {
      console.log("Error al crear tarea:", error);
      alert("No se pudo crear la tarea");
    }
  };


  return (
    <View style={styles.conteiner}>

      <Text style={styles.titulo}>
        Mis tareas
      </Text>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.inputStyle}
      />

      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.inputStyle}
      />

      <Pressable onPress={handleAddTask}
        style={styles.botonAgregar}>
        <Text style={styles.botonText}>AGREGAR TAREA</Text>
      </Pressable>

      <Text style={styles.texto}>
        Cantidad de tareas: {tasks.length}
      </Text>

      <ScrollView style={styles.lista}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} reload={loadTasks} />
        ))} 
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  conteiner :{
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  inputStyle: {
          borderWidth: 1,
          borderColor: "#999",
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
  },
  titulo:{
          fontSize: 28, 
          fontWeight: "bold", 
          marginBottom: 10,
  },
  texto:{
          fontSize: 16,
          color: "#333",
          padding: 10,
  },
  lista:{
    marginTop:10,
  },
  botonAgregar: {
        backgroundColor: '#dc0586',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 6,
      },
      botonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },

});