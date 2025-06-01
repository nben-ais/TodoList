"use client";

import ModalForm from "./components/ModalForm";
import Checkbox from "./components/Checkbox";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Root() {
  const defaultCategories = [
    { name: "Completed", color: "#4B4453" },
    { name: "Urgent", color: "#8E7069" },
    { name: "Important", color: "#756884" },
    { name: "Later", color: "#B5A5C8" },
    { name: "To study", color: "#C4A49D" },
  ];

  const categoryColors = ["#4B4453", "#8E7069", "#756884", "#B5A5C8", "#C4A49D"];

  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    }
    return [];
  });

  const [categories, setCategories] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("categories");
      return stored ? JSON.parse(stored) : defaultCategories;
    }
    return defaultCategories;
  });

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      return stored ? stored === "true" : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const mainColor = darkMode ? "bg-[#2B2335]" : "bg-[#B3B3B3]";
  const secondColor = darkMode ? "bg-[#3B3048]" : "bg-[#D9D9D9]";

  return (
    <main className={`min-h-screen ${mainColor} flex justify-center items-center flex-col`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full transition duration-300 hover:scale-110"
        title="Toggle Theme"
      >
        {darkMode ? (
          <FaSun className="text-[#797979] w-10 h-10" />
        ) : (
          <FaMoon className="text-[#797979] w-10 h-10" />
        )}
      </button>

      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-center py-6">
          <h1 className="text-2xl font-itim font-bold text-[#674F4A]">Todo List</h1>
        </div>

        <div className="flex h-[500px] flex-row justify-center w-3/5">
          <div className={`text-center p-4 flex flex-col gap-4 ${secondColor} w-1/5 rounded-lg`}>
            <div className={`text-[#674F4A] ${mainColor} font-itim flex justify-center items-center rounded-lg shadow-xl px-4 py-2`}>
              Categories
            </div>

            <div className="flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
              {categories.map((cat:any, idx: any) => (
                <div
                  key={idx}
                  className="font-itim text-[#674F4A] font-bold flex justify-between items-center py-2 px-2 rounded-lg"
                  style={{ backgroundColor: cat.color }}
                >
                  <span>{cat.name}</span>
                  <button
                    onClick={() => setCategories(categories.filter((c: any) => c.name !== cat.name))}
                    className="ml-2 text-[#797979] hover:text-gray-300 font-bold"
                    title={`Delete ${cat.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <ModalForm
                buttonLabel="Add Category"
                title="Add a new category"
                darkMode={darkMode}
                onSubmit={(name: string) => {
                  const nameTrimmed = name.trim();
                  const exists = categories.some(
                    (cat:any) => cat.name.toLowerCase() === nameTrimmed.toLowerCase()
                  );

                  if (!exists && nameTrimmed) {
                    const usedColors = categories.map((c:any) => c.color);
                    const availableColors = categoryColors.filter(
                      (c) => !usedColors.includes(c)
                    );
                    const nextColor =
                      availableColors.length > 0
                        ? availableColors[0]
                        : categoryColors[categories.length % categoryColors.length];

                    setCategories([
                      ...categories,
                      { name: nameTrimmed, color: nextColor },
                    ]);
                  }
                }}
              />
            </div>
          </div>

          <div className="w-4/5 flex flex-col">
            <div className={`text-center ${secondColor} flex gap-4 mx-4 rounded-lg h-[50px] justify-around items-center`}>
              <h1 className="font-itim text-[#8E7069]">{tasks.length} Tasks</h1>

              <ModalForm
                buttonLabel="Add Task"
                title="Add a new task"
                darkMode={darkMode}
                categories={categories}
                onSubmit={(text: string, category?: string) => {
                  const textTrimmed = text.trim();
                  if (textTrimmed && category) {
                    setTasks([
                      ...tasks,
                      {
                        id: Date.now(),
                        text: textTrimmed,
                        category,
                        completed: false,
                      },
                    ]);
                  }
                }}
              />

              <button
                className={`px-4 py-2 ${mainColor} text-[#8E7069] font-itim rounded`}
                onClick={() => setTasks(tasks.filter((task:any) => !task.completed))}
              >
                Clear completed
              </button>
            </div>

            <div className={`flex-1 overflow-y-auto scrollbar-hide text-center ${secondColor} flex flex-col gap-4 mt-4 mx-4 rounded-lg`}>
              <div className="flex flex-col items-center">
                {tasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="flex p-2 my-2 h-[65px] justify-center items-center"
                  >
                    <Checkbox
                      checked={task.completed}
                      onChange={() => {
                        setTasks((prev:any) =>
                          prev.map((t:any) =>
                            t.id === task.id ? { ...t, completed: !t.completed } : t
                          )
                        );
                      }}
                    />
                    <div className={`${mainColor} w-[500px] mx-1 p-2 h-16 flex justify-start items-center rounded-xl`}>
                      <h1
                        className={`font-itim ${
                          task.completed ? "line-through text-gray-500" : "text-[#674F4A]"
                        }`}
                      >
                        {task.text} - {task.category}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
