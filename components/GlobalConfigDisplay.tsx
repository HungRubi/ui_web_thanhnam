"use client";

import { useGlobalConfig } from "@/hooks/useGlobalConfig";

export default function GlobalConfigDisplay() {
  const { data, loading, error, refetch } = useGlobalConfig();

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p>Đang tải thông tin website...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Lỗi: {error}</p>
        <button
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Thông tin Website</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Thông tin cơ bản</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Tên website:</span> {data.name}</p>
            <p><span className="font-medium">Slogan:</span> {data.slogan}</p>
            <p><span className="font-medium">Tên công ty:</span> {data.nameCompany}</p>
            {data.logo && (
              <p><span className="font-medium">Logo:</span> {data.logo}</p>
            )}
            {data.favicon && (
              <p><span className="font-medium">Favicon:</span> {data.favicon}</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Liên hệ</h3>
          <div className="space-y-2 text-sm">
            {data.hotline && (
              <p><span className="font-medium">Hotline:</span> {data.hotline}</p>
            )}
            {data.phone && (
              <p><span className="font-medium">Điện thoại:</span> {data.phone}</p>
            )}
            {data.email && (
              <p><span className="font-medium">Email:</span> {data.email}</p>
            )}
            {data.address && (
              <p><span className="font-medium">Địa chỉ:</span> {data.address}</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Thông báo</h3>
          <div className="space-y-2 text-sm">
            {data.notifi1 && (
              <p><span className="font-medium">Thông báo 1:</span> {data.notifi1}</p>
            )}
            {data.notifi2 && (
              <p><span className="font-medium">Thông báo 2:</span> {data.notifi2}</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Khác</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Block Index:</span> {data.blockIndex}</p>
            <p><span className="font-medium">Copyright:</span> {data.copyRight}</p>
            {data.lastUpdate && (
              <p><span className="font-medium">Cập nhật lần cuối:</span> {data.lastUpdate}</p>
            )}
          </div>
        </div>
      </div>

      {data.footer && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="font-semibold text-gray-700 mb-2">Footer</h3>
          <div className="text-sm" dangerouslySetInnerHTML={{ __html: data.footer }} />
        </div>
      )}

      {data.contact && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="font-semibold text-gray-700 mb-2">Liên hệ</h3>
          <div className="text-sm" dangerouslySetInnerHTML={{ __html: data.contact }} />
        </div>
      )}
    </div>
  );
}

