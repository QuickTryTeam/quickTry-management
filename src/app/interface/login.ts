export interface Login {
    username: string;
    password: string;
}

export interface Token {
    token: string;
    nickname: string;
    id?: string;
    role: string;
}
