export default function HasilUjian() {
  const results = [
    {
      id: 1,
      student: "John Doe",
      exam: "React Quiz",
      score: 85,
      date: "2024-01-25",
    },
    {
      id: 2,
      student: "Jane Smith",
      exam: "JavaScript Test",
      score: 92,
      date: "2024-01-26",
    },
    {
      id: 3,
      student: "Bob Wilson",
      exam: "Python Exam",
      score: 78,
      date: "2024-01-27",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Exam Results</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Student</th>
              <th className="px-6 py-3 text-left">Exam</th>
              <th className="px-6 py-3 text-left">Score</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-t">
                <td className="px-6 py-3">{result.student}</td>
                <td className="px-6 py-3">{result.exam}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      result.score >= 80
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {result.score}%
                  </span>
                </td>
                <td className="px-6 py-3">{result.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
