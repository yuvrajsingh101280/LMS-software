import React, { useState } from "react";

const Accordion = ({
  items = [
    {
      id: "item-1",
      title: "What is Course Management?",
      content:
        "Course management refers to the process of organizing, creating, and delivering course content in an LMS. It involves setting up course structures, defining learning objectives, uploading materials, scheduling lessons, and monitoring students’ progress through the course.",
    },
    {
      id: "item-2",
      title: "How are Assignments Managed?",
      content:
        "Assignments in an LMS are created by instructors to evaluate students' understanding of the course material. They can be in the form of essays, quizzes, projects, or presentations. The system allows instructors to assign deadlines, track submissions, and provide feedback to students.",
    },
    {
      id: "item-3",
      title: "What is a Grading System?",
      content:
        "A grading system in an LMS is used to evaluate students' performance based on assignments, quizzes, and exams. The system typically provides a numerical or letter grade, which reflects the student’s overall performance and allows instructors to assign weighted percentages for different types of evaluations.",
    },
    {
      id: "item-4",
      title: "How does Student Tracking Work?",
      content:
        "Student tracking in an LMS involves monitoring a student’s activity and progress throughout a course. This includes tracking their login times, module completion, assignment submissions, quiz performance, and participation in discussions. This data helps instructors identify students who may need additional support.",
    },
  ],
  allowMultiple,
}) => {
  const [activeItems, setActiveItems] = useState([]);

  const toggleItem = (itemId) => {
    if (allowMultiple) {
      setActiveItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setActiveItems((prev) => (prev.includes(itemId) ? [] : [itemId]));
    }
  };

  return (
    <div className="flex gap-4 mt-2 flex-col justify-center">
      <h1 className="text-3xl md:text-5xl text-blue-800 font-bold max-w-2xl leading-tight">
        FAQ
      </h1>
      <div className="w-full max-w-3xl mx-auto bg-blue-100 text-blue-900 rounded-lg shadow-lg border border-blue-300">
        {items.map((item) => {
          const isActive = activeItems.includes(item.id);
          const buttonClass =
            "w-full flex justify-between items-center py-5 px-6 text-left transition-colors duration-200 " +
            (isActive
              ? "bg-blue-200 text-blue-900"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200");
          const iconClass =
            "ml-4 transition-transform duration-300 text-blue-500 " +
            (isActive ? "rotate-180" : "");
          const panelId = "panel-" + item.id;
          const panelClass =
            "overflow-hidden transition-all duration-300 bg-blue-50 " +
            (isActive ? "max-h-96" : "max-h-0");

          return (
            <div
              key={item.id}
              className="border-b border-blue-300 last:border-b-0"
            >
              <button
                className={buttonClass}
                onClick={() => toggleItem(item.id)}
                aria-expanded={isActive}
                aria-controls={panelId}
              >
                <span className="text-lg font-medium flex-1">{item.title}</span>
                <span className={iconClass}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-current"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div id={panelId} className={panelClass} role="region">
                <div className="pb-5 px-6 text-blue-800 text-sm 2xl:text-base">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
