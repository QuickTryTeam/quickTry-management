export interface Lecturer {
    lecturer_id: string;
    timestamp: string;
    name_thai: string;
    name_eng: string;
    nickname: string;
    gender: string;
    telephone_no: string;
    email: string;
    profile_picture: string;
    career: string;
    company_name: string;
    university: string;
    faculty: string;
    department: string;
    two_digit_student_id: string;
    performance: string;
    payment_method: string;
    account_no: string;
    account_name: string;
    product_type: string;
    grade: string;
    remark: string;
    contact: string;
}

export interface SearchLecturer {
    career: string;
    nickname: string;
}

export interface UpdateLecturer {
    lecturerId: string;
    timestamp?: string;
    nameThai?: string;
    nameEng?: string;
    nickname?: string;
    gender?: string;
    telephoneNo?: string;
    email?: string;
    contact?: string;
    profilePicture?: string;
    career?: string;
    companyName?: string;
    university?: string;
    faculty?: string;
    department?: string;
    performance?: string;
    paymentMethod?: string;
    accountNo?: string;
    accountName?: string;
    grade?: string;
    remark?: string;
}