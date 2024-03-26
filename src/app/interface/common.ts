export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

export interface WorkshopsList {
    workshopList: string[];
}

export interface WorkshopsListSearch {
    workshop_status?: string;
    certificate_flag?: boolean;
}

export interface PaginationTemplate {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    startIndex: number;
}