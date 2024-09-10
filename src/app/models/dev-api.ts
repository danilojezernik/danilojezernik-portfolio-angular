export interface DevToArticle {
  '_id'?: string
  type_of: string
  title: string
  description: string
  url: string
  cover_image: string
  published_at: string
  tag_list: string[]
  user: {
    name: string
    profile_image: string
    website_url: string | null
  }
  last_updated: string
}
