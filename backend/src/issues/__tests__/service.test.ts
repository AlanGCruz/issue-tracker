import { CreateIssueInput, Issue, ListQuery } from '../../types/issues';
import { IssuesRepo } from '../repo';
import { createIssuesService } from '../service';

const repo: jest.Mocked<IssuesRepo> =
{
  list: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

const service = createIssuesService(repo);
const issuesList: Issue[] = [
  { id: 1, title: "Issue 1", status: "todo", priority: "med", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, title: "Issue 2", status: "in-progress", priority: "high", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, title: "Issue 3", status: "done", priority: "low", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

beforeEach(() => {
  jest.resetAllMocks();
})

describe("list issues", () => {
  test("should return list of issues when query params are not passed", async () => {
    repo.list.mockResolvedValue(issuesList);
    const issues = await service.list({});
    expect(repo.list).toHaveBeenCalledWith({});
    expect(issues).toEqual(issuesList);
  });

  test("should return filtered list of issues when query params are passed", async () => {
    const query: ListQuery = { status: "todo", priority: "med" };
    repo.list.mockResolvedValue(issuesList);
    await service.list(query);

    expect(repo.list).toHaveBeenCalledWith(query);
  });

  test("should throw validation error when invalid status is passed", async () => {
    const query: ListQuery = { status: "invalid-status" as any, priority: "med" };
    await expect(service.list(query)).rejects.toThrow("ValidationError: invalid status");
  });

  test("should throw validation error when invalid priority is passed", async () => {
    const query: ListQuery = { status: "todo", priority: "medium" as any };
    await expect(service.list(query)).rejects.toThrow("ValidationError: invalid priority");
  });
});

describe("get issue by id", () => {
  test("should return issue when valid id is passed", async () => {
    repo.getById.mockResolvedValue(issuesList[0]);
    const resp = await service.getById(1);
    expect(repo.getById).toHaveBeenCalledWith(1);
    expect(resp).toEqual(issuesList[0]);
  });

  test("should throw error if id is invalid", async () => {
    await expect(service.getById("1" as any )).rejects.toThrow("ValidationError: invalid id");
    expect(repo.getById).not.toHaveBeenCalled();
  });

  test("should return null if id was not found", async () => {
    repo.getById.mockResolvedValue(null);
    const resp = await service.getById(999);
    expect(repo.getById).toHaveBeenCalledWith(999);
    expect(resp).toBeNull();
  })
});

describe("create issue", () => {
  const issuePayload: CreateIssueInput = {
    title: "New Issue",
    description: "This is a new issue",
    status: "todo",
    priority: "med"
  };

  test("should crete new issue", async () => {
    repo.create.mockResolvedValue(issuesList[0]);// return anything for testing
    const resp = await service.create(issuePayload)
    expect(repo.create).toHaveBeenCalledWith(issuePayload);
    expect(resp).toEqual(issuesList[0]);
  })

  test("should throw error when title is empty", async () => {
    const p = { ...issuePayload, title: "  " };
    await expect(service.create(p)).rejects.toThrow("ValidationError: title is required"); 
    expect(repo.create).not.toHaveBeenCalled();
  })

  test("should throw error when status is invalid", async () => {
    const p = { ...issuePayload, status: "invalid-status" as any };
    await expect(service.create(p)).rejects.toThrow("ValidationError: invalid status");
    expect(repo.create).not.toHaveBeenCalled();
  })

  test("should throw error when priority is invalid", async () => {
    const p = { ...issuePayload, priority: "medium" as any };
    await expect(service.create(p)).rejects.toThrow("ValidationError: invalid priority");
    expect(repo.create).not.toHaveBeenCalled();
  })
});

describe("update issue", () => {
  test("should update issue when valid data is passed", async () => {
    const updatedIssue = { ...issuesList[0], title: "Updated Issue", status: "in-progress" as const };
    repo.update.mockResolvedValue(updatedIssue);
    const resp = await service.update(1, { title: "Updated Issue", status: "in-progress" });
    expect(repo.update).toHaveBeenCalledWith(1, { title: "Updated Issue", status: "in-progress" });
    expect(resp).toEqual(updatedIssue);
  });
  test("should throw error when id is invalid", async () => {
    await expect(service.update("1" as any, { title: "Updated Issue" })).rejects.toThrow("ValidationError: invalid id");
    expect(repo.update).not.toHaveBeenCalled();
  });
  test("should throw error when title is empty", async () => {
    await expect(service.update(1, { title: "   " })).rejects.toThrow("ValidationError: title cannot be empty");
    expect(repo.update).not.toHaveBeenCalled();
  });
  test("should throw error when status is invalid", async () => {
    await expect(service.update(1, { status: "invalid-status" as any })).rejects.toThrow("ValidationError: invalid status");
    expect(repo.update).not.toHaveBeenCalled();
  });
  test("should throw error when priority is invalid", async () => {
    await expect(service.update(1, { priority: "medium" as any })).rejects.toThrow("ValidationError: invalid priority");
    expect(repo.update).not.toHaveBeenCalled();
  });
});

describe("delete issue", () => {
  test("should delete issue when valid id is passed", async () => {
    repo.delete.mockResolvedValue(true);
    await service.remove(1);
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
  test("should throw error when id is invalid", async () => {
    await expect(service.remove("1" as any)).rejects.toThrow("ValidationError: invalid id");
    expect(repo.delete).not.toHaveBeenCalled();
  });
  test("should not throw error when id was not found", async () => {
    repo.delete.mockResolvedValue(false);
    await expect(service.remove(999)).resolves.not.toThrow();
    expect(repo.delete).toHaveBeenCalledWith(999);
  });
});
