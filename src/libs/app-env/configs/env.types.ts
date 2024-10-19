export interface RuntimeEnvironment {
  name: 'local' | 'development' | 'staging' | 'production';
  baseUrl: string;
}
