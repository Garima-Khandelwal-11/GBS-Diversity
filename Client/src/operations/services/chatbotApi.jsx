import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { CHATBOT_API } = endpoints;

export async function sendChatMessage(message, history) {
  const response = await apiConnector("POST", CHATBOT_API, { message, history });
  return response.data.data.reply;
}
