import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

// function to get all the todos set by the user

export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").order("desc").collect();
    return todos;
  },
});

// function to add a todo

export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
    });
    return todoId;
  },
});

// function to toggle the completion status of the todo

export const toggleTodoStatus = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const { id } = args;
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new ConvexError("todo not found");
    }
    await ctx.db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
  },
});

// function to delete the todo

export const deleteTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// function to update a todo

export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});

// function to clear all the todos listed by the user

export const clearAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    // delete all todos
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }
    return { deletedCount: todos.length };
  },
});
