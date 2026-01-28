'use client';

import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

const TodoList = () => {
    const [tasks, setTasks] = useState<Todo[]>([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (!newTask.trim()) return;
        const task: Todo = {
            id: crypto.randomUUID(),
            text: newTask,
            completed: false,
        };
        setTasks([...tasks, task]);
        setNewTask('');
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-white">My Tasks</h2>
            <div className="flex flex-col gap-4 p-5 rounded-[14px] glassmorphism-dark min-h-[300px]">
                <div className="flex gap-2">
                    <Input
                        placeholder="Add a new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="border-none bg-dark-3 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button onClick={addTask} className="bg-blue-1 hover:bg-blue-700">
                        <Plus size={20} />
                    </Button>
                </div>

                <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                    {tasks.length === 0 ? (
                        <p className="text-center text-gray-400 mt-10">No tasks yet. Add one above!</p>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-lg bg-dark-2/50 hover:bg-dark-2 transition-colors group",
                                    { 'opacity-60': task.completed }
                                )}
                            >
                                <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => toggleTask(task.id)}>
                                    {task.completed ? (
                                        <CheckCircle2 className="text-green-500" size={20} />
                                    ) : (
                                        <Circle className="text-gray-400 group-hover:text-blue-1" size={20} />
                                    )}
                                    <span className={cn("text-white truncate", { 'line-through text-gray-400': task.completed })}>
                                        {task.text}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoList;
