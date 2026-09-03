import React, { useState, useMemo } from 'react';
import Icon from '../components/common/Icon';
import SummaryStatCard from '../components/archive/SummaryStatCard';
import SearchFilterBar from '../components/archive/SearchFilterBar';
import ArchiveListHeader from '../components/archive/ArchiveListHeader';
import ArchiveListItem from '../components/archive/ArchiveListItem';
import LoadMoreButton from '../components/archive/LoadMoreButton';
import { useAuth } from '../context/AuthContext';
import { archiveData, archiveStats } from '../data dummy/archive';

export default function ArchivePage() {
  const { courses, isGuest, stats } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [displayCount, setDisplayCount] = useState(5);

  // Menggunakan data real dari stats (completed_activities_list)
  const dynamicArchiveData = useMemo(() => {
    console.log("DEBUG stats:", stats);
    if (!isGuest && stats?.completed_activities_list) {
      console.log("DEBUG completed list:", stats.completed_activities_list);
      return stats.completed_activities_list;
    }
    
    // Fallback ke dummy hanya jika isGuest
    if (isGuest) {
        const currentYear = new Date().getFullYear();
        return archiveData.map(item => ({
          ...item,
          completedDate: item.completedDate.replace('2023', currentYear.toString())
        }));
    }
    return [];
  }, [isGuest, stats]);

  const filteredArchive = useMemo(() => {
    return dynamicArchiveData.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.courseCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCourse =
        selectedCourse === 'All Courses' || item.course === selectedCourse;

      return matchSearch && matchCourse;
    });
  }, [dynamicArchiveData, searchQuery, selectedCourse]);

  // Extract unique course names for dropdown filter
  const courseOptions = useMemo(() => {
    const courseNames = new Set(dynamicArchiveData.map(item => item.course));
    return ['All Courses', ...Array.from(courseNames)];
  }, [dynamicArchiveData]);

  const displayedList = filteredArchive.slice(0, displayCount);

  const pageStats = useMemo(() => {
    const getQuote = (perc) => {
      if (perc >= 100) return { main: "Maha Raja Nerd", sub: "Sungkem sama Maha Raja Super NERD, Semua tugas lengkap? Gacor banget lu!!!" };
      if (perc >= 85) return { main: "Super Gokil", sub: "Kayanya lu kategori orang rajin di kelas deh!! Sungkem" };
      if (perc >= 70) return { main: "Gokil", sub: "Boleh boleh juga nih tingkat rajin lu!" };
      if (perc >= 50) return { main: "Ling Lung", sub: "Kayanya setengah diri lu rajin, tapi setengahnya males" };
      if (perc >= 30) return { main: "Mageran", sub: "Masa iya cuma segini kemampuan lu?" };
      return { main: "Mpruy", sub: "Ini total selesai atau diskon ramayana?" };
    };

    if (isGuest || !stats) return {
      totalCompleted: dynamicArchiveData.length,
      totalAll: dynamicArchiveData.length,
      percentage: 100,
      quoteData: { main: "Selesai!", sub: "Data simulasi" }
    };
    const completed = stats.completed_task_quiz || 0;
    const total = stats.total_task_quiz || 1;
    const perc = Math.round((completed / total) * 100);
    return {
      totalCompleted: completed,
      totalAll: total,
      percentage: perc,
      quoteData: getQuote(perc)
    };
  }, [dynamicArchiveData, isGuest, stats]);

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-64px)]">
      <div className="max-w-container-max mx-auto w-full px-margin-mobile lg:px-margin-desktop py-stack-md flex flex-col gap-stack-lg">
        
        {/* Page Header */}
        <div className="flex flex-col gap-2 w-full md:w-2/3 lg:w-1/2 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shadow-xs">
              <Icon name="inventory_2" size={24} />
            </div>
            <h1 className="text-display font-display text-slate-900 font-extrabold tracking-tight">
              Completed
            </h1>
          </div>
          <p className="text-body font-body text-slate-500 leading-relaxed">
            Catatan riwayat Tugas / Kuis VClass yang udah selesai, Cek Progress tugas lu disini yaa!
          </p>
        </div>

        {/* Analytics / Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <SummaryStatCard
            type="total"
            value={pageStats.totalCompleted}
            label="Total Selesai"
          />
          <SummaryStatCard
            type="rate"
            value={pageStats.percentage}
            label="Tingkat Penyelesaian"
          />
          <SummaryStatCard
            type="quote"
            value={pageStats.quoteData}
          />
        </div>

        {/* Filters & Search */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCourse={selectedCourse}
          onCourseChange={setSelectedCourse}
          courseOptions={courseOptions}
        />

        {/* Archive List Table */}
        <div className="flex flex-col gap-3 w-full">
          <ArchiveListHeader />

          {displayedList.length > 0 ? (
            displayedList.map((item, index) => (
              <ArchiveListItem key={item.id || `arch-${index}`} item={item} />
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-dashed border-slate-200">
              Tidak ada riwayat tugas yang cocok dengan pencarian.
            </div>
          )}

          {filteredArchive.length > displayedList.length && (
            <LoadMoreButton onClick={() => setDisplayCount((prev) => prev + 5)} />
          )}
        </div>

      </div>
    </div>
  );
}
