'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface Inquiry {
  id: number;
  name: string;
  title: string;
  message: string;
  created_at: string;
}

export default function AdminReplyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [reply, setReply] = useState('');
  const [adminName, setAdminName] = useState('');

  // 문의글 가져오기
  useEffect(() => {
    const fetchInquiry = async () => {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) setInquiry(data as Inquiry);
    };
    if (id) fetchInquiry();
  }, [id]);

  // 답변 등록
  const handleSubmit = async () => {
    if (!reply || !adminName) {
      alert('관리자 이름과 답변을 입력하세요.');
      return;
    }

    const { error } = await supabase.from('inquiry_replies').insert([
      {
        inquiry_id: id,
        admin_name: adminName,
        reply,
        is_private: true, // ✅ 항상 비밀답변
      },
    ]);

    if (error) {
      console.error('Reply Insert Error:', error);
      alert('답변 등록 실패!');
    } else {
      // ✅ 답변 등록 성공 → 상태를 "답변완료"로 업데이트
      await supabase
        .from('inquiries')
        .update({ status: '답변완료' })
        .eq('id', id);

      alert('답변이 등록되었습니다.');
      setReply('');
      router.push(`/support/admin/list`); // 등록 후 관리자 리스트로 이동
    }
  };

  if (!inquiry) {
    return <div className="max-w-2xl mx-auto p-6">로딩 중...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">관리자 답변 작성</h1>

      {/* 문의글 미리보기 */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <p className="font-semibold">제목: {inquiry.title}</p>
        <p className="text-sm text-gray-600">
          작성자: {inquiry.name} | {new Date(inquiry.created_at).toLocaleString()}
        </p>
        <p className="mt-2 whitespace-pre-wrap">{inquiry.message}</p>
      </div>

      {/* 관리자 답변 작성 */}
      <input
        type="text"
        placeholder="관리자 이름"
        value={adminName}
        onChange={(e) => setAdminName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <textarea
        placeholder="답변 내용"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="w-full border p-2 rounded h-32"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        답변 등록
      </button>
      <button
        onClick={() => router.push('/support/admin/list')}
        className="ml-2 mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        취소
      </button>
    </div>
  );
}
