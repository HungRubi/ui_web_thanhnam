# Hướng dẫn sử dụng Redux Toolkit với Global Config API

## Cấu hình

1. Tạo file `.env.local` trong thư mục root và thêm:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Cấu trúc

- `lib/api.ts` - API service để fetch data từ backend
- `store/store.ts` - Redux store configuration
- `store/globalConfigSlice.ts` - Redux slice cho global config
- `store/hooks.ts` - Typed hooks cho Redux
- `hooks/useGlobalConfig.ts` - Custom hook để sử dụng global config
- `components/StoreProvider.tsx` - Redux Provider wrapper
- `components/GlobalConfigDisplay.tsx` - Component mẫu để hiển thị dữ liệu

## Cách sử dụng

### 1. Sử dụng hook `useGlobalConfig`

```tsx
"use client";

import { useGlobalConfig } from "@/hooks/useGlobalConfig";

export default function MyComponent() {
  const { data, loading, error, refetch } = useGlobalConfig();

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.slogan}</p>
      <button onClick={refetch}>Làm mới</button>
    </div>
  );
}
```

### 2. Sử dụng trực tiếp Redux hooks

```tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getGlobalConfig } from "@/store/globalConfigSlice";
import { useEffect } from "react";

export default function MyComponent() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.globalConfig);

  useEffect(() => {
    dispatch(getGlobalConfig());
  }, [dispatch]);

  // ... rest of component
}
```

### 3. Sử dụng component có sẵn

```tsx
import GlobalConfigDisplay from "@/components/GlobalConfigDisplay";

export default function Page() {
  return (
    <div>
      <GlobalConfigDisplay />
    </div>
  );
}
```

## API Response Format

API trả về format:
```json
{
  "data": {
    "name": "Thành Nam Store",
    "logo": "...",
    "slogan": "Uy tín tạo niềm tin",
    "hotline": "...",
    "phone": "...",
    "email": "...",
    "address": "...",
    // ... các field khác
  }
}
```

## Lưu ý

- Store đã được tích hợp vào `app/layout.tsx` qua `StoreProvider`
- Tất cả component sử dụng Redux phải có `"use client"` directive
- API URL có thể được cấu hình qua biến môi trường `NEXT_PUBLIC_API_URL`

