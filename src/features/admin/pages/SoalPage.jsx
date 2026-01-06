export default function SoalPage() {
  const questions = [
    {
      id: 1,
      question: "What is React?",
      course: "React Basics",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "Explain hooks",
      course: "React Basics",
      difficulty: "Medium",
    },
    {
      id: 3,
      question: "State management patterns",
      course: "Advanced React",
      difficulty: "Hard",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Questions Management</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Question</th>
              <th className="px-6 py-3 text-left">Course</th>
              <th className="px-6 py-3 text-left">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="border-t">
                <td className="px-6 py-3">{q.question}</td>
                <td className="px-6 py-3">{q.course}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      q.difficulty === "Easy"
                        ? "bg-green-100"
                        : q.difficulty === "Medium"
                        ? "bg-yellow-100"
                        : "bg-red-100"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
