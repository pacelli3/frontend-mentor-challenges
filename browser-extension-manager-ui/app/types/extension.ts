export type Extension = {
    id: string;
    logo_url: string;
    name: string;
    description: string;
    is_active: boolean;
    created_at: string;
    banner_url: string;
    categories: string[];
    number_of_users: number;
    rating: number;
    details: {
        version: string;
        last_commit: string;
        size: string;
        languages: string[];
        developer: string;
        is_trader: boolean;
    };
};
