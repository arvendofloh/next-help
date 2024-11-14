interface DirectusBase {
  id: string;
  date_created: string;
  date_updated?: string;
  user_created: string;
  user_updated?: string;
  status?: string;
  sort?: number;
}

export interface Meta {
  title: string;
  description: string;
}

export interface Category {
  id: string;
  title: string;
  faqs: FAQ[];
}

export interface FAQ extends DirectusBase {
  title: string;
  answer: string;
  category: Category;
  translations?: TutorialTranslation[];
}

export interface Translation {
  id: number;
  languages_code: string;
}

export interface TutorialCategoryTranslation extends Translation {
  title: string;
  tutorial_category_id: string;
}

export interface TutorialCategory {
  id: string;
  sort: number;
  title: string;
  tutorials: Tutorial[];
  translations?: TutorialCategoryTranslation[];
}

export interface TutorialTranslation extends Translation {
  link: string;
  title: string;
  tutorials_id: string;
}

export interface Tutorial extends DirectusBase {
  title: string;
  image: string;
  imagelink: string;
  link: string;
  translations?: TutorialTranslation[];
}

export interface ReleaseNoteTranslation extends Translation {
  content: string;
  tutorials_id: string;
}

export interface ReleaseNote {
  releasedate: string;
  title: string;
  content: string;
  status: "draft" | "published";
  translations?: ReleaseNoteTranslation[];
}
