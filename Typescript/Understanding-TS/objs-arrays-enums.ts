enum Role {
  "Admin",
  "Junior",
}

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: Role;
} = {
  name: "Harry",
  age: 24,
  hobbies: ["fishing", "running"],
  role: Role.Admin,
};
