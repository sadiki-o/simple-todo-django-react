import { useEffect, useState, useContext } from "react";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrashIcon,
  PencilIcon,
  CheckIcon,
  Undo2Icon,
  XIcon,
  PlusIcon,
  UserIcon,
  LogOutIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AuthContext from "@/context/authContext";
import { useNavigate } from "react-router";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const fetchTodos = async () => {
    const res = await api.get("/todos/");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async () => {
    if (!newTodo.trim()) return;
    await api.post("/todos/", { title: newTodo });
    setNewTodo("");
    fetchTodos();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/todos/${id}/`);
    fetchTodos();
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditedTitle(todo.title);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setEditedTitle("");
  };

  const handleUpdate = async () => {
    if (!editingTodo || !editedTitle.trim()) return;
    await api.patch(`/todos/${editingTodo.id}/`, { title: editedTitle });
    setEditingTodo(null);
    setEditedTitle("");
    fetchTodos();
  };

  const toggleComplete = async (todo: Todo) => {
    await api.patch(`/todos/${todo.id}/`, {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const incompleteTodos = todos?.filter((todo) => !todo.completed);
  const completedTodos = todos?.filter((todo) => todo.completed);

  const renderTodoItem = (todo: Todo) => (
    <li
      key={todo.id}
      className={cn(
        "flex items-center gap-2 px-4 py-2 border rounded-md transition-all",
        todo.completed ? "bg-muted" : "bg-background"
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleComplete(todo)}
            className="cursor-pointer"
          >
            {todo.completed ? (
              <Undo2Icon className="w-4 h-4 text-yellow-500" />
            ) : (
              <CheckIcon className="w-4 h-4 text-green-600" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
        </TooltipContent>
      </Tooltip>

      {editingTodo?.id === todo.id ? (
        <>
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-grow"
          />
          <Button
            variant="ghost"
            onClick={handleUpdate}
            className="cursor-pointer"
          >
            <CheckIcon className="w-4 h-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            onClick={handleCancelEdit}
            className="cursor-pointer"
          >
            <XIcon className="w-4 h-4 text-muted-foreground" />
          </Button>
        </>
      ) : (
        <>
          <span
            className={cn("flex-grow", {
              "line-through text-muted-foreground": todo.completed,
            })}
          >
            {todo.title}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(todo)}
                className="cursor-pointer"
              >
                <PencilIcon className="w-4 h-4 text-blue-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
        </>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(todo.id)}
            className="cursor-pointer"
          >
            <TrashIcon className="w-4 h-4 text-red-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </li>
  );

  return (
    <div className="mx-auto p-4 max-w-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">Todo Dashboard</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none cursor-pointer">
            <Avatar>
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.username || "User"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="text-red-500 cursor-pointer"
            >
              <LogOutIcon className="mr-2 w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">My Todos</CardTitle>
          <CardDescription>Track your daily tasks efficiently.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <Button onClick={handleCreate} className="cursor-pointer">
              <PlusIcon className="mr-2 w-4 h-4" /> Add
            </Button>
          </div>

          {/* Incomplete Todos */}
          <section>
            <h3 className="mb-2 font-medium text-lg">Incomplete</h3>
            <ul className="space-y-2">
              {incompleteTodos.length ? (
                incompleteTodos.map(renderTodoItem)
              ) : (
                <p className="text-muted-foreground text-sm">
                  You're all caught up!
                </p>
              )}
            </ul>
          </section>

          {/* Completed Todos */}
          <section>
            <h3 className="mb-2 font-medium text-lg">Completed</h3>
            <ul className="space-y-2">
              {completedTodos.length ? (
                completedTodos.map(renderTodoItem)
              ) : (
                <p className="text-muted-foreground text-sm">
                  No completed tasks yet.
                </p>
              )}
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
