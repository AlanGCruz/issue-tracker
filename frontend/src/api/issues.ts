import { createFetchHttp, type Http } from "../lib/fetch"
import type { CreateIssueInput, Issue, ListQuery, UpdateIssueInput } from "../types/issues"

export type IssuesApi = {
  list: (q?: ListQuery) => Promise<Issue[]>,
  get: (id: number) => Promise<Issue>,
  create: (input: CreateIssueInput) => Promise<Issue>,
  update: (id: number, input: UpdateIssueInput) => Promise<Issue>,
  remove: (id: number) => Promise<{ ok: boolean }>,
}

//Factory function to create the API client
export function createIssuesApi(http: Http): IssuesApi {
  return {
    list: (q) => {
      const searchParams = new URLSearchParams();
      if (q?.status) searchParams.append("status", q.status);
      if (q?.priority) searchParams.append("priority", q.priority);
      const queryString = searchParams.toString();
      const URI = queryString ? `/issues?${queryString}` : "/issues";
      return http.get<Issue[]>(URI);
    },
    get: (id) => http.get<Issue>(`/issues/${id}`),
    create: (input) => http.post<Issue>("/issues", input),
    update: (id, input) => http.patch<Issue>(`/issues/${id}`, input),
    remove: (id) => http.delete<{ok: boolean}>(`/issues/${id}`),
  }
}

export const issuesApiActions = createIssuesApi(createFetchHttp());