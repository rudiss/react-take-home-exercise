import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from './TaskManager';

describe('TaskManager', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('adds a new task when Enter is pressed', () => {
    render(<TaskManager />);
    const input = screen.getByPlaceholderText('Add a new task hit enter to save...');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  test('filters tasks correctly', () => {
    render(<TaskManager />);
    const input = screen.getByPlaceholderText('Add a new task hit enter to save...');

    // Add two tasks
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Toggle the first task to completed using its dedicated toggle button.
    const toggleButtons = screen.getAllByTestId(/^toggle-button-/);
    fireEvent.click(toggleButtons[0]);

    // Filter for Completed tasks.
    fireEvent.click(screen.getByText('Completed'));
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Task 2/i)).toBeNull();

    // Filter for Pending tasks.
    fireEvent.click(screen.getByText('Pending'));
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Task 1/i)).toBeNull();
  });
  test('floating add button focuses the input', () => {
    render(<TaskManager />);
    const input = screen.getByPlaceholderText('Add a new task hit enter to save...');
    // Spy on the focus method of the input element
    const focusSpy = jest.spyOn(input, 'focus');

    // The plus button contains the "+" text
    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
    expect(focusSpy).toHaveBeenCalled();
  });

  test('deleteTask removes a task', async () => {
    render(<TaskManager />);
    const input = screen.getByPlaceholderText('Add a new task hit enter to save...');

    // Add a task.
    fireEvent.change(input, { target: { value: 'Task to Delete' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Task to Delete')).toBeInTheDocument();

    // Open the delete confirmation dialog by clicking the trash icon.
    const deleteTrigger = screen.getByTestId('delete-trigger');
    fireEvent.click(deleteTrigger);

    // Wait for the dialog to appear and click the "Delete" button.
    const deleteButton = await screen.findByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);

    // Now the task should no longer be in the document.
    expect(screen.queryByText('Task to Delete')).toBeNull();
  });
});