import axios from 'axios';
import { LovelaceSubscribedGameUrl } from '../models/lovelace-subscribed-game-url.model';
import { UpdatedSubscribedGameInfo } from '../models/updated-subscribed-game-info.model';

export async function getUpdatedGamesInfoFromExtractorService(
  requests: LovelaceSubscribedGameUrl[]
): Promise<UpdatedSubscribedGameInfo[]> {
  const extractorUrl = process.env.EXTRACTOR_SERVICE_URL as string;

  const response = await axios.post(extractorUrl, requests);

  return response.data as UpdatedSubscribedGameInfo[];
}
