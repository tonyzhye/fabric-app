import axios from 'axios';
import { KanbanSummary, UserInfoModel } from '../types';

/**
 * Get the current logged-in user information.
 */
export async function getUserInfo(): Promise<UserInfoModel> {
  const response = await axios.get('user');
  return response.data as UserInfoModel;
}

/**
 * Get the kanban list owned by current logged-in user.
 */
export async function getUserOwnedKanbans(): Promise<KanbanSummary[]> {
  const response = await axios.get('user/kanbans');
  return response.data.kanbans as KanbanSummary[];
}
