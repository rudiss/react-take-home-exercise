// TaskItem.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem, { Task } from './TaskItem';

// A simple mock for DeleteDialog is used here if necessary.
// Alternatively, you may import the actual DeleteDialog if you want to test the integration.
jest.mock('../DeleteDialog/DeleteDialog.tsx', () => {
  return ({ onConfirm }: { onConfirm: () => void }) => (
    <button data-testid="delete-trigger" onClick={onConfirm}>TrashIcon</button>
  );
});

describe('TaskItem', () => {
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();

  const task: Task = {
    id: 1,
    title: 'Test Task',
    completed: false,
    date: '03/10/2025',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task title and date', () => {
    render(<TaskItem task={task} onToggle={mockToggle} onDelete={mockDelete} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('03/10/2025')).toBeInTheDocument();
  });

  test('calls onToggle when checkbox is clicked', () => {
    render(<TaskItem task={task} onToggle={mockToggle} onDelete={mockDelete} />);
    // Assuming the toggle button is the first button in TaskItem.
    const toggleButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleButton);
    expect(mockToggle).toHaveBeenCalledWith(task.id);
  });

  test('calls onDelete when delete icon is confirmed', async () => {
    render(<TaskItem task={task} onToggle={mockToggle} onDelete={mockDelete} />);
    const deleteTrigger = screen.getByTestId('delete-trigger');
    fireEvent.click(deleteTrigger);
    // Since our mocked DeleteDialog immediately calls onConfirm when clicked:
    expect(mockDelete).toHaveBeenCalledWith(task.id);
  });
});