export interface SearchWorkshop {
    workshop: string;
}

export interface UpdateWorkshopInfo {
    id: string;
    check_morning: boolean;
    check_afternoon: boolean;
    remark: string;
}

export interface WorkshopList {
    workshopList: Workshop[];
}

export interface Workshop {
    workshop_id: string;
    workshop_name: string;
    workshop_type: string;
    sum_customers: number;
    latest_workshop_date: string;
    latest_workshop_date_format: string;
    workshop_detail_list: WorkshopDetail[];
}

export interface WorkshopDetail {
    workshop_detail_id: string;
    workshop_id: string;
    lecturer_id: string;
    workshop_date: string;
    workshop_date_format: Date;
    earlybird_price: number;
    normal_price: number;
    earlybird_flag: boolean;
    status: string;
    certificate_flag: boolean;
    form_status: string;
    total_customers: number;
    workshop_name?: string;
    workshop_type?: string;
    remark?: string;
}

export interface UpdateWorkshop {
    workshopId: string;
    workshopName: string;
    workshopType: string;
    workshopDetail: UpdateWorkshopDetail[]
}

export interface UpdateWorkshopDetail {
    workshopDetailId: string;
    workshopId: string;
    lecturerId?: string;
    workshopDate?: string;
    normalPrice?: number;
    remark?: string;
    action: string;
}





