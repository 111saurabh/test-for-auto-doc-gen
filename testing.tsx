/**
 * Type alias representing the possible roles a user can have.
 * - `'admin'`: Represents an administrator with full access.
 * - `'editor'`: Represents a user with editing permissions.
 * - `'viewer'`: Represents a user with read-only access.
 */
type UserRole = 'admin' | 'editor' | 'viewer';

/**
 * Enum representing the status of a task.
 * - `Pending`: The task has not started yet.
 * - `InProgress`: The task is currently being worked on.
 * - `Completed`: The task has been finished.
 */
enum TaskStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

/**
 * Interface representing a user in the system.
 * @property id - A unique identifier for the user.
 * @property name - The name of the user.
 * @property role - The role assigned to the user, defined by the `UserRole` type.
 */
interface IUser {
  id: number;
  name: string;
  role: UserRole;
}

/**
 * Interface representing a task in the system.
 * @property id - A unique identifier for the task.
 * @property title - The title or name of the task.
 * @property status - The current status of the task, defined by the `TaskStatus` enum.
 * @property assignee - The user to whom the task is assigned, represented by the `IUser` interface.
 */
interface ITask {
  id: number;
  title: string;
  status: TaskStatus;
  assignee: IUser;
}

/**
 * Class representing a task with operations to manage its lifecycle.
 * Implements the `ITask` interface.
 */
class Task implements ITask {
  /**
   * The unique identifier for the task.
   */
  id: number;

  /**
   * The title or name of the task.
   */
  title: string;

  /**
   * The current status of the task.
   */
  status: TaskStatus;

  /**
   * The user to whom the task is assigned.
   */
  assignee: IUser;

  /**
   * Constructs a new `Task` instance.
   * @param id - The unique identifier for the task.
   * @param title - The title or name of the task.
   * @param assignee - The user to whom the task is assigned.
   */
  constructor(id: number, title: string, assignee: IUser) {
    this.id = id;
    this.title = title;
    this.assignee = assignee;
    this.status = TaskStatus.Pending;
  }

  /**
   * Starts the task by updating its status to `InProgress`.
   */
  start(): void {
    this.status = TaskStatus.InProgress;
  }

  /**
   * Completes the task by updating its status to `Completed`.
   */
  complete(): void {
    this.status = TaskStatus.Completed;
  }

  /**
   * Provides a summary of the task.
   * @returns A string summarizing the task's title, status, and assignee.
   */
  getSummary(): string {
    return `${this.title} [${this.status}] - Assigned to ${this.assignee.name}`;
  }
}

/**
 * Function to create a new user.
 * @param id - The unique identifier for the user.
 * @param name - The name of the user.
 * @param role - The role assigned to the user, defined by the `UserRole` type.
 * @returns A new `IUser` object representing the user.
 */
function createUser(id: number, name: string, role: UserRole): IUser {
  return { id, name, role };
}

/**
 * Arrow function to log the details of a task.
 * @param task - The task whose details are to be logged, represented by the `ITask` interface.
 */
const logTaskDetails = (task: ITask): void => {
  console.log(`Task: ${task.title}, Status: ${task.status}, Assigned to: ${task.assignee.name}`);
};

// Usage
const user = createUser(1, 'Saurabh', 'admin');
const task = new Task(101, 'Write TypeScript Guide', user);

task.start();
logTaskDetails(task);

task.complete();
console.log(task.getSummary());
