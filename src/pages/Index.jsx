import { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, useColorModeValue, Heading, Text } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const bg = useColorModeValue('gray.100', 'gray.700');

  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <Box p={5} maxW="480px" m="auto" mt="20vh" bg={bg} boxShadow="md">
      <Heading mb={4}>Todo App</Heading>
      <Box display="flex" mb={4}>
        <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
        <IconButton icon={<FaPlus />} onClick={addTask} colorScheme="blue" ml={2} />
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} bg="white" boxShadow="sm">
            <Text as={task.completed ? 's' : ''}>{task.text}</Text>
            <Box>
              <IconButton icon={<FaCheck />} onClick={() => toggleComplete(task.id)} colorScheme="green" mr={2} />
              <IconButton icon={<FaEdit />} onClick={() => editTask(task.id, prompt('Edit task:', task.text))} colorScheme="yellow" mr={2} />
              <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} colorScheme="red" />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;