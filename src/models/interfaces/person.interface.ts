export interface Person {
  id: String
  name: String
  description: String
  category: String
  picture: String
  lastUpdated: String
  votes: {
    positive: Number
    negative: Number
  }
}
