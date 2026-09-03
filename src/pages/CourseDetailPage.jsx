import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseContents } from '../services/api';
import Icon from '../components/common/Icon';
import Badge from '../components/common/Badge';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await getCourseContents(id.replace('course-', ''));
      if (res.success) setContent(res.data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="p-12 text-center text-slate-500">Loading...</div>;
  if (!content || !content.topics) return <div className="p-12 text-center text-slate-500">Loading konten...</div>;

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop py-stack-md">
      <h1 className="text-3xl font-bold mb-2 text-slate-900">{content.course.name}</h1>
      <p className="text-slate-500 mb-8">{content.course.instructor}</p>

      {content.topics?.map((topic) => (
        <div key={topic.id} className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">{topic.name}</h2>
          <p className="text-slate-600 mb-4">{topic.summary}</p>
          
          <div className="space-y-3">
            {topic.activities?.map((act) => (
              <div key={act.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge variant={act.type === 'Materi' ? 'slate' : 'blue'}>{act.type}</Badge>
                  <span className="font-medium text-slate-700">{act.title}</span>
                </div>
                <a 
                  href={act.url} 
                  download={act.type === 'Materi'} 
                  target={act.type === 'Materi' ? undefined : '_blank'} 
                  rel="noreferrer"
                  className="text-primary font-medium hover:underline text-sm flex items-center gap-1"
                >
                  {act.type === 'Materi' ? 'Download' : 'Buka'} <Icon name="open_in_new" size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
