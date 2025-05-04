export interface subCategoryI {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
}

export interface categoryI {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: subCategoryI[];
}
