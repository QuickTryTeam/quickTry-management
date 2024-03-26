export interface Customer {
    register_id: string;
    workshop_detail_id: string;
    timestamp: string;
    email: string;
    workshop_name: string;
    statement_evidence: string;
    name_surname: string;
    nickname: string;
    education: string;
    telephone_no: string;
    source: string;
    remark: string;
    approval: string;
    order_no: string;
    status: string;
    agreement: string;
    check_morning: boolean;
    check_afternoon: boolean;
}

export interface SearchCustomer {
    workshop?: string;
    nickname?: string;
    status?: string;
    workshopDetailId?: string
}


export interface ApproveStatus {
    registerId: string;
    approval: string;
    status: string;
}

export interface UpdateCustomer {
    registerId: string;
    email?: string;
    nameSurname?: string;
    nickname?: string;
    telephoneNo?: string;
    remark?: string;
    approval?: string;
    checkMorning?: boolean;
    checkAfternoon?: boolean;
    status?: string;
}