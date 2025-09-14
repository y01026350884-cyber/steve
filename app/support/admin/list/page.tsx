'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Inquiry {
  id: number;
  name: string;
  title: string;
  status: string;
  created_at: string;
}

export default function AdminInquiryListPage() {
  // ✅ 로그인 상태 관리
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // ✅ 관리자 비밀번호 (환경변수에서 가져오도록 권장)
  const ADMIN_PASSWORD =
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "laseradmin";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("관리자 비밀번호가 틀렸습니다.");
    }
  };

  // ✅ 문의/답변 상태
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [replyCounts, setReplyCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!authenticated) return; // 로그인 안 됐으면 차단

    const fetchInquiries = async () => {
      // 1) 문의글 가져오기
      const { data: inquiriesData, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && inquiriesData) {
        setInquiries(inquiriesData as Inquiry[]);

        // 2) 모든 답변 불러오기
        const { data: repliesData, error: repliesError } = await supabase
          .from("inquiry_replies")
          .select("inquiry_id");

        if (!repliesError && repliesData) {
          // 3) JS에서 카운트
          const counts: Record<number, number> = {};
          repliesData.forEach((r) => {
            counts[r.inquiry_id] = (counts[r.inquiry_id] || 0) + 1;
          });
          setReplyCounts(counts);
        }
      }
    };

    fetchInquiries();
  }, [authenticated]);

  // 🔒 로그인 화면
  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-xl font-bold mb-4">🔒 관리자 로그인</h1>
        <input
          type="password"
          placeholder="관리자 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          로그인
        </button>
      </div>
    );
  }

  // ✅ 로그인 성공 후 관리자 리스트
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">관리자 문의 리스트</h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 w-16">번호</th>
            <th className="border p-2">제목</th>
            <th className="border p-2 w-32">작성자</th>
            <th className="border p-2 w-40">날짜</th>
            <th className="border p-2 w-24">답변 여부</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                등록된 문의가 없습니다.
              </td>
            </tr>
          ) : (
            inquiries.map((inq, idx) => (
              <tr key={inq.id} className="hover:bg-gray-50">
                <td className="border p-2 text-center">
                  {inquiries.length - idx}
                </td>
                <td className="border p-2">
                  <Link
                    href={`/support/admin/${inq.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {inq.title}
                  </Link>
                </td>
                <td className="border p-2 text-center">{inq.name}</td>
                <td className="border p-2 text-center">
                  {new Date(inq.created_at).toLocaleDateString()}
                </td>
                <td className="border p-2 text-center">
                  {replyCounts[inq.id] && replyCounts[inq.id] > 0 ? (
                    <span className="text-green-600 font-semibold">✅ 완료</span>
                  ) : (
                    <span className="text-red-600 font-semibold">❌ 미답변</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
