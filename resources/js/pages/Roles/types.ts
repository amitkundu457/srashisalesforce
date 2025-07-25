export interface PageProps<T = any> {
  auth?: {
    user: {
      id: number;
      name: string;
      email: string;
      roles?: string[];
      permissions?: string[];
    };
  };
  ziggy?: any;
  flash?: {
    success?: string;
    error?: string;
  };
  errors?: Record<string, string>;
  [key: string]: any;
}
