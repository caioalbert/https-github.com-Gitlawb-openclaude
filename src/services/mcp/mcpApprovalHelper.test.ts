import { afterEach, beforeEach, expect, mock, test } from 'bun:test'

const handleMcpjsonServerApprovalsMock = mock(async () => {})
const getSettingsWithAllErrorsMock = mock(() => ({ errors: [] }))

mock.module('./mcpServerApproval.js', () => ({
  handleMcpjsonServerApprovals: handleMcpjsonServerApprovalsMock,
}))

mock.module('../../utils/settings/allErrors.js', () => ({
  getSettingsWithAllErrors: getSettingsWithAllErrorsMock,
}))

beforeEach(() => {
  handleMcpjsonServerApprovalsMock.mockClear()
  getSettingsWithAllErrorsMock.mockClear()
  getSettingsWithAllErrorsMock.mockImplementation(() => ({ errors: [] }))
})

afterEach(() => {
  handleMcpjsonServerApprovalsMock.mockClear()
  getSettingsWithAllErrorsMock.mockClear()
})

async function importFreshApprovalHelper() {
  return import(`./mcpApprovalHelper.ts?ts=${Date.now()}-${Math.random()}`)
}

test('runs project MCP approval flow when settings are valid', async () => {
  const { maybeHandleMcpjsonServerApprovals } = await importFreshApprovalHelper()
  await maybeHandleMcpjsonServerApprovals({} as any)

  expect(handleMcpjsonServerApprovalsMock.mock.calls.length).toBe(1)
})

test('skips project MCP approval flow when settings contain errors', async () => {
  getSettingsWithAllErrorsMock.mockImplementation(() => ({ errors: [{ message: 'broken' }] }))
  const { maybeHandleMcpjsonServerApprovals } = await importFreshApprovalHelper()
  await maybeHandleMcpjsonServerApprovals({} as any)

  expect(handleMcpjsonServerApprovalsMock.mock.calls.length).toBe(0)
})
