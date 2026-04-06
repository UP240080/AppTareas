import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getTasks, createTask } from "../ToDoApp/src/API/tasks";
import TaskItem from "../ToDoApp/src/components/taskItem";

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
    <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
        Mis tareas
      </Text>

      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: "#999",
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={{
          borderWidth: 1,
          borderColor: "#999",
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <Button title="AGREGAR TAREA" onPress={handleAddTask} />

      <Text style={{ marginTop: 20 }}>
        Cantidad de tareas: {tasks.length}
      </Text>

      <ScrollView style={{ marginTop: 10 }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} reload={loadTasks} />
        ))} 
      </ScrollView>
    </View>
  );
}