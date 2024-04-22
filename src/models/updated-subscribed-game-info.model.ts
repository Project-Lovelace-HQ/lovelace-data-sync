// Interface for the response from the extractor service
export interface UpdatedSubscribedGameInfo {
  id: string;
  error: boolean;
  response: string | GameInfo;
}

interface GameInfo {
  city: string;
  condition: string;
  details: string;
  price: number;
  link: string;
}
