export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "user@example.com",
    password: "password123",
    role: "user",
  },
  {
    id: "3",
    name: "Bob Smith",
    email: "bob@example.com",
    password: "password123",
    role: "user",
  },
  {
    id: "4",
    name: "Alice Smith",
    email: "alice@example.com",
    password: "password123",
    role: "user",
  },
  {
    id: "5",
    name: "Mike Ross",
    email: "mike@example.com",
    password: "password123",
    role: "user",
  },
];

// Helper para simular delay de rede (1 segundo)
const delay = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

// READ (Listar todos)
export const getUsers = async (): Promise<User[]> => {
  await delay();
  return [...users];
};

// READ (Buscar por ID)
export const getUserById = async (id: string): Promise<User | null> => {
  await delay();
  const user = users.find((u) => u.id === id);
  return user ? { ...user } : null;
};

// CREATE (Criar)
export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  await delay();
  const newId = (
    Math.max(...users.map((u) => parseInt(u.id) || 0), 0) + 1
  ).toString();
  const newUser: User = {
    id: newId,
    ...userData,
  };
  users.push(newUser);
  return { ...newUser };
};

// UPDATE (Atualizar)
export const updateUser = async (
  id: string,
  updates: Partial<Omit<User, "id">>
): Promise<User | null> => {
  await delay();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  return { ...users[index] };
};

// DELETE (Excluir)
export const deleteUser = async (id: string): Promise<boolean> => {
  await delay();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};

