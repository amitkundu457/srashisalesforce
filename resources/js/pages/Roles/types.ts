export interface PageProps {
  auth?: {
    user: {
      id: number;
      name: string;
      email: string;
      roles?: string[];
      permissions?: string[];
    };
  };
  ziggy?: Record<string, unknown>; // 👈 Better than `any`
  flash?: {
    success?: string;
    error?: string;
  };
  errors?: Record<string, string>;
  [key: string]: unknown; // 👈 Avoid `any` here too
}
