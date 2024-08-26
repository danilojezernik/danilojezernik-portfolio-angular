/* tslint:disable */

/* eslint-disable */
export interface User {
  '_id'?: string;
  username: string;
  email: string;
  full_name: string;
  profession: string;
  technology: string;
  description: string;
  hashed_password: string;
  role?: string;
  confirmed: boolean;
  registered: boolean;
  blog_notification?: boolean;
  datum_vnosa: string;
}
