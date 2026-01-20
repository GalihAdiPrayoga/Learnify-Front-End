import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import Loading from "@/components/Loading";
import NotFound from "@/features/error/notfound";
import {
  Users,
  BookOpen,
  PenTool,
  CheckCircle,
  FileText,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const { dashboardData, loading, error, refetch } = useDashboard();

  if (loading) return <Loading />;

  if (error) {
    return (
      <NotFound
        title="Gagal Memuat Dashboard"
        message={error || "Terjadi kesalahan saat mengambil data dashboard."}
        type="error"
        onRetry={refetch}
      />
    );
  }

  const { stats, charts } = dashboardData;

  // Stats cards configuration
  const statsCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
    },
    {
      label: "Total Courses",
      value: stats?.totalKelas ?? 0,
      icon: BookOpen,
    },
    {
      label: "Active Enrollments",
      value: stats?.activeEnrollments ?? 0,
      icon: PenTool,
    },
    {
      label: "Completion Rate",
      value: `${stats?.completionRate ?? 0}%`,
      icon: CheckCircle,
    },
  ];

  // Prepare chart data
  const enrollmentChartData =
    charts?.recentEnrollments?.map((item) => ({
      date: new Date(item.date).toLocaleDateString("id-ID", {
        month: "short",
        day: "numeric",
      }),
      enrollments: item.count,
    })) ?? [];

  const popularCoursesData =
    charts?.popularCourses?.map((course) => ({
      name: course.nama,
      enrollments: course.enrollments,
    })) ?? [];

  const monthlyRegistrationsData =
    charts?.monthlyRegistrations?.map((item) => ({
      month: item.month,
      registrations: item.count,
    })) ?? [];

  // Exam statistics for pie chart
  const examData = [
    { name: "Passed", value: stats?.passRate ?? 0 },
    { name: "Failed", value: 100 - (stats?.passRate ?? 0) },
  ];

  const COLORS = ["#10b981", "#ef4444"];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of your Learning Management System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="mb-3 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <IconComponent
                  size={24}
                  strokeWidth={2}
                  className="text-gray-600"
                />
              </div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="mb-3 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <FileText className="text-gray-600" size={24} strokeWidth={2} />
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Materials</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {stats?.totalMateri ?? 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="mb-3 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <ClipboardList
              className="text-gray-600"
              size={24}
              strokeWidth={2}
            />
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Exams</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {stats?.totalExams ?? 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="mb-3 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <TrendingUp className="text-gray-600" size={24} strokeWidth={2} />
          </div>
          <p className="text-gray-600 text-sm font-medium">Average Score</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {stats?.averageScore ?? 0}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrollments - Area Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Enrollments (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={enrollmentChartData}>
              <defs>
                <linearGradient
                  id="colorEnrollments"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="enrollments"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorEnrollments)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Exam Pass Rate - Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Exam Pass Rate
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={examData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {examData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Courses - Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Top 5 Popular Courses
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularCoursesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="enrollments" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Registrations - Area Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Monthly User Registrations
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRegistrationsData}>
              <defs>
                <linearGradient
                  id="colorRegistrations"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="registrations"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorRegistrations)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
