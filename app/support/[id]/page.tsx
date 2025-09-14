'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  title: string;
  category: string;
  message: string;
  status: string;
  created_at: string;
  is_private: boolean;
  password_hash: string;
}

interface Reply {
  id: number;
  admin_name: string;
  reply: string;
  created_at: string;
}

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  // ✅ 문의글 가져오기
  useEffect(() => {
    const fetchInquiry = async () => {
      if (!params.id) return;
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching inquiry:', error);
      } else {
        setInquiry(data as Inquiry);
      }
    };

    fetchInquiry();
  }, [params.id]);

  // ✅ 답변 가져오기
  const fetchReplies = async () => {
    const { data, error } = await supabase
      .from('inquiry_replies')
      .select('*')
      .eq('inquiry_id', params.id)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setReplies(data as Reply[]);

      // 🔥 답변이 하나라도 있으면 상태를 "답변완료"로 갱신
      if (data.length > 0 && inquiry?.status !== '답변완료') {
        await supabase
          .from('inquiries')
          .update({ status: '답변완료' })
          .eq('id', params.id);

        setInquiry((prev) =>
          prev ? { ...prev, status: '답변완료' } : prev
        );
      }
    }
  };

  const handleUnlock = async () => {
    if (!inquiry) return;

    const match = await bcrypt.compare(password, inquiry.password_hash);
    if (match) {
      setUnlocked(true);
      fetchReplies();
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  if (!inquiry) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p>로딩 중...</p>
      </div>
    );
  }

  // 🔒 비밀글인데 아직 비밀번호 확인 전
  if (inquiry.is_private && !unlocked) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">🔒 비밀글 확인</h1>
        <p className="mb-4">비밀번호를 입력해야 글을 볼 수 있습니다.</p>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleUnlock}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          확인
        </button>
        <button
          onClick={() => router.push('/support/list')}
          className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          목록으로
        </button>
      </div>
    );
  }

  // 🔓 unlocked 상태 → 내용 + 답변 보여줌
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">문의 상세보기</h1>
      <div className="space-y-4">
        <div><span className="font-semibold">제목: </span>{inquiry.title}</div>
        <div><span className="font-semibold">작성자: </span>{inquiry.name}</div>
        <div><span className="font-semibold">이메일: </span>{inquiry.email}</div>
        <div><span className="font-semibold">전화번호: </span>{inquiry.phone}</div>
        <div><span className="font-semibold">카테고리: </span>{inquiry.category || '-'}</div>
        <div>
          <span className="font-semibold">상태: </span>
          <span
            className={`px-2 py-1 rounded text-white text-sm ${
              inquiry.status === '대기'
                ? 'bg-yellow-500'
                : inquiry.status === '답변완료'
                ? 'bg-green-600'
                : 'bg-gray-500'
            }`}
          >
            {inquiry.status}
          </span>
        </div>
        <div><span className="font-semibold">작성일: </span>{new Date(inquiry.created_at).toLocaleString()}</div>
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <span className="font-semibold block mb-2">문의 내용</span>
          <p className="whitespace-pre-wrap">{inquiry.message}</p>
        </div>
      </div>

      {/* ✅ 관리자 답변 */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">관리자 답변</h2>
        {replies.length === 0 ? (
          <p className="text-gray-500">아직 답변이 없습니다.</p>
        ) : (
          replies.map((r) => (
            <div key={r.id} className="mb-4 p-4 border rounded bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">
                {r.admin_name} | {new Date(r.created_at).toLocaleString()}
              </p>
              <p>{r.reply}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={() => router.push('/support/list')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}
