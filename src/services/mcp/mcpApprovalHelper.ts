import type { Root } from '../../ink.js';
import { getSettingsWithAllErrors } from '../../utils/settings/allErrors.js';
import { handleMcpjsonServerApprovals } from './mcpServerApproval.js';

export async function maybeHandleMcpjsonServerApprovals(root: Root): Promise<void> {
  const { errors: allErrors } = getSettingsWithAllErrors();
  if (allErrors.length === 0) {
    await handleMcpjsonServerApprovals(root);
  }
}
