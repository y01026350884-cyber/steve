'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Inquiry {
  id: number;
  name: string;
  title: string;
  status: string;
  created_at: string;
  is_private: boolean;
}

export default function SupportPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [replyCounts, setReplyCounts] = useState<Record<number, number>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10; // ✅ 페이지당 글 수

  useEffect(() => {
    const fetchInquiries = async () => {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setInquiries(data as Inquiry[]);

      // ✅ 답변 여부도 같이 확인
      const { data: repliesData, error: repliesError } = await supabase
        .from("inquiry_replies")
        .select("inquiry_id");

      if (!repliesError && repliesData) {
        const counts: Record<number, number> = {};
        repliesData.forEach((r) => {
          counts[r.inquiry_id] = (counts[r.inquiry_id] || 0) + 1;
        });
        setReplyCounts(counts);
      }
    };
    fetchInquiries();
  }, []);

  const totalPages = Math.ceil(inquiries.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInquiries = inquiries.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <>
      {/* ===== 상단 히어로 ===== */}
      <section className="relative h-[240px] md:h-[300px] lg:h-[340px]">
        <Image
          src="/greeting/hero.png"
          alt="견적문의"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">견적문의</h1>
            <p className="mt-2 text-sm md:text-base opacity-95">
              금화레이저에 문의를 남겨주시면 신속하게 답변드리겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 본문 ===== */}
      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <p className="text-center text-gray-700 mb-6 text-lg">
          아래에서 기존 문의 내역을 확인하시거나, 새 문의를 작성해 보세요.
        </p>

        <div className="flex justify-center mb-10">
          <Link
            href="/support/write"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            문의 작성하기
          </Link>
        </div>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 w-16">번호</th>
              <th className="border p-2">제목</th>
              <th className="border p-2 w-32">작성자</th>
              <th className="border p-2 w-40">날짜</th>
              <th className="border p-2 w-24">상태</th>
            </tr>
          </thead>
          <tbody>
            {currentInquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  등록된 문의가 없습니다.
                </td>
              </tr>
            ) : (
              currentInquiries.map((inq, idx) => {
                const hasReply = replyCounts[inq.id] && replyCounts[inq.id] > 0;
                const status = hasReply ? "답변완료" : "대기";

                return (
                  <tr key={inq.id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">
                      {inquiries.length - (startIdx + idx)}
                    </td>
                    <td className="border p-2">
                      <Link
                        href={`/support/${inq.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {inq.is_private ? `🔒 ${inq.title}` : inq.title}
                      </Link>
                    </td>
                    <td className="border p-2 text-center">{inq.name}</td>
                    <td className="border p-2 text-center">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="border p-2 text-center">
                      <span
                        className={`px-2 py-1 rounded text-white text-sm ${
                          status === "대기"
                            ? "bg-gray-500"
                            : "bg-red-600"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* ===== 페이지네이션 + 글쓰기 버튼 ===== */}
        <div className="flex justify-between items-center mt-6">
          {/* 페이지네이션 */}
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              ≪
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              &gt;
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              ≫
            </button>
          </div>

          {/* 글쓰기 버튼 */}
          <Link
            href="/support/write"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            글쓰기
          </Link>
        </div>
      </main>
    </>
  );
}
