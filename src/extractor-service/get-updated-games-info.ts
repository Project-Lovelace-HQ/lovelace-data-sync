import axios from 'axios';
import { LovelaceSubscribedGameInfo } from '../models/lovelace-subscribed-game-info.model';
import { UpdatedSubscribedGameInfo } from '../models/updated-subscribed-game-info.model';

/**
 * Make a request to the extractor service to get the updated games info
 *
 * @export
 * @throws {Error} If the extractor service is not available
 * @param {LovelaceSubscribedGameInfo[]} requests The list of games to get the updated info
 * @return {Promise<UpdatedSubscribedGameInfo[]>} A promise with the updated games info from the extractor service
 */
export async function getUpdatedGamesInfoFromExtractorService(
  requests: LovelaceSubscribedGameInfo[]
): Promise<UpdatedSubscribedGameInfo[]> {
  const extractorUrl = process.env.EXTRACTOR_SERVICE_URL as string;

  const response = await axios.post(extractorUrl, requests);

  return response.data as UpdatedSubscribedGameInfo[];
}
