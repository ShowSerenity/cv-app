import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddSkillForm from './AddSkillForm';

describe('AddSkillForm', () => {
  it('renders form fields and submit button', async () => {
    render(
      <AddSkillForm
        onSubmit={vi.fn().mockResolvedValue(undefined)}
        isSubmittingExternally={false}
      />
    );

    expect(await screen.findByLabelText('Skill name:')).toBeInTheDocument();
    expect(await screen.findByLabelText('Skill range:')).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'Add skill' })
    ).toBeInTheDocument();
  });

  it('keeps submit button disabled initially', async () => {
    render(
      <AddSkillForm
        onSubmit={vi.fn().mockResolvedValue(undefined)}
        isSubmittingExternally={false}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Add skill' })).toBeDisabled();
    });
  });

  it('shows validation errors on blur', async () => {
    const user = userEvent.setup();

    render(
      <AddSkillForm
        onSubmit={vi.fn().mockResolvedValue(undefined)}
        isSubmittingExternally={false}
      />
    );

    const nameInput = await screen.findByLabelText('Skill name:');
    const rangeInput = await screen.findByLabelText('Skill range:');

    await user.click(nameInput);
    await user.tab();

    await user.click(rangeInput);
    await user.tab();

    expect(
      await screen.findByText('Skill name is a required field')
    ).toBeInTheDocument();

    expect(
      await screen.findByText('Skill range is a required field')
    ).toBeInTheDocument();
  });

  it('shows type validation error for non-numeric range', async () => {
    const user = userEvent.setup();

    render(
      <AddSkillForm
        onSubmit={vi.fn().mockResolvedValue(undefined)}
        isSubmittingExternally={false}
      />
    );

    const rangeInput = await screen.findByLabelText('Skill range:');

    await user.type(rangeInput, 'abc');
    await user.tab();

    expect(
      await screen.findByText("Skill range must be a 'number' type")
    ).toBeInTheDocument();
  });

  it('shows min validation error when range is less than 10', async () => {
    const user = userEvent.setup();

    render(
      <AddSkillForm
        onSubmit={vi.fn().mockResolvedValue(undefined)}
        isSubmittingExternally={false}
      />
    );

    const rangeInput = await screen.findByLabelText('Skill range:');

    await user.type(rangeInput, '5');
    await user.tab();

    expect(
      await screen.findByText('Skill range must be greater than or equal to 10')
    ).toBeInTheDocument();
  });

  it('shows max validation error when range is greater than 100', async () => {
    const user = userEvent.setup();

    render(
      <AddSkillForm
        onSubmit={vi.fn().mockResolvedValue(undefined)}
        isSubmittingExternally={false}
      />
    );

    const rangeInput = await screen.findByLabelText('Skill range:');

    await user.type(rangeInput, '101');
    await user.tab();

    expect(
      await screen.findByText('Skill range must be less than or equal to 100')
    ).toBeInTheDocument();
  });

  it('submits valid form values', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <AddSkillForm
        onSubmit={handleSubmit}
        isSubmittingExternally={false}
      />
    );

    await user.type(await screen.findByLabelText('Skill name:'), 'TypeScript');
    await user.type(await screen.findByLabelText('Skill range:'), '85');

    await user.click(screen.getByRole('button', { name: 'Add skill' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'TypeScript',
      range: 85
    });
  });

  it('shows submitting state from external flag', async () => {
    render(
      <AddSkillForm
        onSubmit={vi.fn().mockResolvedValue(undefined)}
        isSubmittingExternally
      />
    );

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Adding...' })
      ).toBeDisabled();
    });
  });
});