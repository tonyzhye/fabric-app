import axios from 'axios';
import { KanbanModel, MemoModel, Lane } from '../types';

/**
 * Requests for kanban restful api interface
 */

/**
 * Create a kanban for current logged-in user.
 */
export async function createKanban(title: string, withSampleMemos: boolean): Promise<KanbanModel> {
  const params = { 
    title, 
    accessLevel: 'PRIVATE',
    withSampleMemos
  };
  const response = await axios.post('kanbans', params);
  return response.data as KanbanModel;
}

export async function getKanban(id: number): Promise<KanbanModel> {
  const response = await axios.get(`kanbans/${id}`);
  return response.data as KanbanModel;
}

export async function updateKanban(id: number, params: object): Promise<KanbanModel> {
  const res = await axios.patch(`kanbans/${id}`, params);
  return res.data as KanbanModel;
}

export async function createMemo(
  kanbanId: number, 
  params: object
): Promise<MemoModel> {
  const res = await axios.post(`kanbans/${kanbanId}/memos`, params);
  return res.data as MemoModel;
}

export async function updateMemo(
  kanbanId: number, 
  memoId: number, 
  params: object
): Promise<MemoModel> {
  const res = await axios.patch(`kanbans/${kanbanId}/memos/${memoId}`, params);
  return res.data as MemoModel;
}

export async function clearDoneMemos(kanbanId: number): Promise<void> {
  await axios.delete(`kanbans/${kanbanId}/memos/clearDone`);
  return;
}

export async function deleteMemo(kanbanId: number, memoId: number): Promise<void> {
  await axios.delete(`kanbans/${kanbanId}/memos/${memoId}`);
  return;
}

export function moveMemo(
  kanbanId: number, 
  memo: MemoModel, 
  destLane: Lane, 
  destLaneOrder: number
): Promise<MemoModel> {
  const memoId = memo.id;
  const params = {
    'lane': destLane.toString(),
    'laneOrder': destLaneOrder
  };
  return updateMemo(kanbanId, memoId, params);
}

export function updateMemoSubject(
  kanbanId: number, 
  memo: MemoModel, 
  subject: string
): Promise<MemoModel> {
  const memoId = memo.id;
  const params = {
    'subject': subject,
  };
  return updateMemo(kanbanId, memoId, params);
}
