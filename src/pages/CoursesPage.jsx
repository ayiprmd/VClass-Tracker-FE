import React from 'react';
import CourseCard from '../components/courses/CourseCard';
import { useAuth } from '../context/AuthContext';

export default function CoursesPage() {
  const { courses } = useAuth();
  const displayedCourses = (Array.isArray(courses) ? courses : []).filter((course) => course.status !== 'archived');

  return (
    <div className="flex flex-col w-full bg-slate-50/50 min-h-[calc(100vh-64px)] pt-stack-md">
      {/* Header Section */}
      <div className="w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-display text-slate-900 mb-2 font-extrabold tracking-tight">
            My Courses
          </h1>
          <p className="font-body text-body text-slate-500 max-w-2xl leading-relaxed">
            Kelola mata kuliah aktif, cek materi, dan cek tugas yang sedang berjalan di setiap mata kuliah.
          </p>
        </div>
      </div>

      {/* Main Course Grid */}
      <div className="w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop pb-stack-lg">
        {displayedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-dashed border-slate-200">
            Tidak ada mata kuliah aktif saat ini.
          </div>
        )}
      </div>
    </div>
  );
}

