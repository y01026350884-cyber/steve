'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

export default function WritePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    category: '',
    message: '',
    password: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const password_hash = await bcrypt.hash(formData.password, 10);

    const { error } = await supabase.from('inquiries').insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        title: formData.title,
        category: formData.category,
        message: formData.message,
        password_hash,
        is_private: true,
        status: '대기', // ✅ 기본 상태 저장
      },
    ]);

    if (error) {
      console.error('Insert Error:', error);
      alert('저장 실패!');
    } else {
      alert('문의가 등록되었습니다.');
      router.push('/support/list');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">견적문의</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <table className="w-full border border-gray-300">
          <tbody>
            <tr>
              <th className="w-32 bg-gray-100 border p-2 text-right">작성자(*)</th>
              <td className="border p-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <th className="bg-gray-100 border p-2 text-right">이메일(*)</th>
              <td className="border p-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <th className="bg-gray-100 border p-2 text-right">전화번호</th>
              <td className="border p-2">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </td>
            </tr>
            <tr>
              <th className="bg-gray-100 border p-2 text-right">제목(*)</th>
              <td className="border p-2">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <th className="bg-gray-100 border p-2 text-right">문의종류</th>
              <td className="border p-2">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">선택해주세요</option>
                  <option value="LASER CUTTING">LASER CUTTING(레이저 절단)</option>
                  <option value="WELDING">WELDING(용접)</option>
                  <option value="ETC">기타</option>
                </select>
              </td>
            </tr>
            <tr>
              <th className="bg-gray-100 border p-2 text-right">비밀번호(*)</th>
              <td className="border p-2">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <th className="bg-gray-100 border p-2 text-right align-top">내용</th>
              <td className="border p-2">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border p-2 rounded h-40"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* 파일 첨부 */}
        <div className="border p-4 rounded bg-gray-50 space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">파일1</label>
            <input
              type="file"
              className="w-full border p-2 rounded bg-white file:bg-gray-100 file:border file:mr-2 file:px-3 file:py-1 file:rounded file:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">파일2</label>
            <input
              type="file"
              className="w-full border p-2 rounded bg-white file:bg-gray-100 file:border file:mr-2 file:px-3 file:py-1 file:rounded file:text-sm"
            />
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/support/list')}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            목록
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </form>
    </div>
  );
}
