const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface GlobalConfig {
  _id?: string;
  name: string;
  logo?: string;
  favicon?: string;
  blockIndex: "Yes" | "No";
  slogan: string;
  notifi1?: string;
  notifi2?: string;
  nameCompany: string;
  userPost?: string;
  hotline?: string;
  phone?: string;
  address?: string;
  email?: string;
  copyRight: string;
  linkDKBCT?: string;
  googleMap?: string;
  footer?: string;
  contact?: string;
  lastUpdate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export const fetchGlobalConfig = async (): Promise<GlobalConfig> => {
  try {
    // Sử dụng Next.js API route để tránh CORS
    const response = await fetch("/api/global", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<GlobalConfig> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching global config:", error);
    throw error;
  }
};

// Content config interfaces
export interface ContentConfig {
  _id?: string;
  name: string;
  description?: string;
  howToApply?: string;
  FAQs?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const fetchContentConfig = async (): Promise<ContentConfig> => {
  try {
    const response = await fetch("/api/content-config", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<ContentConfig> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching content config:", error);
    throw error;
  }
};

// SEO config interfaces
export interface SeoConfig {
  _id?: string;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  googleAnalyticCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const fetchSeoConfig = async (): Promise<SeoConfig> => {
  try {
    const response = await fetch("/api/seo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<SeoConfig> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching seo config:", error);
    throw error;
  }
};

// Category interfaces
export interface Category {
  _id?: string;
  tendanhmuc: string;
  slug: string;
  sapxep: number;
  danhmuccha?: string;
  image?: string;
  hienthi: boolean;
  hienthitrangchu: boolean;
  mota?: string;
  metatitle?: string;
  metakeywords?: string;
  metadescription?: string;
  formatDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryResponse {
  categoryFormat?: Category[];
  searchCategory?: Category[];
  totalPage?: number;
  searchType: boolean;
}

export const fetchCategories = async (searchQuery?: string): Promise<CategoryResponse> => {
  try {
    const url = searchQuery 
      ? `/api/category?timkiem=${encodeURIComponent(searchQuery)}`
      : "/api/category";
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<CategoryResponse> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Store interfaces
export interface Store {
  _id?: string;
  tenstore: string;
  slug: string;
  danhmuc: Category | string;
  stt: number;
  event: string;
  image?: string;
  duyetbai: "Yes" | "No";
  motangan?: string;
  about?: string;
  howtoapply?: string;
  faqs?: string;
  metatitle?: string;
  metadescription?: string;
  metakeywords?: string;
  formatDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StoreResponse {
  storeFormat?: Store[];
  searchStore?: Store[];
  totalPage?: number;
  searchType: boolean;
}

export const fetchStores = async (searchQuery?: string): Promise<StoreResponse> => {
  try {
    const url = searchQuery 
      ? `/api/store?timkiem=${encodeURIComponent(searchQuery)}`
      : "/api/store";
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<StoreResponse> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
};

export const fetchStoreBySlug = async (slug: string): Promise<Store> => {
  try {
    const response = await fetch(`/api/store/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Store> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching store by slug:", error);
    throw error;
  }
};

// News interfaces
export interface News {
  _id?: string;
  name: string;
  slug: string;
  category: Category | string;
  image?: string;
  duyet: "Yes" | "No";
  description?: string;
  content?: string;
  metatitle?: string;
  metadescription?: string;
  metakeywords?: string;
  formatDate?: string;
  lastUpdate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsResponse {
  newFormat?: News[];
  searchNew?: News[];
  totalPage?: number;
  searchType: boolean;
}

export const fetchNews = async (searchQuery?: string): Promise<NewsResponse> => {
  try {
    const url = searchQuery 
      ? `/api/new?timkiem=${encodeURIComponent(searchQuery)}`
      : "/api/new";
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<NewsResponse> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const fetchNewsById = async (id: string): Promise<News> => {
  try {
    const response = await fetch(`/api/new/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<{ news: News }> = await response.json();
    return result.data.news;
  } catch (error) {
    console.error("Error fetching news by id:", error);
    throw error;
  }
};

// Event interfaces
export interface Event {
  _id?: string;
  tendanhmuc: string;
  slug: string;
  sapxep?: number;
  danhmuccha?: string;
  image?: string;
  hienthi?: boolean;
  hienthitrangchu?: boolean;
  mota?: string;
  metatitle?: string;
  metakeywords?: string;
  metadescription?: string;
  formatDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Response khi get danh sách event
export interface EventResponse {
  eventFormat?: Event[];
  searchEvent?: Event[];
  searchType: boolean;
}

// Response khi get chi tiết event theo id
export interface EventDetail {
  event: Event;
  [key: string]: any;
}

export const fetchEvents = async (searchQuery?: string): Promise<EventResponse> => {
  try {
    const url = searchQuery
      ? `/api/event?timkiem=${encodeURIComponent(searchQuery)}`
      : "/api/event";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<EventResponse> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const fetchEventById = async (id: string): Promise<EventDetail> => {
  try {
    const response = await fetch(`/api/event/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: EventDetail = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching event by id:", error);
    throw error;
  }
};

// Deal interfaces
export interface Deal {
  _id?: string;
  name: string;
  slug: string;
  danhmuc?: string;
  originalPrice?: number;
  price?: number;
  url?: string;
  image?: string;
  duyet: "Yes" | "No";
  description?: string;
  metatitle?: string;
  metadescription?: string;
  metakeywords?: string;
  formatDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DealResponse {
  dealFormat?: Deal[];
  searchDeal?: Deal[];
  totalPage?: number;
  searchType: boolean;
}

export const fetchDeals = async (searchQuery?: string): Promise<DealResponse> => {
  try {
    const url = searchQuery
      ? `/api/deal?timkiem=${encodeURIComponent(searchQuery)}`
      : "/api/deal";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<DealResponse> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching deals:", error);
    throw error;
  }
};
